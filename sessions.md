---
title = "Sessions"
dont_show_in_sessions = true
random_title = true
---

<ul class="posts">
{{ range $k, $page := .AllPages -}}
    {{ $show_in_sessions := true }}
    {{ if $page.Config.dont_show_in_sessions }}
        {{ $show_in_sessions = false }}
    {{ else if not $page.Config.kind }}
        {{ $show_in_sessions = true }}
    {{ else if eq $page.Config.kind "log" }}
        {{ $show_in_sessions = false }}
    {{ end }}
    {{ if $show_in_sessions -}}
        <li>
           <span class="post-date">{{ $page.CreatedAt.Format "02 Jan 2006" }}</span>
           {{ if $page.Config.external_url }}
                <a
                 style="{{ if $page.Config.li_style }}{{ range $style := $page.Config.li_style }}{{ $style }};{{ end }}{{ end }}"
                 href="{{ $page.Config.external_url }}">{{ $page.Config.title }}</a>
           {{ else }}
                <a 
                 style="{{ if $page.Config.li_style }}{{ range $style := $page.Config.li_style }}{{ $style }};{{ end }}{{ end }}"
                 href="/{{ $page.Url }}/">{{ $page.Config.title }}</a>
           {{ end }}
           <!--span class="post-categories">
                {{ range $i, $category := $page.Config.categories }}
                    <span class="post-category--{{ $category }}" >{{ $category }}</span>
                {{ end }}
           </span-->
        </li>
    {{- end }}
{{- end }}
</ul>
