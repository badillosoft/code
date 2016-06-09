/**
 * @author:		Alan Badillo Salas
 * @email:		badillo.soft@hotmail.com
 * @site:		https://github.com/badillosoft/code/
 * 
 * @date:		junio 2016
 * @version:	1.0
 * 
 */

const { Scene, Circle } = require("./canvas");

class Util {
	static token(n) {
		var s = "";

		while (s.length < n) {
			s += `${Math.floor(Math.random() * 100000)}`;
		}

		return s.substr(0, n);
	}

	static randomColor() {
		const r = Math.floor(Math.random() * 255);
		const g = Math.floor(Math.random() * 255);
		const b = Math.floor(Math.random() * 255);

		return `rgba(${r}, ${g}, ${b}, 0.5)`;
	}
}

class Node {

	get x() { return this.shape.x; }
	set x(value) { this.shape.x = value; }

	get y() { return this.shape.y; }
	set y(value) { this.shape.y = value; }

	get r() { return this.shape.r; }
	set r(value) { this.shape.r = value; }

	constructor(options) {
		this.shape = new Circle(options);

		this.id = Util.token(16);
		this.neighbors = [];
		this.edges = [];
		this._path = [];

		this.selected = false;
	}

	draw(ctx) {
		const node = this;
		
		if (this.markHigh || this.markLow) {
			ctx.strokeStyle = this.markHigh ? "#fff" : "#ff0";
			ctx.lineWidth = 2;
			
			ctx.save();
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r + 4, 0, 2.0 * Math.PI);
			ctx.stroke();
			ctx.closePath();
			ctx.restore();
			
			if (node._path.length > 1) {
				const xnode = node._path[0]; 
				const ynode = node._path[1];
				
				ctx.strokeStyle = this.markHigh ? "#fff" : "#ff0";
				ctx.lineWidth = 2;
				
				ctx.save();
				ctx.beginPath();
				ctx.moveTo(xnode.x, xnode.y);
				ctx.lineTo(ynode.x, ynode.y);
				ctx.stroke();
				ctx.closePath();
				ctx.restore();
			}
		}

		for (const edge of node.edges) {
			edge.draw(ctx);
		}
	}

	changeColor() {
		const color = Util.randomColor();
		this.shape.fillStyle = color;
		this.shape.resetFillStyle = color;
	}

	set markConnect(apply) {
		this.shape.fillStyle = apply ? '#00f' : this.shape.resetFillStyle;
	}

	// set markHigh(apply) {
	// 	this.shape.fillStyle = apply ? '#f00' : this.shape.resetFillStyle;
	// }

	// set markLow(apply) {
	// 	this.shape.fillStyle = apply ? '#fff' : this.shape.resetFillStyle;
	// }

	set markHover(apply) {
		this.hovered = apply;
		this.shape.strokeStyle = apply ? "#0f0" : "#f00";
	}

	set markSelected(apply) {
		this.selected = apply;
		this.shape.fillStyle = apply ? "#ff0" : this.shape.resetFillStyle;
	}

	set markedPath(value) {
		this._markedPath = value;

		if (!value) {
			this.markHigh = false;
			this.markLow = false;
			this._path = [];
		}
	}

	connect(node) {
		if (this === node) {
			console.log('Same node');
			return;
		}

		var avoid = false;

		for (const neighbor of this.neighbors) {
			if (neighbor === node) {
				console.log("Same neighbor node");
				avoid = true;
				break;
			}
		}

		if (!avoid) {
			this.neighbors.push(node);
			this.edges.push(new Edge(this, node));
		}
	}

	path(node) {
		// console.log('Buscando path:', this.id, node.id);

		if (this._markedPath) {
			return this._min;
		}

		this.markedPath = true;

		this._min = Infinity;

		this._path = [this];
		// this.markHigh = true;

		if (this.id === node.id) {
			this._min = 0;
			return 0;
		}

		var best = null;

		for (const neighbor of this.neighbors) {
			const w = 1 + neighbor.path(node);

			// console.log("T:", this.id, neighbor.id, w);

			if (w < this._min) {
				this._min = w;
				best = neighbor;
			}
		}

		// console.log(this.id, best, this._min);

		if (this._min < Infinity) {
			for (const xnode of best._path) {
				this._path.push(xnode);
			}
			
			// for (const neighbor of this.neighbors) {
			// 	neighbor._path = [];
			// }
			
			return this._min;
		}

		// console.log('Not found', this.id);

		this._path.pop();
		
		// for (const neighbor of this.neighbors) {
		// 	neighbor._path = [];
		// }

		return Infinity;
	}
}

class Edge {
	constructor(start, end) {
		this.start = start;
		this.end = end;
	}
	
	draw(ctx) {
		const node = this.start;
		const neighbor = this.end;
		
		const dx = neighbor.x - node.x;
		const dy = neighbor.y - node.y;

		const a = Math.atan2(dy, dx);
		const da = Math.PI / 4;

		const ax = node.x + node.r * Math.cos(a - da);
		const ay = node.y + node.r * Math.sin(a - da);

		const bx = neighbor.x - neighbor.r * Math.cos(a + da);
		const by = neighbor.y - neighbor.r * Math.sin(a + da);

		const mx = (bx + ax) / 2.0;
		const my = (by + ay) / 2.0;

		const rx = 50 * Math.cos(a - Math.PI / 2);
		const ry = 50 * Math.sin(a - Math.PI / 2);

		ctx.save();

		ctx.strokeStyle = node.shape.fillStyle;
		ctx.fillStyle = node.shape.fillStyle;

		ctx.beginPath();
		ctx.moveTo(ax, ay);
		ctx.quadraticCurveTo(mx + rx, my + ry, bx, by);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.arc(bx, by, 10, 0, 2.0 * Math.PI);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();

		ctx.restore();
	}
}

