/**
 * @author:		Alan Badillo Salas
 * @email:		badillo.soft@hotmail.com
 * @site:		https://github.com/badillosoft/code/
 * 
 * @date:		junio 2016
 * @version:	1.0
 * 
 */

class MouseEvent {
	static implements(target, el) {
		const events = [
			"onMouseDown",
			"onMouseUp",
			"onMouseMove",
			"onDragStart",
			"onDrag",
			"onDragEnd"
		];
		
		for (const event of events) {
			if (!target[event]) {
				target[event] = (evt) => {
					// console.log(`Mouse Event: ${event}`, evt, target);
				};
			}
		}
		
		el.addEventListener('mousedown', (evt) => {
			target.onMouseDown({ x: evt.x, y: evt.y }, evt);
			target.onDragStart({ x: evt.x, y: evt.y }, evt);
			target._touch = true;
		});
		
		el.addEventListener('mouseup', (evt) => {
			target.onMouseUp({ x: evt.x, y: evt.y }, evt);
			target.onDragEnd({ x: evt.x, y: evt.y }, evt);
			target._touch = false;
		});
		
		el.addEventListener('mousemove', (evt) => {
			target.onMouseMove({ x: evt.x, y: evt.y }, evt);
			if (target._touch) {
				target.onDrag({ x: evt.x, y: evt.y }, 
					evt.movementX, evt.movementY, evt);
			}
		});
	}
}

module.exports = MouseEvent;