/**
 * @author:		Alan Badillo Salas
 * @email:		badillo.soft@hotmail.com
 * @site:		https://github.com/badillosoft/code/
 * 
 * @date:		junio 2016
 * @version:	1.0
 * 
 */

const MouseEvent = require("./mouse");

class Scene {
	constructor(options) {
		if (options && options.id) {
			this.build(options.id);
		}
		
		this.clearStyle = "#333";
		
		this.shapes = [];
		
		this.meta(options);
	}
	
	build(id) {
		this.canvas = document.getElementById(id);
		
		this.ctx = this.canvas.getContext("2d");
		
		window.addEventListener('resize', () => {
			this.resize();
		});
		
		this.resize();
		
		MouseEvent.implements(this, this.canvas);
	}
	
	resize() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}
	
	meta(options) {
		if (!options) {
			return;
		}
		
		for (const k in options) {
			this[k] = options[k];
		}
	}
	
	add(shape) {
		this.shapes.push(shape);
	}
	
	refresh() {
		this.ctx.fillStyle = this.clearStyle;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}
	
	draw() {
		if (this.isDrawCanceled) {
			return;
		}
		
		this.refresh();
		
		const ctx = this.ctx;
		
		for (const shape of this.shapes) {
			shape.draw(ctx);
		}
		
		this.onDraw(ctx);
		
		requestAnimationFrame(() => {
			this.draw();
		});
	}
	
	update() {
		if (this.isUpdateCanceled) {
			return;
		}
		
		this.onUpdate();
		
		requestAnimationFrame(() => {
			this.update();
		});
	}
	
	start() {
		this.draw();
		this.update();
	}
	
	onDraw(ctx) {
		
	}
	
	onUpdate() {
		
	}
}

module.exports = Scene;