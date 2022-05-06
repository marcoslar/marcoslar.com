---
title = "Log"
display_in_sessions = false
display_date = false
---

### March 2022
<div class="post-date">10 Mar 2022</div>

GitLab's [Dependency Proxy](https://docs.gitlab.com/ee/user/packages/dependency_proxy/index.html)
[doesn't seem to support](https://gitlab.com/gitlab-org/gitlab/-/issues/349466) multi-architecture upstream image repositories 😔

### February 2022
<div class="post-date">23 Feb 2022</div>

I discovered GitLab's [Dependency Proxy](https://docs.gitlab.com/ee/user/packages/dependency_proxy/index.html). It's like a private cache for Docker images, and
available in the free tier 🤑

### January 2022

<div class="post-date">27 Jan 2022</div>
Bought a new domain name. Changed the silly prefix for a more decent
<a href="http://www.marcoslar.com/#:~:text=The%20lar%20suffix%20in%20the%20domain%20name%20is%20the%20plural%20form%20of%20my%20surname%20in%20the%20Turkish%20language">suffix</a>.

### December 2021

<div class="post-date">19 Dec 2021</div>
I changed the design of the website one more time. I actually kinda like it now.

### July 2021

<div class="post-date">07 Jul 2021</div>
While I appreciate tools like `go fmt`, I think third-party linters add little value to already
existing projects. Code changes all the time, structure (should) remain more ore less stable; 
let's focus on the big picture! An extra semicolon is not going to make the project easier 
(or harder) to read or maintain---consistency in the upper layers of abstraction brings more
value (e.g., don't put business logic in the transport layer, proper error logging, don't use
logs when metrics are enough, good commit messages for important features, etc.)

### June 2021

<div class="post-date">06 Jun 2021</div>
Once again I have changed the style of the website. I had to update [belbo] to support content
in multiple directories (see [`817bd5b`](https://github.com/marcoslar/belbo/commit/817bd5b170e5ebeb93e55e0cae2a2b444d6fff96)),
but it turned out I actually didn't need the feature.

[belbo]: https://github.com/marcoslar/belbo
