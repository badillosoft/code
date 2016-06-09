/**
 * @author:		Alan Badillo Salas
 * @email:		badillo.soft@hotmail.com
 * @site:		https://github.com/badillosoft/code/
 * 
 * @date:		junio 2016
 * @version:	1.0
 * 
 */

const Scene = require("./canvas/scene");
const Primitives = require("./canvas/primitives");

module.exports = {
	Scene,
	Box: Primitives.Box,
	Circle: Primitives.Circle
};