---
title = "Nubes de Monet usando ruido Perlin (old)"
categories = ["software"]
---

En la naturaleza muchas estructuras parecen surgir del caos,
de la aleatoriedad. Si observas las nubes seguramente no
distingirás ningún patrón recurrente que te ayude a predecir
su forma o estructura. Podríamos pensar que son simplemente
agrupaciones al azar de partículas de agua o hielo suspendidas
en la atmósfera.

Como siempre, la realidad es un poco más complicada. Si
quisiéramos simular nubes en un ordenador y nos valiésemos
por el azar que puede darnos la ubicua función `random`, no
quedaríamos muy satisfechos. Para comprobarlo vamos a generar
nubes en dos dimensiones (texturas) usando
la función `Math.random` de JavaScript.
Esta función sigue una distribución uniforme, es decir,
todos los valores que genera tienen la misma
probabilidad de aparecer.

Éste es el código ([Processing.js]) que genera la textura:

```javascript
void setup() {
   size(400, 400);
   noLoop();
}

t = 100;

void draw() {
   background(0);
   loadPixels();

   for (int x = 0; x < width; x++) {
      for (int y = 0; y < height; y++) {
         float bright = Math.random() * 255;
         pixels[x + y * width] = color(bright, 127, 255);
         t += 0.1;
      }
   }
   updatePixels();
}
```

Iteramos sobre todos los píxeles que forman la región a pintar y
les asignamos un color comprendido entre 0 y 255 con tonos de azul y rosa.
Y el resultado:

<figure>
    <img alt="Random Monet" src="/static/projects/perlin-noise/img/monet-random.jpg">
    <figcaption>¿Una tele mal sintonizada?</figcaption>
</figure>

Como véis, no tiene aspecto de nube debido a que
un generador de números aleatorios (como la función `Math.random`)
produce números que no guardan relación alguna y no muestran ningún
patrón distinguible. Para simular la naturaleza de las nubes, es
necesario un poco menos de aleatoriedad en nuestros cálculos,
un caos coherente.

¿Cómo generar un poco menos de aleatoriedad? Podemos usar
la función [Perlin Noise] (Ruido Perlin). Los detalles de esta
función los podéis consultar en la [web de Ken Perlin].
Perlin desarrolló este algoritmo en los
ochenta para generar las texturas de la película Tron.
Lo que nos interesa es que
el Ruido Perlin tiene un comportamiento más "natural". Produce
una secuencia de números pseudo-aleatorios menos "brusca" que
la que podría producir la función `Math.random`.

Usaremos el Ruido Perlin como generador de números pseudo-aleatorios.
[Processing.js] tiene una función `noise` que implementa este algoritmo.
El código para generar las nubes:

```javascript
void setup() {
   size(300, 300);
   noLoop();
}

float toff = 0;

void draw() {
   background(0);
   loadPixels();
   float xoff = 0.0;

   for (int x = 0; x < width; x++) {
      float yoff = 0.0;
      for (int y = 0; y < height; y++) {
         float bright = noise(xoff, yoff) * 255;
         pixels[x + y * width] = color(bright, 127, 255);
         yoff += 0.01;
      }
      xoff += 0.01;
   }
   updatePixels();
   toff += 1;
}
```

El código es casi el mismo. Lo único que varía es el
uso de la función `noise` en lugar de `Math.random`.
El resultado:

<figure>
    <img alt="Random Monet" src="/static/projects/perlin-noise/img/monet-perlin.jpg">
    <figcaption>Nubes de Monet, o casi</figcaption>
</figure>

Bueno, quizá no se parezcan demasiado a las nubes de los
cuadros de Monet, pero esta es la primera vez que
genero algo con aspecto "natural" y me siento ... entusiasmado.


[Processing.js]: http://processing.org/
[Perlin Noise]: http://en.wikipedia.org/wiki/Perlin_noise
[web de Ken Perlin]: http://www.mrl.nyu.edu/~perlin/doc/oscar.html