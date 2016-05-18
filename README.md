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

> `parse(expr : string) -> string` - Convierte una expresión matemática y la devuelve en una cadena

> `queue : []` - Contiene la pila de operandos y operadores después de ejecutar `parse()`

> `eval(variables : { name: value }) -> number` - Evalua la pila sustituyendo las variables por su valor

> `Polish.isNumber(expr) -> bool` - Determina si la expresión comienza con un número

> `Polish.number(expr) -> string` - Devuelve el primer número si la cadena comienza con un número

> `Polish.isOperator(expr) -> bool` - Determina si la expresión comienza con un operador

> `Polish.operator(expr) -> string` - Devuelve un operador si la cadena comienza con un operador

> `Polish.word(expr) -> string` - Devuelve la primer palabra si se comienza con una palabra

> `Polish.new -> <Polish>` - Devuelve una nueva instancia de la clase _Polish_

* __repeater.rb__ `Ruby` -  Repite fragmentos de texto y los guarda en un archivo
variando parámetros mediante una función