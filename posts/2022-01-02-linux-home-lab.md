---
title = "Linux home lab"
syntax_on = true
---

For relaxing times, make it Linux time. For hardware, though, Macs are usually
good choices (_update: and the latest [MacBook Pro M1][1] is a beast_).
If you see yourself in need of a bunch
of Linux VMs with custom IP addresses, hostnames, and what not, [Vagrant][2]
is your thing.

### One <span style="color:#E95420">Ubuntu Sunset Brew</span>, please

To spin up one Ubuntu VM using Vagrant, the following `Vagrantfile` script 
is enough:

```
Vagrant.configure("2") do |config|
  config.vm.box = "lma/ubuntu-21.04"
  config.vm.hostname = "minikube.host"
  config.vm.synced_folder ".", "/vagrant"
  config.vm.network "private_network", ip: "10.10.10.210"
  config.vm.provider "vmware_fusion" do |v|
    v.vmx["memsize"] = "4096"
    v.gui = false
  end
end
```

Run `vagrant up` and you'll end up with a VM that runs Ubuntu 21.04, can be
pinged from your host and does not have any GUI. You'll be also mounting
your current folder in your host under `/vagrant` in the VM, effectively sharing
your current folder with the VM (that's very useful when you want to write 
code in your host using your favorite IDE, but you want to execute the code in the VM).

### A threesome

When setting up a lab, you usually need more than one VM. With Vagrant that's 
rather easy as well. Check this out:

```
HOSTNAME_SUFFIX = "mylab.local"
PRIV_NET = "10.10.10"
MACHINES = {
    :node1 => { :hostname => "node1.#{HOSTNAME_SUFFIX}", :ip => "#{PRIV_NET}.10" },
    :node2 => { :hostname => "node2.#{HOSTNAME_SUFFIX}", :ip => "#{PRIV_NET}.20" },
    :node3 => { :hostname => "node3.#{HOSTNAME_SUFFIX}", :ip => "#{PRIV_NET}.30" },
}

Vagrant.configure("2") do |config|
    MACHINES.each_with_index do |(name, machine), index|
        config.vm.define machine[:hostname] do |node|
            node.vm.hostname = machine[:hostname]
            node.vm.box = "lma/ubuntu-21.04"
            node.vm.synced_folder ".", "/vagrant", disabled: true
            node.vm.network "private_network", ip: machine[:ip]
            node.vm.provider "vmware_fusion" do |vf|
                vf.vmx["memsize"] = 1024
                vf.gui = false
            end

            node.vm.provision :shell, inline: <<-SHELL
                sudo apt-get update
            SHELL
        end
    end
end
```

Now we have 3 VMs, each with their own ip address (`*.10.10.10`), with
custom hostnames (`node{n}.mylab.local`), and 1GB of RAM each. Shared folder
is disabled, and `apt-get update` provisions each machine. 
To SSH'd into each machine you need to specify its name (e.g., `vagrant ssh node1.mylab.local`).

There are many *patterns* when setting up labs via Vagrant (e.g., setting up
multiple machines mixing private and public networks, non-default SSH keys,
port forwarding, etc.). Perhaps one day I write about them... stay tuned (or not)!

[1]: https://www.apple.com/macbook-pro-14-and-16/specs/
[2]: https://www.vagrantup.com/
