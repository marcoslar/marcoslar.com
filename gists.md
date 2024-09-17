---
title = "Gists"
display_in_sessions = false
display_date = false
---

I always forget how to do this kind of stuff.

- Create a text file of size N (around 20 MB)

```
yes hello | head -c 20000000 > sample.txt
```

- psql enhancements

```
\set PROMPT1 '%[%033[1m%]%M %n@%/%R%[%033[0m%]%x%# '
\set PROMPT2 '[more] %R > '
\pset null '[NULL]'
\x auto
\set VERBOSITY verbose
\set HISTFILE ~/.psql_history- :DBNAME
\set HISTCONTROL ignoredups
\set COMP_KEYWORD_CASE upper
```

- GPG (symmetric) decryption (echoing password)

```
$ echo $key | gpg --batch --yes --passphrase-fd 0 --output $1.plain --decrypt $1
```

- Base64 encoding

```
$ echo -n 'my-string' | base64
```


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