class Graph {
	constructor(id) {
		this.nodes = [];
		this.hover_nodes = [];
		this.selected_nodes = [];
		
		var to = null;

		this.scene = new Scene({
			id: id,
			clearStyle: "#333",
			onMouseDown: (position) => {
				if (this.actions[this.action]) {
					this.actions[this.action](position);
				}
			},
			onMouseMove: (position) => {
				if (this.behaviours[this.behaviour]) {
					this.behaviours[this.behaviour](position);
				}
			},
			onDragStart: (position) => {
				console.log(this.action);

				if (this.action === "move") {
					for (const node of this.hover_nodes) {
						this.selectedNode = node;
					}
					return;
				}

				if (this.action === "connect" || this.action === "path") {
					this.firstNode = null;
					for (const node of this.hover_nodes) {
						node.markConnect = true;
						this.firstNode = node;
						break;
					}
					return;
				}
			},
			onDragEnd: (position) => {
				if (this.action === "move") {
					this.selectedNode = null;
					return;
				}

				if (this.action === "connect" || this.action === "path") {
					if (!this.firstNode) {
						return;
					}

					var connectNode = null;

					for (const node of this.hover_nodes) {
						connectNode = node;
					}

					if (this.action === "connect" && connectNode) {
						this.firstNode.connect(connectNode);
						this.firstNode.markConnect = false;
					} else if (this.action === "path" && connectNode) {
						for (const xnode of this.nodes) {
							xnode.markedPath = false;
						}
						this.firstNode._path = [];
						this.firstNode._min = Infinity;
						const w = this.firstNode.path(connectNode);
						// console.log(this.firstNode._path, w);
						for (const xnode of this.firstNode._path) {
							xnode.markLow = true;
						}

						var i = 0;
						const next = () => {
							if (!this.firstNode || this.firstNode.length <= 1) {
								return;
							}

							const n = this.firstNode._path.length;

							if (n === 0) {
								return;
							}

							const j = (i + 1) % n;

							const xnode = this.firstNode._path[i];
							const ynode = this.firstNode._path[j];
							
							if (!xnode || !ynode) {
								return;
							}

							xnode.markHigh = false;
							ynode.markHigh = true;

							i = (i + 1) % n;

							to = setTimeout(next, 1000);
						};
						
						window.clearTimeout(to);
						to = null;

						next();
						
						this.firstNode.markConnect = false;
						
						return;
					}
					
					this.firstNode.markConnect = false;
					this.firstNode = null;
				}
			},
			onDrag: (position, dx, dy) => {
				if (this.action === "move") {
					for (const node of this.hover_nodes) {
						node.shape.x += dx;
						node.shape.y += dy;
					}

					if (this.selectedNode) {
						this.selectedNode.x = position.x;
						this.selectedNode.y = position.y;
					}
					return;
				}
			},
			onDraw: (ctx) => {
				for (const node of this.nodes) {
					node.shape.draw(ctx);
				}

				for (const node of this.nodes) {
					node.draw(ctx);
				}
			}
		});

		this.scene.start();

		this.action = "create";
		this.behaviour = "hover";

		this.actions = {
			"delete": (position) => {
				var deleteNode = null;
				for (const node of this.hover_nodes) {
					deleteNode = node;
				}

				this.remove(deleteNode);
			},
			"color": (position) => {
				for (const node of this.hover_nodes) {
					node.changeColor();
				}
			},
			"create": (position) => {
				this.add(position);
			},
			"select": (position) => {
				for (const node of this.selected_nodes) {
					node.markSelected = false;
				}

				this.selected_nodes = [];

				for (const node of this.hover_nodes) {
					node.markSelected = !node.selected;

					if (node.selected) {
						this.selected_nodes.push(node);
					}
				}
			}
		};

		this.behaviours = {
			"hover": (position) => {
				this.hover_nodes = [];
				for (const node of this.nodes) {
					node.markHover = node.shape.contains(position);

					if (node.hovered) {
						this.hover_nodes.push(node);
					}
				}
			},
		}
	}

	add(position) {
		const color = Util.randomColor()

		const node = new Node({
			x: position.x,
			y: position.y,
			r: 15,
			fillStyle: color,
			resetFillStyle: color
		});

		this.nodes.push(node);
	}

	remove(node) {
		if (!node) {
			return;
		}

		// console.log(node, this.nodes);

		for (var i = 0; i < this.nodes.length; i++) {
			if (this.nodes[i] === node) {
				// console.log('Delete node', node);
				this.nodes.splice(i, 1);
				break;
			}
		}

		for (var i = 0; i < this.hover_nodes.length; i++) {
			if (this.hover_nodes[i] === node) {
				// console.log('Delete hover node', node);
				this.hover_nodes.splice(i, 1);
				break;
			}
		}

		for (var i = 0; i < this.selected_nodes.length; i++) {
			if (this.selected_nodes[i] === node) {
				// console.log('Delete selected node', node);
				this.selected_nodes.splice(i, 1);
				break;
			}
		}

		for (const xnode of this.nodes) {
			for (var i = 0; i < xnode.neighbors.length; i++) {
				if (xnode.neighbors[i] === node) {
					// console.log('Delete neighbor node', node);
					xnode.neighbors.splice(i, 1);
					break;
				}
			}
		}
	}
}

module.exports = {
	Util,
	Node,
	Graph
};