---
title = "Session 1—Statically-linked Go programs"
---

This session explores the specifics of running Go programs 
in `FROM SCRATCH` and [Alpine][1] containers. The following Go program 
starts an HTTP server on port 8080. When you send a request to `/`, 
it returns the body length of the `example.com` website:

<span class="file">File: main.go</span>
```
package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
)

func getBodyLength(url string) (int, error) {
	resp, err := http.Get(url)
	if err != nil {
		return 0, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return 0, fmt.Errorf("received non-200 status code: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		return 0, err
	}

	return len(body), nil
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		bodyLength, err := getBodyLength("https://example.com")
		if err != nil {
			fmt.Fprintf(w, "%s", err)
			return
		}
		fmt.Fprintf(w, "%d", bodyLength)
	})

	fmt.Println("Server listening on http://localhost:8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
```

When you run this on your machine, it behaves as expected:

```
$ go build -o server . && ./server &
[1] 189644
Server listening on http://localhost:8080
$ curl localhost:8080
1256
```

<h2 data-sectnum="1.">
    <a name="1" href="#">FROM SCRATCH containers</a>
</h2>

If you want to Dockerize the program with just the resulting 
binary, a common approach is to create a minimal container 
using `scratch`.

<span class="file">File: Dockerfile</span>
```
# syntax=docker/dockerfile:1

FROM scratch
COPY server /
EXPOSE 8080
ENTRYPOINT ["./server"]
```

Assuming the Go binary `server` is located at the root 
of the build context, you can build the Docker image like this:

```
$ docker build -t scratch .
$ docker run -d -p 8080:8080 scratch
```

Our container should be up and running, but `docker ps -a` shows 
that it has exited:

```
CONTAINER ID   IMAGE     COMMAND     CREATED         STATUS                  
7e07c01c2130   scratch   "./server"  7 seconds ago   Exited (1) 6 seconds ago
```

If we take a look at the logs, we see this:

```
$ docker logs 7e
exec ./server: no such file or directory
```

Gotcha number 1: Our binary is dynamically linked to one 
or more libraries that don't exist in the container. 
When we built our Go program with `go build -o server .`, 
we didn't specify if we wanted our binary to be statically 
or dynamically linked. This can be adjusted using the 
environment variable `CGO_ENABLED`. When `CGO_ENABLED` is 
set to `1` (the default), the binaries are dynamically linked. 
If we set it to `0`, we get a statically linked binary, 
which is great for keeping things lean in a minimal container.

Let's see what libraries our binary depends on:

```
$ ldd server
	linux-vdso.so.1 (0x0000ffffb7f01000)
	libc.so.6 => /lib/aarch64-linux-gnu/libc.so.6 (0x0000ffffb7d10000)
	/lib/ld-linux-aarch64.so.1 (0x0000ffffb7ec8000)
```

To be continued...

[1]: https://www.alpinelinux.org/