---
title = "Parallel Blogs"
---

### 1. What

The idea is similar to the one of parallel universes@{:|| (to a lesser extent 
of course!):}@ in a *parallel blog* each post consists of multiple versions of 
itself that co-exist within the same plane of "existence" (the URL of every 
individual post). The sum of all these co-existing posts constitute the actual 
post that one may expect under a given URL.

Take the page you are reading right now as an example. There are multiple 
versions of it and all of them co-exist under the same URL 
(`posts/2020/08/parallel-blogs/`). How to access the other versions? Just reload 
your browser. You may get a different version of this page, similar to the 
previous one and that conveys the same meaning@{|| (most of the time)}@.

### 2. Why

Writing is difficult and sometimes I end up with multiple versions of the same 
@{post||page}@ but because of the way blogs work I must select only one version 
to publish. Sure, I could release multiple versions of the same page under 
different URLs, but @{that's cumbersome|| that doesn't feel very natural to me}@:

- I have to maintain separate copies of the same page (e.g., `/my-post-v1`, 
`/my-post-v2`, etc.)
- pages with *appreciably similar* content may impact search engine 
rankings @{||(it's not that I do care though)}@
- if the post actually is the interest of anyone, they probably won't visit 
all the different versions. It's just not worth it

Hence, one page multiple versions.

### 3. How

A super naive implementation: wrap different versions of text snippets in `<span></span>` 
tags and hide them (or display them) randomly.

<span class="code_caption">{Example of how to define a sentence with 
two possible rendering outcomes}</span>

```html
My favourite book is <span class="v1">Foucault's Pendulum</span><span class="v2">Fictions</span>.
```

This snippet would get rendered as either:

<span class="code_caption">{Outcome 1}</span>
```text
My favourite book is Foucault's Pendulum.
```

or: 

<span class="code_caption">{Outcome 2}</span>
```text
My favourite book is Fictions.
```

Since I don't know how to generate random numbers with plain HTML and CSS, I use 
JavaScript. You can take a look at the source code of this page and see how 
it's done. If JavaScript is disabled, only one version is displayed 
(the one tagged as v1).

### 4. How (II)

Wrapping every version in `<span></span>` tags with custom CSS classes here and 
there is tiring, so I came up with a way to specify the same but with fewer characters.
This is what I'm doing now instead:

```text
My favourite book is @{Foucault's Pendulum||Fictions}@
```

It's shorter and less distracting. The `span` tags and CSS classes are added 
automatically. While I could have done the parsing using JavaScript in the browser, 
I thought it was cool to just add it to my @{||(shameless plug)}@ own static site 
generator [belbo](https://github.com/lessmarcos/belbo).
