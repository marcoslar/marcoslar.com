---
title = "Golang plugins"
syntax_on = true
---

While working on my static site generator I stumbled upon the 
following one-man requirement:

> It would be great if I can execute custom template functions

Now, while Go provides a way to define, and later use, any kind of function
in templates via `template.FuncMap` and `template.Funcs`, the deal here was 
to be able to define such functions on the fly, and link them to the already
existing main executable (the static site generator).

### Dynamically-linked libraries

So, what we need is a way to create our own *library* of template
functions, which can be linked to the main executable on demand, at runtime.
This way we can always update the library without having to recompile the 
main executable again. This sounds a lot quite similar to the concept of
[dynamic linking][1]. 
Dynamic linking, in a nutshell, means to bind a (shared) library into 
a running process. The main reason this technique exists is to save
on memory usage: multiple processes using the same shared library can point
to a single copy of such library in physical memory. For our particular use
case, though, the main advantage is to be able to change the shared library 
without having to recompile the main executable.

### Go plugins

By googling "go dynamic linking" I ended up in a doc called [Go execution modes][2].
The doc (dated from 2014, and updated in 2016) describes future (now current)
directions for Go support for shared libraries and related ways of building
Go programs. Among all the available build modes described in the doc, the build
mode `plugin` seems to be the most suitable one for our original requirement.

#### The plugin

Let's say we want our `h1`s to be rendered with a fancy capital letter (like in the
title of this blog post). The final result should look as follows:

```
<h1><span class="capital-letter">G</span>olang plugins</h1>
```

And the template that generates the previous HTML should be as easy as:

```
<h1>{{`{{ .myHeader | fancyTitle }}`}}</h1>
```

The implementation of `fancyTitle` should be straightforward: 

*File `plugins/plugin.go`*
```
package main // Plugins must live within the main package

import (
    "fmt"
    "html/template"
)

var MyFuncs = template.FuncMap {
    "fancyTitle": func(s string) template.HTML {
        if len(s) < 2 {
            return template.HTML(s)
        }

        return template.HTML(
            fmt.Sprintf(`<span class="capital-letter">%s</span>%s`, s[0:1], s[1:]),
        )
    },
}
```

We put our function within a `template.FuncMap` because that's what [`template.Funcs`][3] expects
as parameter. The main executable can then load this plugin as follows.

*File `main.go`*
```
package main

import (
    "fmt"
    "html/template"
    "os"
    "os/exec"
    "plugin"
)

const PluginFilepath = "plugins/plugin.so"

func main() {
    var myFuncs template.FuncMap
    myFuncs = loadFuncs()

    t, err := template.New("mypage").Funcs(template.FuncMap(myFuncs)).ParseFiles("hello.html")
    if err != nil {
        panic(err)
    }

    err = t.ExecuteTemplate(os.Stdout, "hello.html", nil)
    if err != nil {
        panic(err)
    }
}

// LoadFuncs loads the custom template functions from a hardcoded location
func loadFuncs() template.FuncMap {
    // Hardcoded location of plugins
    cmd := exec.Command("go", "build", "-buildmode=plugin", "-o", PluginFilepath, "plugins/plugin.go")
    err := cmd.Run()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Could not build plugin: %s", err)
        os.Exit(1)
    }

    plugin, err := plugin.Open(PluginFilepath)
    if err != nil {
        fmt.Fprintf(os.Stderr, "Could not load plugin: %s", err)
        os.Exit(1)
    }

    myFuncsSymbol, err := plugin.Lookup("MyFuncs")
    if err != nil {
        fmt.Fprintf(os.Stderr, "Could not find the symbol MyFuncs: %s", err)
        os.Exit(1)
    }

    var myFuncs *template.FuncMap
    myFuncs, ok := myFuncsSymbol.(*template.FuncMap)
    if !ok {
        fmt.Fprintf(os.Stderr, "MyFuncs must be of type template.FuncMap")
        os.Exit(1)
    }

    return *myFuncs
}
```

*File `hello.html`*

```
<h1>{{`{{ Golang plugins | fancyTitle }}`}}</h1>
```

Explanation of the function `loadFuncs`:

1. We build the plugin located in `plugins/plugin.go` into the file `plugins/plugin.so`
2. We open the plugin `plugins/plugin.so`
3. We search for the symbol `MyFuncs` in the plugin
4. We assert that the type of `MyFuncs` is `*template.FuncMap`<sup>1</sup>, and if so we 
return it

In this toy example, there are some assumptions about how the plugin looks like.
The relative location of the plugin should be known in advance, as well as the 
name and type of the exported symbol. In a more real-world scenario, things could
be a bit more flexible though.

### Caveats

There are multiple reasons why Go plugins do not get much love in the Go community. 
To name a few:

- both the main executable and the plugin(s) must be built using the exact same
Go compiler version

- if the plugin(s) and the main executable use third-party packages, these versions must
match exactly as well

- plugins do not work if the main executable was statically built (`CGO_ENABLED=0`),

#### Notes

\[1\]. When using `Lookup` to search for a global variable, you get a pointer
(see this [GitHub][4] issue).

[1]: https://en.wikipedia.org/wiki/Dynamic_linker
[2]: https://docs.google.com/document/d/1nr-TQHw_er6GOQRsF6T43GGhFDelrAP0NqSS_00RgZQ/edit
[3]: https://pkg.go.dev/html/template#Template.Funcs
[4]: https://github.com/golang/go/issues/31882