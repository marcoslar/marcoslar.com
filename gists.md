---
title = "Gists"
display_in_sessions = false
display_date = false
---

I always forget how to do this stuff.

- Show octal file permissions

```
$ stat -c '%a' ~/.ssh/authorized_keys
```

- Create parent directories as needed

```
$ mkdir -p env/roles/nginx/{tasks,handlers,defaults}
```

- Search for strings in git history excluding certain files

```
git log -S "private-key" -p -- . ':(exclude)*.html*' ':(exclude)*.js*'
```
