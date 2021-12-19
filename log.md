---
title = "Log"
display_in_sessions = false
display_date = false
---

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
in multiple directories (see [`817bd5b`](https://github.com/lessmarcos/belbo/commit/817bd5b170e5ebeb93e55e0cae2a2b444d6fff96)),
but it turned out I actually didn't need the feature.

[belbo]: https://github.com/lessmarcos/belbo
