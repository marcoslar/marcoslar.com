---
title = "Host parameter does not match hashed host field in supplied key"
syntax_on = true
---

While using the [`known_hosts`][1] Ansible module, I stumbled upon the error
message that gives name to this blog post. All I could find was 
this [GitHub issue][2] which unfortunately didn't help me much. 
I wasn't hashing the hostname (`hash_host: false`), and the key had
a valid format (as per the section SSH_KNOWN_HOSTS FILE FORMAT in the 
`sshd(8)` man page). 

My problem was that I was dealing with an ssh server that listened on
a port other than 22. The documentation for the `known_host` module says:

> For custom SSH port, name needs to specify port as well. See example section.

And the format is a bit special. Example:

```
- name: Add public key
  known_hosts:
    name: "[{{`{{ my_host }}`}}]:{{`{{ my_custom_port }}`}}"
    key: "{{`{{ lookup('pipe', 'ssh-keyscan -p {{ my_custom_port }} {{ my_host }}') }}`}}"
```

Notice the square brackets around the hostname.

[1]: https://docs.ansible.com/ansible/latest/collections/ansible/builtin/known_hosts_module.html
[2]: https://github.com/ansible/ansible/issues/54661