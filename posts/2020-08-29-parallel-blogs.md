---
title = "Parallel blogs (or parablogs)"
---

### 1. What

The idea is similar to that of parallel universes@{:|| (but to a lesser extent 
of course):}@ in a *parallel blog*, each post consists of multiple versions of 
itself that co-exist within the same "plane of existence" (the URL of each 
individual post). The sum of all these coexisting versions constitutes the actual 
post that one might expect under a given URL.  
Take the page you are reading right now as an example. There are multiple 
versions of it, all coexisting under the same URL 
(`/posts/2020/08/parallel-blogs/`). How can you access the other versions? 
Just reload the browser. You may see a different version of this page, similar 
to the previous one and conveying the same meaning@{|| (most of the time)}@.

### 2. Why

Few ideas are more overwhelming than that of the multiverse, and the
mere notion that the universe may perpetually fork itself before the
realization of every action---no matter how small---is fascinating.
In some@{---poor---||---poor---|| }@way this site tries to implement that idea.
One page, multiple versions. Some versions could contradict the others,
some could be slight variations of the original@{(which one is
the original?), ||,}@ some versions could have grammar @{miztakes||mistakes}@, 
some could be really @{good||bad}@, and some could make this site one of the 
top 500 sites on the web.

### 3. How

An easy way to do this is by wrapping different versions of text snippets
in `<span>` tags and hiding or displaying them or randomly. For example, the
next sentence could have two possible rendering outcomes:

```
My favourite book is <span class="v1">Foucault's Pendulum</span><span class="v2">Fictions</span>.
```

*Outcome 1:*
```
My favourite book is Foucault's Pendulum.
```

*Outcome 2:*
```
My favourite book is Fictions.
```

I don't know how to generate random numbers with plain HTML and CSS, so I use
JavaScript. If JavaScript is disabled, only one version is displayed 
(the one tagged as version one).

But wrapping every potential version of text in `<span>` tags with custom 
CSS classes here and there is tiring, so I came up with a way to specify the 
same but with fewer characters. This is what I'm doing now instead:

```
My favourite book is @{Foucault's Pendulum||Fictions}@.
```

It's shorter and less distracting (for the writer). The `<span>` tags and 
CSS classes are added automatically. While I could have implemented it in JavaScript, 
I thought it was worth adding it to my static site generator 
[belbo](https://github.com/marcoslar/belbo).

Check out the [source code](https://github.com/marcoslar/marcoslar.com/blob/master/posts/2020-08-29-parallel-blogs.md?plain=1) 
of this post to see the usage of `@{||}@` in action.
