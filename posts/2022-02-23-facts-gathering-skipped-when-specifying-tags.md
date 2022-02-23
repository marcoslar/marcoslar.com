---
title = "Ansible facts gathering skipped when specifying tags"
---

**Pierly**: I want to install Docker in a server (Ubuntu 20.04) via Ansible.

**Tortoise**: There is a playbook to setup that server and it looks as follows:

*(`setup.yml` file)*
```
... other plays ...

- name: Setup load balancers
  hosts: balancers
  become: true
  gather_facts: true
  roles:
    - role: nginx
      tags: nginx
    - role: docker
      tags: docker
  tags:
    - setup
```

**Tortoise**: And by the way, the role `docker` contains, among other tasks, the following one:

*(`roles/docker/tasks/main.yml` file)*
```
... other tasks ...

- name: Add upstream repository
  apt_repository:
    repo: "deb {{`{{ apt_url }}`}} {{`{{ ansible_distribution_release }}`}} stable"
```

**Pierly**: Easy task. But, alas, I run `ansible-playbook setup.yml --limit balancers --tags docker` 
and it fails with the following message:

``` 
The task includes an option with an undefined variable. The error was: 'ansible_distribution_release' is undefined
```

**Tortoise**: Damn it! Facts gathering. Not happening. It seems like "it's a feature not a bug" kind of
thing. The topic has been discussed [here](https://github.com/ansible/ansible/issues/57529#issuecomment-500886760).

**Pierly**: Adding the following play at the top of the playbook seems to be good enough:

*(`roles/docker/tasks/main.yml` file)*
```
- hosts: all
  become: true
  gather_facts: true

... other plays ...
```

**Pierly**: Everything works as expected because the *Facthering* part will be implicitly executed 
every time.

**Tortoise**: Facthering?

**Pierly**: For "fact gathering".

**Tortoise**: I'm late for a race. Wir sehen uns später.