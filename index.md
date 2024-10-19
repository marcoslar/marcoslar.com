---
title = "Marcoslar.com"
display_in_sessions = false
display_date = false
display_backlink = false
---

I’m Marcos. I live with my wonderful wife 
@{(<i>naber canım!</i>)||(<i>bak canım, çevrimiçiyim!</i>)}@ in Germany,
where I work as a @{computer programmer|| software developer}@.
This site is where I stash some of my stuff. If you come
across prose, expect grammar mistakes; if it’s code you’ll
definitely find some @{silly||}@ bugs. The *lar* suffix in the 
`marcoslar.com` domain name represents the plural form of my surname 
in Turkish, kind of like Marco*ses*@{ in English||, though the English plural 
always felt a bit off to me}@.
If you find anything useful here, consider yourself lucky.

<div class="columns">
    <div class="column">
        {{ template "partials_postlist" . }}
    </div>
    <div class="column">
        {{ template "partials_index_left" . }}
    </div>
</div>
