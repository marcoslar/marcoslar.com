---
title = "D r a w i n g s"
drawings = []
---
 
<div class="gallery">
{{ range $k, $d := .Params.drawings }}
    <img src="{{$d.url}}" alt="{{$d.alt}}" title="{{$d.alt}}">
{{ end }}
</div>


<style>
.gallery img {
    width: 50%;
}

body {
    border-top: 5px solid #fffd25 !important;
}
</style>

