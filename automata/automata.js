/**
 * @author:		Alan Badillo Salas
 * @email:		badillo.soft@hotmail.com
 * @site:		https://github.com/badillosoft/code/automata
 * 
 * @date:		junio 2016
 * @version:	1.0
 * 
 * @description:
 * 
 * Sistema que define una gramática a partir de un conjunto
 * de símbolos terminales, no terminales y reglas de producción
 * y evalua si un conjunto de cadenas son válidas para dicha
 * gramática.
 * 
 */

'use strict'

process.stdout.write('\x1Bc');

const separator = () => {
	var s = '';

	for (var i = 0; i < 80; i += 1) {
		s += '-';
	}

	console.log(chalk.gray(s));
};

const show = (title, message, color, prompt) => {
	color = color || 'gray';
	prompt = prompt || ':';
	console.log(chalk[color](`${title}${prompt}`), message || '');
};

// Convierte un arreglo en un conjunto de elementos únicos
const array_to_set = (array) => {
	for (var i = 0; i < array.length; i += 1) {
		const u = array[i];
		for (var j = i + 1; j < array.length; j += 1) {
			if (u === array[j]) {
				array.splice(j, 1);
				j -= 1;
			}
		}
	}

	return array.sort();
};

// Obtenemos una cadena del usuario, quitamos los espacios
// y la transformamos en un arreglo de caracteres, el cual
// convertimos en un arreglo de elementos únicos
const get_set = (message, color, prompt) => {
	return array_to_set(get_line(message, color, prompt).split(''));
};

const get_line = (message, color, prompt) => {
	color = color || 'gray';
	prompt = prompt || ': ';
	return readlineSync.question(`${chalk[color](message)}${chalk.gray(prompt)}`)
		.replace(/[^A-Za-z\.$]+/g, '');
};

// Comprueba se a es subconjunto no estricto de b
const sub_set = (a, b) => {
	for (const x of a) {
		if (b.indexOf(x) >= 0) {
			return true;
		}
	}
	return false;
};

// Comprueba se a es subconjunto estricto de b
const strict_sub_set = (a, b) => {
	for (const x of a) {
		if (!(b.indexOf(x) >= 0)) {
			return false;
		}
	}
	return true;
};

// Obtiene la unión de dos conjuntos
const union = (a, b) => {
	const aux = [];

	for (const x of a) {
		aux.push(x);
	}

	for (const x of b) {
		aux.push(x);
	}

	return array_to_set(aux);
}

const chalk = require('chalk');
const readlineSync = require('readline-sync');

const terminales = get_set('Ingresa el conjunto de símbolos terminales');

separator();

show("Terminales", `{ ${terminales.join(', ')} }`, 'green');

separator();

const no_terminales = get_set('Ingresa el conjunto de símbolos no-terminales');

separator();

show("No-Terminales", `{ ${no_terminales.join(', ')} }`, 'green');

if (sub_set(no_terminales, terminales)) {
	show(`Error: Un símbolo es terminal y también no-terminal`,
		null, 'magenta', '.');
	process.exit(0);
}

separator();

const alfabeto = union(terminales, no_terminales);

alfabeto.push('.');

show("Alfabeto", `{ ${alfabeto.join(', ')} }`, 'green');

separator();

const S = (get_set('Ingresa el símbolo no-terminal inicial') || [''])[0];

if (!(no_terminales.indexOf(S) >= 0)) {
	show(`Error: El símbolo ${chalk.cyan(S)} no es no-terminal`,
		null, 'magenta', '.');
	process.exit(0);
}

separator();

show("Símbolo inicial", S, 'green');

separator();

show('Producciones');

const producciones = {};

for (const x of no_terminales) {
	producciones[x] = [];
}

const completo = () => {
	for (const k in producciones) {
		if (producciones[k].length === 0) {
			return false;
		}
	}

	return true;
}

do {
	console.log();

	const aux = (get_set(
		'Ingresa un símbolo no-terminal o $ para finalizar') || [''])[0];

	if (aux === '$') {
		if (completo()) {
			break;
		}

		show(`Advertencia: Un símbolo no-terminal no se ha definido`,
			null, 'yellow', '.');

		const continuar = get_line(
			'¿Desea definirlo?', 'blue', ' s/n ') === 's';

		if (continuar) {
			continue;
		}

		break;
	}

	if (!(no_terminales.indexOf(aux) >= 0)) {
		show(`Advertencia: El símbolo ${chalk.cyan(aux)} no es no-terminal`,
			null, 'yellow', '.');
		continue;
	}

	console.log();
	const s = get_line(aux, 'red', ' <- ').split('');

	if (!strict_sub_set(s, alfabeto)) {
		show(`Advertencia: Un símbolo no pertenece al alfabeto`,
			null, 'yellow', '.');
		continue;
	}

	// show(aux, `[ ${s.join(', ')} ]`);
	producciones[aux].push(s);
} while (true);

console.log();

separator();

show('Producciones');

console.log();

for (const k in producciones) {
	const p = producciones[k];

	var s = [];

	for (const arr of p) {
		s.push(arr.join(''));
	}

	show(k, s.join(' | '), 'red')
}

const print_s = (w, i, c1, c2, pre) => {
	var c = pre || '';
	for (var j = 0; j < w.length; j += 1) {
		const color = i === j ? c1 : c2;
		c += chalk[color](w[j]);
	}
	console.log(c);
};

// Comprueba la producción p valida la cadena w
// Si la producción contiene una subproducción checa si esta válida la subcadena
const next = (w, i, p) => {
	print_s(w, i, 'magenta', 'gray');

	var queue = [];

	if (i >= w.length) {
		return {
			index: i,
			produccion: null,
			queue
		};
	}

	const aux = producciones[p];
	for (const x of aux) {

		var valida = true;
		for (var j = 0; j < x.length; j += 1) {
			const s = x[j];

			print_s(x, j, 'red', 'white', `${p}: `);

			// Checamos si el símbolo es lamda
			if (s === '.') {
				continue;
			}

			// Checamos si el símbolo es no-terminal
			if (no_terminales.indexOf(s) >= 0) {
				const z = next(w, i, s);

				for (const q of z.queue) {
					queue.push(q);
				}

				i = z.index;

				if (i >= w.length) {
					valida = !!z.produccion;

					break;
				}

				continue;
			}

			// Checamos si el símbolo es diferente
			if (w[i] !== s) {
				valida = false;
				break;
			}

			i += 1;

			if (i < w.length) {
				print_s(w, i, 'magenta', 'gray');
			}
		}

		if (valida) {
			if (p && i >= w.length) {

				queue.push(`<${p}:${x.join('')}>`);

				return {
					index: i,
					produccion: p,
					queue
				};
			}

			queue = [];
		}
	}

	return {
		index: i,
		produccion: null,
		queue
	};
};

do {
	console.log();
	const w = get_line('Ingrese la cadena a evaluar o $ para finalizar',
		'cyan').split('');
		
	console.log();

	if (w.join('') === '$') {
		break;
	}

	if (!strict_sub_set(w, terminales)) {
		show(`Advertencia: Un símbolo no es terminal`,
			null, 'yellow', '.');
		continue;
	}

	const z = next(w, 0, S);

	console.log();
	separator();

	if (z.index < w.length) {
		print_s(w, z.index, 'red', 'gray', chalk.yellow('La cadena no es válida: '));
	} else {
		show(`La cadena es válida`, w.join(''), 'yellow');
	}

	separator();

} while (true); 