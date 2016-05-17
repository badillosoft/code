# Code

Algoritmos que resuelven una tarea específica.

## Introducción

En este repositorio encontrarás diversos algoritmos de sencillos a complejos en diferentes
lenguajes de programación como *C*, *C++*, *C#*, *Java*, *Ruby*, *Python*, *Javascript*, *Swift*,
*PHP*, entre otros. El objetivo no es ninguno en específico, si quieres aportar algoritmos
puedes enviarlos a badillo.soft@hotmail.com con tu nombre, alias, y alguna referencia si
lo deseas como *twitter*, *facebook*, *github* u otros.

## Lista de códigos

* __polish.js__ `Javascript` - Convierte una expresión matemática en una pila polaca.

> Ejemplo

~~~js
const polish = requiere('./polish').new;

polish.parse('1 + 2 + 3 * 4 + 5 - 6 / 7');

console.log(polish.queue);

console.log(polish.eval());

polish.parse('x + y^2 - 3 * (x - 2 * y) + sin(x * cos(y + exp(2)))');

console.log(polish.queue);

console.log(polish.eval({
    x: 1,
    y: 3
}));
~~~

