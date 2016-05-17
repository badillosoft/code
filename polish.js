/**
 * 
 * Alan Badillo Salas
 * badillo.soft@hotmail.com
 * https://github.com/badillosoft/code
 * 
 * Create at: 16-05-2016
 * Version: 1.0.0
 * 
 * Convierte una expresión matemática en una pila polaca inversa.
 * 
 */

'use strict'

class Polish {
    static get new() {
        return new Polish(this);
    }
    
    static isNumber(value) {
        return value.match(/^\d/);
    }
    
    static number(value) {
        return value.split(/^(\d+)/);
    }
    
    static isOperator(value) {
        return value.match(/^[\+\-\*\/]/);
    }
    
    static operator(value) {
        return value.split(/^([\+\-\*\/])/);
    }
    
    static word(value) {
        return value.split(/^([A-Za-z]+)/);
    }
    
    constructor(options) {
        for (const k in options) {
            this[k] = options[k];
        }
        
        this.expr = this.expr || '';
    }
    
    parse(expr) {
        this.queue = [];
        this.operators = [];
        
        if (!this.silence) {
            console.log('Expr:', expr || this.expr);
        }
        
        this.expr = (expr || this.expr).replace(/\s+/ig, '');
        
        if (this.expr.match(/^\-/)) {
            this.expr = `0${this.expr}`;
        }
        
        var result, pos = 0;
        
        do {
            result = this.token(pos);
            
            if (result.token === 'number' || result.token === 'variable') {
                this.queue.push(result.value);
            }
            
            if (result.token === 'operator' || result.token === 'end') {
                if (result.value === '+' || result.value === '-'  || result.token === 'end') {
                    while (this.operators.length > 0) {
                        const op = this.operators.pop();
                        this.queue.push(op);
                    }
                }
                
                this.operators.push(result.value);
            }
            
            pos = result.pos;
            
            if (this.debug) {
                console.log('\tToken result:', result);
                console.log('\tQueue:', this.queue);
                console.log('\tOperator Queue:', this.operators);
            }
        } while(result.token !== 'end');
        
        if (!this.silence) {
            console.log('Polish:', this.queue.join(' '));
        }
    }
    
    token(i) {
        const aux = this.expr.slice(i);
        
        if (!aux) {
            return {
                token: 'end',
                value: '=',
                pos: i
            }
        }
        
        if (this.debug) {
            console.log('\tToken:', aux, 'pos:', i);
        }
        
        if (Polish.isNumber(aux)) {
            const r = Polish.number(aux);
            
            i += r[1].length;
            
            if (this.debug) {
                console.log('\tNumber:', r[1], 'pos:', i);
            }
            
            return {
                token: 'number',
                value: Number(r[1]),
                expr: r[2],
                pos: i
            };
        }
        
        if (Polish.isOperator(aux)) {
            const r = Polish.operator(aux);
            
            i += r[1].length;
            
            if (this.debug) {
                console.log('\tOperator:', r[1], 'pos:', i);
            }
            
            return {
                token: 'operator',
                value: r[1],
                expr: r[2],
                pos: i
            };
        }
        
        const r = Polish.word(aux);
        
        i += r[1].length;
            
        if (this.debug) {
            console.log('\tVariable:', r[1], 'pos:', i);
        }
        
        return {
            token: 'variable',
            value: r[1],
            expr: r[2],
            pos: i
        };
    }
    
    nextOperator() {
        for (var i = 0; i < this.queue.length; i++) {
            const value = this.queue[i];
            
            if (`${value}`.match(/^[\+\-\*\/]$/)) {
                return i;
            }
        }
        
        return -1;
    }
    
    eval(variables) {
        if (!this.silence) {
            console.log('--------------------------------------------');
        }
        
        variables = variables || {};
        
        var pos;
        
        do {
            pos = this.nextOperator();
            
            if (pos < 0) {
                break;
            }
            
            var a = this.queue[pos - 2];
            var b = this.queue[pos - 1];
            const op = this.queue[pos];
            
            if (a in variables) {
                a = variables[a]
            }
            
            if (b in variables) {
                b = variables[b]
            }
            
            const expr = `${a} ${op} ${b}`;
            const result = eval(expr);
            
            this.queue.splice(pos - 2, 3, result);
            
            if (this.debug) {
                console.log('\tEval:', expr, '=', result);
                console.log('\tQueue:', this.queue);
            }
            
        } while(pos >= 0);
        
        if (!this.silence) {
            console.log('Eval:', this.queue[0]);
            console.log('--------------------------------------------');
        }
        
        return this.queue[0];
    }
}

module.exports = Polish;