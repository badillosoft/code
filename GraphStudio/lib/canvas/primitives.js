/**
 * @author:		Alan Badillo Salas
 * @email:		badillo.soft@hotmail.com
 * @site:		https://github.com/badillosoft/code/
 * 
 * @date:		junio 2016
 * @version:	1.0
 * 
 */

const {Metaobject} = require("../canvas");

class Box {
	constructor(options) {
		this.type = 'box';
		this.x = 0;
		this.y = 0;
		this.w = 10;
		this.h = 10;
		
		this.strokeStyle = "rgb(255, 84, 84)";
		this.wireframe = true;
		
		this.fillStyle = "rgb(127, 42, 42)";
		this.solid = true;
		
		for (const k in options) {
			this[k] = options[k];
		}
	}
	
	get center() {
		return {
			x: this.x + this.w / 2.0,
			y: this.y + this.h / 2.0
		}
	}
	
	get leftUp() {
		return {
			x: this.x,
			y: this.y
		}
	}
	
	get leftDown() {
		return {
			x: this.x,
			y: this.y + this.h
		}
	}
	
	get rightUp() {
		return {
			x: this.x + this.w,
			y: this.y
		}
	}
	
	get rightDown() {
		return {
			x: this.x + this.w,
			y: this.y + this.h
		}
	}
	
	contains(p) {
		return p.x >= this.x && p.x <= this.x + this.w
			&& p.y >= this.y && p.y <= this.y + this.h;
			
	}
	
	draw(ctx) {
		if (!this.solid && !this.wireframe) {
			return;
		}
		
		ctx.save();
		
		ctx.strokeStyle = this.strokeStyle;
		ctx.fillStyle = this.fillStyle;
		
		ctx.beginPath();
		
		if (this.solid) {
			ctx.fillRect(this.x, this.y, this.w, this.h);
			ctx.fill();
		}
		
		if (this.wireframe) {
			ctx.rect(Math.floor(this.x), Math.floor(this.y),
				Math.floor(this.w), Math.floor(this.h));
			ctx.stroke();
		}
		
		ctx.closePath();
		
		ctx.restore();
	}
}

class Circle {
	constructor(options) {
		this.type = 'circle';
		this.x = 0;
		this.y = 0;
		this.r = 10;
		
		this.resetStrokeStyle = "rgb(255, 84, 84)";
		this.strokeStyle = this.resetStrokeStyle;
		this.wireframe = true;
		
		this.resetFillStyle = "rgba(255, 255, 255, 0.5)";
		this.fillStyle = this.resetFillStyle;
		this.solid = true;
		
		for (const k in options) {
			this[k] = options[k];
		}
	}
	
	get center() {
		return {
			x: this.x,
			y: this.y
		}
	}
	
	contains(p) {
		const dx = p.x - this.x;
		const dy = p.y - this.y;
		const r = Math.sqrt(dx * dx + dy * dy);
		
		return r <= this.r;
			
	}
	
	draw(ctx) {
		if (!this.solid && !this.wireframe) {
			return;
		}
		
		ctx.save();
		
		ctx.strokeStyle = this.strokeStyle;
		ctx.fillStyle = this.fillStyle;
		
		ctx.beginPath();
		
		ctx.arc(this.x, this.y, this.r, 0, 2.0 * Math.PI);
		
		if (this.solid) {
			ctx.fill();
		}
		
		if (this.wireframe) {
			ctx.stroke();
		}
		
		ctx.closePath();
		
		ctx.restore();
	}
}

module.exports = {
	Box,
	Circle
};