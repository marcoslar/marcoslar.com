---
title = "Parallel Blogs"
syntax_on = true
---

### 1. What

The idea is similar to the one of parallel universes@{:|| (but to a lesser extent 
of course):}@ in a *parallel blog* each post consists of multiple versions of 
itself that co-exist within the same "plane of existence" (the URL of every 
individual post). The sum of all these co-existing posts constitute the actual 
post that one may expect under a given URL.  
Take the page you are reading right now as an example. There are multiple 
versions of it and all of them co-exist under the same URL 
(`posts/2020/08/parallel-blogs/`). How to access the other versions? Just reload 
the browser. You may get a different version of this page, similar to the 
previous one and that conveys the same meaning@{|| (most of the time)}@.

### 2. Why

There are few ideas more overwhelming than that of the multiverse, and the
mere notion that the universe *may* fork itself perpetually before the
realization of every action---no matter how small---is fascinating.
In some@{---poor---||---poor---|| }@way this site tries to implement the idea.
One page, multiple versions. Some versions could contradict all the other ones,
some versions could be just slight variations of the original @{(which one is
the original?), || }@some versions have grammar mistakes, some versions are 
really @{good||bad}@, some versions make this site one of the top 500 
sites on the web.

### 3. How

An easy way to do it is by wrapping different versions of text snippets
in `<span>` tags and hide them or display them randomly.

<span class="code_caption">{Example of a sentence with two possible 
rendering outcomes}</span>

<xmp>
My favourite book is <span class="v1">Foucault's Pendulum</span>
<span class="v2">Fictions</span>.
</xmp>

The previous code would get rendered as either:

<span class="code_caption">{Outcome 1}</span>
```text
My favourite book is Foucault's Pendulum.
```

or: 

<span class="code_caption">{Outcome 2}</span>
```text
My favourite book is Fictions.
```

I don't know how to generate random numbers with plain HTML and CSS, so I use 
JavaScript. Take a look at the source code of this page and see how 
it's done (I'm sure Marcos would not approve such code). If JavaScript 
is disabled, only one version is displayed (the one tagged as version one).

### 4. How (II)

Wrapping every potential version of text in `<span>` tags with custom 
CSS classes here and there is tiring, so I came up with a way to specify the 
same but with fewer characters. This is what I'm doing now instead:

```text
My favourite book is @{Foucault's Pendulum||Fictions}@
```

It's shorter and less distracting (for the writer). The `<span>` tags and 
CSS classes are added automatically. While I could have implemented it too
using JavaScript, I thought it was worth adding it to my 
static site generator [belbo](https://github.com/lessmarcos/belbo).
