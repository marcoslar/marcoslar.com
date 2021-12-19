package main

import (
	"fmt"
	"html/template"
)

// BelboFuncs holds custom functions that can be used in templates
var BelboFuncs = template.FuncMap{
	"fancyTitle": func(s string) template.HTML {
		if len(s) < 2 {
			return template.HTML(s)
		}

		return template.HTML(
			fmt.Sprintf(`<span class="init-ch">%s</span>%s`, s[0:1], s[1:]),
		)
	},
}
