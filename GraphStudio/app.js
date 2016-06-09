/**
 * @author:		Alan Badillo Salas
 * @email:		badillo.soft@hotmail.com
 * @site:		https://github.com/badillosoft/code/
 * 
 * @date:		junio 2016
 * @version:	1.0
 * 
 * @description:
 * 
 * Sistema que permite dibujar nodos y algunas utilidades de
 * la teoría de grafos.
 * 
 */

const {Graph} = require("./lib/graph");

onload = () => {
	const graph = new Graph("canvas");
	
	window.graph = graph;
};