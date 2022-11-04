---
title = "Writings"
display_in_sessions = false
display_date = false
---

<table>
    <tbody>
        {{- range $k, $page := .AllPages -}}
            {{ $display_in_sessions := true }}
            {{ if eq $page.Config.display_in_sessions false }}
                {{ $display_in_sessions = false }}
            {{ end }}
            {{ if $display_in_sessions -}}
                <tr>
                    <td class="post-date">
                        <span>{{ $page.CreatedAt.Format "Jan 2006" }}</span>
                    </td>
                    <td class="post-title">
                        <a href="/{{ $page.Url }}/">
                            <span style="{{ if $page.Config.li_style }}{{ range $style := $page.Config.li_style }}{{ $style }};{{ end }}{{ end }}">
                                {{ $page.Config.title }}
                            </span>
                        </a>
                    </td>
                </tr>
            {{ end }}
        {{ end }}
    </tbody>
</table>
