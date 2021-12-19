---
title = "Sessions"
display_in_sessions = false
display_date = false
---

<ul class="posts">
{{ range $k, $page := .AllPages -}}
    {{ $display_in_sessions := true }}
    {{ if eq $page.Config.display_in_sessions false }}
        {{ $display_in_sessions = false }}
    {{ end }}
    {{ if $display_in_sessions -}}
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
        </li>
    {{- end }}
{{- end }}
</ul>
