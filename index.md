---
title = "Lessmarcos"
random_title = true
layout = "index_layout"
---

### Sessions

<ul>
{{ range $k, $page := .AllPages -}}
    {{ if and (ne $page.Name "index") (ne $page.Name "about") (ne $page.Name "books") (ne $page.Name "404") -}}
        <li>
           <span class="post-date">{{ $page.CreatedAt.Format "2006-01-02" }}</span>
           {{ if $page.Params.external_url }}
                <a href="{{ $page.Params.external_url }}">{{ $page.Params.title }}</a>
           {{ else }}
                <a href="{{ $page.PublicPath }}/">{{ $page.Params.title }}</a>
           {{ end }}
           <span class="post-categories">
                {{ range $i, $category := $page.Params.categories }}
                    <span class="post-category--{{ $category }}" >{{ $category }}</span>
                {{ end }}
           </span>
        </li>
    {{- end }}
{{- end }}
</ul>
