/**
 * 
 * Alan Badillo Salas
 * badillo.soft@hotmail.com
 * https://github.com/badillosoft/code
 * 
 * Create at: 30-05-2016
 * Version: 1.0.0
 * 
 * Genera las etiquetas para una montaña rusa para x3dom
 * 
 */

"use strict"

const { header, footer } = require("./russian.util");

const params = {
	n: 10, // número de puntos
	r: 15, // radio de la rueda
	w: 10, // apertura entre las caras
};

const { n, r, w } = params;

// Generamos los n puntos de unión para n carritos
var points = [];

for (var i = 0; i <= n; i += 1) {
	const a = 2.0 * Math.PI * (i / n);

	const x = r * Math.cos(a);
	const y = r * Math.sin(a);

	points.push({ x, y, a });
}

// Dibujamos el armazón frontal
const face = (z) => {
	var ip = null; // punto anterior
	var s = "";

	for (const p of points) {
		// Trazamos el cilindro del centro al punto
		
		s += `
		<transform translation="0 0 ${z}" rotation="0 0 1 ${(p.a).toFixed(2)}">
			<shape>
				<appearance>
					<material diffuseColor="1 0 0"/>
				</appearance>
				<cylinder radius="0.3" height="${(2 * r).toFixed(2)}"/>
			</shape>
		</transform>
		`;
		
		if (!ip) {
			ip = p;
			continue;
		}
		
		const dx = p.x - ip.x;
		const dy = p.y - ip.y;
		
		const l = Math.sqrt(dx * dx + dy * dy); // Longitud de la barra

		// Trazamos un cilindro del punto anterior al actual orientado
		// según el ángulo
		s += `
		<transform translation="${(ip.x).toFixed(2)} ${(ip.y).toFixed(2)} ${z}"
			rotation="0 0 1 ${(ip.a).toFixed(2)}">
			<shape>
				<appearance>
					<material diffuseColor="1 1 0.8"/>
				</appearance>
				<cylinder radius="0.3" height="${(l + 1).toFixed(2)}"/>
			</shape>
		</transform>
		`;
		
		ip = p;
	}
	
	return s;
};

const unions = (z) => {
	var s = "";

	for (const p of points) {
		// calculamos una distancia constante hacia afuera
		const dx = (r / 20) * Math.cos(p.a + r / 60);
		const dy = (r / 20) * Math.sin(p.a + r / 60);
		
		// Trazamos un cilindro que una cada punto
		s += `
		<transform translation="${(dx).toFixed(2)} ${(dy).toFixed(2)} 0" 
			rotation="0 0 1 ${(Math.PI / n).toFixed(2)}">
			<transform translation="${(p.x).toFixed(2)} ${(p.y).toFixed(2)} ${z / 2}"
				rotation="1 0 0 1.5">
				<shape>
					<appearance>
						<material diffuseColor="1 1 0.8"/>
					</appearance>
					<cylinder radius="0.3" height="${z}"/>
				</shape>
			</transform>
		</transform>
		`;
	}
	
	return s;
};

const cabins = () => {
	var s = "";
	var ss = "";

	var i = 0;
	for (const p of points) {
		// calculamos una distancia constante hacia afuera
		const dx = (r / 4) * Math.cos(p.a + r / 60);
		const dy = (r / 4) * Math.sin(p.a + r / 60);
		
		// Creamos una cabina en cada punto
		s += `
		<transform
			translation="${(dx).toFixed(2)} ${(dy).toFixed(2)} 0" 
			rotation="0 0 1 ${(Math.PI / n).toFixed(2)}">
			<transform DEF="cab_${i}"
				translation="${(p.x).toFixed(2)} ${(p.y).toFixed(2)} ${w / 2}"
				rotation="0 0 1 0.78">
				<shape>
					<appearance>
						<material diffuseColor="0 0 1"/>
					</appearance>
					<box size="${w / 2} ${w / 2} ${w / 2}"/>
				</shape>
			</transform>
		</transform>
		`;
		
		ss += `
		<orientationInterpolator DEF="rot_${i}"
			key="0 0.5 1"
			keyValue="0 0 1 0  0 0 1 -3.1416  0 0 1 -6.2832"
			/>
		
		<Route fromNode="time" fromField="fraction_changed"
			toNode="rot_${i}" toField="set_fraction"></Route>

		<Route fromNode="rot_${i}" fromField="value_changed"
			toNode="cab_${i}" toField="rotation"></Route>
		`;
		
		i += 1;
	}
	
	return [s, ss];
};

const body = () => {
	var s = '';
	
	s += `
	<directionalLight direction="-1 -1 0"></directionalLight>
	
	<timeSensor DEF="time" cycleInterval="10" loop="true"></timeSensor>
	
	<transform DEF="cross" rotation="0 0 1 0">
	`;
	
	s += "<!-- Frontal Face -->";
	s += face(0);
	s += "<!-- Back Face -->";
	s += face(w);
	s += "<!-- Unions -->";
	s += unions(w);
	s += "<!-- cabins -->";
	s += cabins()[0];
	s += "<!-- End -->";
	
	s += `
	</transform>
	`;
	
	return s;
};

const base = () => {
	return `
		<transform translation="0 0 ${w / 2}" rotation="1 0 0 1.57">
			<shape>
				<appearance>
					<material diffuseColor="1 1 0"/>
				</appearance>
				<cylinder radius="0.3" height="${w}"/>
			</shape>
		</transform>
		<transform translation="0 ${-r / 1.1} ${-r / 1.1}" rotation="1 0 0 0.78">
			<shape>
				<appearance>
					<material diffuseColor="1 1 0"/>
				</appearance>
				<cylinder radius="0.3" height="${2 * r + w}"/>
			</shape>
		</transform>
		<transform translation="0 ${-r / 1.1} ${r / 1.1 + w}" rotation="1 0 0 -0.78">
			<shape>
				<appearance>
					<material diffuseColor="1 1 0"/>
				</appearance>
				<cylinder radius="0.3" height="${2 * r + w}"/>
			</shape>
		</transform>
	`;
};

const animation = () => {
	return `
		<orientationInterpolator DEF="rot"
			key="0 0.5 1"
			keyValue="0 0 1 0  0 0 1 3.1416  0 0 1 6.2832"
			/>

		<Route fromNode="time" fromField="fraction_changed"
			toNode="rot" toField="set_fraction"></Route>

		<Route fromNode="rot" fromField="value_changed"
			toNode="cross" toField="rotation"></Route>
	`;
};

const ground = `
	<transform translation="0 ${-r - w} ${w / 2}" rotation="1 0 0 0">
		<shape>
			<appearance>
				<material diffuseColor="1 1 0.8"/>
			</appearance>
			<box size="${10 * r} 1 ${10 * r}"/>
		</shape>
	</transform>
`;

console.log(header);
console.log(body());
console.log(base());
console.log(ground);
console.log(animation());
console.log(cabins()[1]);
console.log(footer);