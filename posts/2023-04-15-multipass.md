---
title = "Multipass"
---

I've recently switched over to using [multipass][1] to spin up VMs on my
computer. I found that the combo [Vagrant + VMware][2] was very unstable, at least
on Apple M1 (e.g., tear down your home lab and you cannot start it again because 
of network issues).

Multipass works flawlessly. This thing is rock solid, easy to use and
it works fast. The only downside is that it doesn't have a built-in feature for
configuring multiple VMs at once through some sort of configuration file or command
line arguments. But hey, one can certainly script multiple launches in bash, right?
This is what I'm doing nowadays:

```
#!/usr/bin/env bash

DEFAULT_NAME="my-vm"
DEFAULT_CPUS=2
DEFAULT_DISK="8G"
DEFAULT_MEMORY="4G"

vm_ip() {
  local machine_name="$1"
  multipass info --format csv "$machine_name" | tail -n +2 | cut -d',' -f3
}

launch_vm() {
  local params=()
  while [[ "$#" -gt 0 ]]; do
    case "$1" in
      --name) name="$2"; shift 2;;
      --cpus) cpus="$2"; shift 2;;
      --disk) disk="$2"; shift 2;;
      --memory) memory="$2"; shift 2;;
      --mount) mount="$2"; shift 2;;
      *) echo "Unknown parameter: $1"; exit 1;;
    esac
  done

  params+=(--name "${name:-$DEFAULT_NAME}")
  params+=(--cpus "${cpus:-$DEFAULT_CPUS}")
  params+=(--disk "${disk:-$DEFAULT_DISK}")
  params+=(--memory "${memory:-$DEFAULT_MEMORY}")

  mount_opt="..:/data"
  if $mount; then
    params+=(--mount $mount_opt)
  fi

  cloud_init=$(sed "s/{{`{{ hostname }}`}}/$name/g" cloud-init.yaml)

  echo "Launching VM with params: ${params[@]}"
  multipass launch "${params[@]}" --cloud-init <(echo "$cloud_init")
}

launch_vm --name vm0 --cpus 2 --disk 8G --memory 3G --mount true
if [ $? -eq 0 ]; then
  multipass exec vm0 -- sh -c '
      sudo apt update -y
      sudo apt install XXX -y
  '
fi

launch_vm --name vm1 --cpus 1 --disk 4G --memory 1G --mount false
launch_vm --name vm2 --cpus 2 --disk 5G --memory 2G --mount false
```

I use [cloud-init][3] to initialize each machine:

```
#cloud-config
hostname: {{`{{ hostname }}`}}.someName.com
users:
  - name: myUser
    ssh_authorized_keys:
      - ssh-ed25519 AAAAC9M... noname
    sudo: ALL=(ALL) NOPASSWD:ALL
    groups: sudo
    shell: /bin/bash
```

Initially, I thought about writing my own thin wrapper around multipass
to make it multi-machine configurable, but later I discovered that someone
had already done so (of course!): the tool is called [multipass-compose][4].

[1]: https://multipass.run/
[2]: https://www.marcoslar.com/posts/2022/01/linux-home-lab/
[3]: https://cloudinit.readthedocs.io/en/latest/
[4]: https://github.com/pkorobeinikov/multipass-compose
