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
	"contains": func(haystack []interface{}, needle string) bool {
		// Somehow the first parameter passed from the template is not []string
		stringHaystack := make([]string, len(haystack))
		for i, v := range haystack {
			stringHaystack[i] = fmt.Sprint(v)
		}

		for _, e := range stringHaystack {
			if e == needle {
				return true
			}
		}

		return false
	},
}
