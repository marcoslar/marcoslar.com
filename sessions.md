---
title = "S e s s i o n s"
dont_show_in_sessions = true
random_title = true
---

<ul class="posts">
{{ range $k, $page := .AllPages -}}
    {{ $show_in_sessions := true }}
    {{ if $page.Params.dont_show_in_sessions }}
        {{ $show_in_sessions = false }}
    {{ else if not $page.Params.kind }}
        {{ $show_in_sessions = true }}
    {{ else if eq $page.Params.kind "log" }}
        {{ $show_in_sessions = false }}
    {{ end }}
    {{ if $show_in_sessions -}}
        <li>
           <span class="post-date">{{ $page.CreatedAt.Format "02 Jan 2006" }}</span>
           {{ if $page.Params.external_url }}
                <a
                 style="{{ if $page.Params.li_style }}{{ range $style := $page.Params.li_style }}{{ $style }};{{ end }}{{ end }}"
                 href="{{ $page.Params.external_url }}">{{ $page.Params.title }}</a>
           {{ else }}
                <a 
                 style="{{ if $page.Params.li_style }}{{ range $style := $page.Params.li_style }}{{ $style }};{{ end }}{{ end }}"
                 href="/{{ $page.PublicPath }}/">{{ $page.Params.title }}</a>
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
