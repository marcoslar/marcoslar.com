---
title = "Juego de la vida de Conway (old)"
categories = ["software", "games"]
---

<script src="/static/js/jquery.min.js"></script>
<link rel="stylesheet" href="/static/projects/conwayjs/css/style.css">
<script src="/static/projects/conwayjs/js/cell.js"></script>
<script src="/static/projects/conwayjs/js/gol.js"></script>
<script src="/static/projects/conwayjs/js/grid.js"></script>

El [juego de la vida de Conway] implementado en JavaScript. ¿Por qué? Porque Swing es
pesado, porque desde una terminal pierde mucho y porque JS mola.

### 1. Demo

¡Puedes dibujar en el tablero!

<div>
  <div style="text-align:center">
    <div class="row-fluid">
      <canvas id="canvas" width="400" height="400">Canvas not supported</canvas>
    </div>
    <div class="row-fluid pagination-centered">
      <br>
      <div class="btn-group">
        <button type="button" id="run" >Run</button>&nbsp;
        <button type="button" id="step" >Step</button>&nbsp;
        <button type="button" id="randomize" >Random</button>
      </div>
    </div>
  </div>
</div>

[juego de la vida de Conway]: http://en.wikipedia.org/wiki/Conway's_Game_of_Life