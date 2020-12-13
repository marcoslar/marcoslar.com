---
title = ""
random_title = true
---

<h1 class="sessions">S e s s i o n s</h1>

<ul class="posts" style="margin-top:6rem;">
{{ range $k, $page := .AllPages -}}
    {{ if and (ne $page.Name "index") (ne $page.Name "about") (ne $page.Name "books") (ne $page.Name "404") -}}
        <li>
           <span class="post-date">{{ $page.CreatedAt.Format "02 Jan 2006" }}</span>
           {{ if $page.Params.external_url }}
                <a
                 style="{{ if $page.Params.li_style }}{{ range $style := $page.Params.li_style }}{{ $style }};{{ end }}{{ end }}"
                 href="{{ $page.Params.external_url }}">{{ $page.Params.title }}</a>
           {{ else }}
                <a 
                 style="{{ if $page.Params.li_style }}{{ range $style := $page.Params.li_style }}{{ $style }};{{ end }}{{ end }}"
                 href="{{ $page.PublicPath }}/">{{ $page.Params.title }}</a>
           {{ end }}
           <!--span class="post-categories">
                {{ range $i, $category := $page.Params.categories }}
                    <span class="post-category--{{ $category }}" >{{ $category }}</span>
                {{ end }}
           </span-->
        </li>
    {{- end }}
{{- end }}
</ul>
