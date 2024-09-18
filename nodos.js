/**
 * @typedef {Object} Location
 * @property {Object} start
 * @property {number} start.offset
 * @property {number} start.line
 * @property {number} start.column
 * @property {Object} end
 * @property {number} end.offset
 * @property {number} end.line
 * @property {number} end.column
*/
    

/**
 * @typedef {import('./visitor').BaseVisitor} BaseVisitor
 */

export class Expresion  {

    /**
    * @param {Object} options
    * @param {Location|null} options.location Ubicacion del nodo en el codigo fuente
    */
    constructor() {
        
        
        /**
         * Ubicacion del nodo en el codigo fuente
         * @type {Location|null}
        */
        this.location = null;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitExpresion(this);
    }
}
    
export class OperacionBinaria extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.izq Expresion izquierda de la operacion
 * @param {Expresion} options.der Expresion derecha de la operacion
 * @param {string} options.op Operador de la operacion
    */
    constructor({ izq, der, op }) {
        super();
        
        /**
         * Expresion izquierda de la operacion
         * @type {Expresion}
        */
        this.izq = izq;


        /**
         * Expresion derecha de la operacion
         * @type {Expresion}
        */
        this.der = der;


        /**
         * Operador de la operacion
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitOperacionBinaria(this);
    }
}
    
export class OperacionUnaria extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion de la operacion
 * @param {string} options.op Operador de la operacion
    */
    constructor({ exp, op }) {
        super();
        
        /**
         * Expresion de la operacion
         * @type {Expresion}
        */
        this.exp = exp;


        /**
         * Operador de la operacion
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitOperacionUnaria(this);
    }
}
    
export class Agrupacion extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion agrupada
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion agrupada
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAgrupacion(this);
    }
}
    
export class Numero extends Expresion {

    /**
    * @param {Object} options
    * @param {number} options.valor Valor del numero
    */
    constructor({ valor }) {
        super();
        
        /**
         * Valor del numero
         * @type {number}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitNumero(this);
    }
}

export class String extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.valor Valor del numero
    */
    constructor({ valor }) {
        super();
        
        /**
         * Valor del numero
         * @type {string}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitString(this);
    }
}

export class Boolean extends Expresion {

    /**
    * @param {Object} options
    * @param {boolean} options.valor Valor del numero
    */
    constructor({ valor }) {
        super();
        
        /**
         * Valor del numero
         * @type {boolean}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBoolean(this);
    }
}
export class Char extends Expresion {

    /**
    * @param {Object} options
    * @param {Char} options.valor Valor del numero
    */
    constructor({ valor }) {
        super();
        
        /**
         * Valor del numero
         * @type {Char}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitChar(this);
    }
}

export class Float extends Expresion {

    /**
    * @param {Object} options
    * @param {Float} options.valor Valor del numero
    */
    constructor({ valor }) {
        super();
        
        /**
         * Valor del numero
         * @type {Float}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitNumero(this);
    }
}
    
export class DeclaracionVariable extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
 * @param {Expresion} options.exp Expresion de la variable
 * @param {string} options.tipo Tipo de la variable
    */
    constructor({ id, exp, tipo }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;


        /**
         * Expresion de la variable
         * @type {Expresion}
        */
        this.exp = exp;

        /**
         * Expresion de la variable
         * @type {string}
        */
        this.tipo = tipo;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionVariable(this);
    }
}
    
export class ReferenciaVariable extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
    */
    constructor({ id }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitReferenciaVariable(this);
    }
}
    
export class Print extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion[]} options.outputs Expresion a imprimir
    */
    constructor({ outputs }) {
        super();
        
        /**
         * Expresion a imprimir
         * @type {Expresion[]}
        */
        this.outputs = outputs;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitPrint(this);
    }
}
    
export class ExpresionStmt extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a evaluar
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a evaluar
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitExpresionStmt(this);
    }
}
    
export class Asignacion extends Expresion {

    /**
 *     * @param {Object} options
    * @param {string} options.id Identificador de la variable
 * @param {Expresion} options.exp Expresion de la variable
 * @param {string} options.tipo Tipo de la variable
    */
    constructor({ id, asgn, tipo }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;


        /**
         * Expresion a asignar
         * @type {Expresion}
        */
        this.asgn = asgn;

        /**
         * Identificador de la variable
         * @type {string}
        */
        this.tipo = tipo;


    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAsignacion(this);
    }
}
    
export class Bloque extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion[]} options.dcls Sentencias del bloque
    */
    constructor({ dcls }) {
        super();
        
        /**
         * Sentencias del bloque
         * @type {Expresion[]}
        */
        this.dcls = dcls;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBloque(this);
    }
}
    
export class If extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.cond Condicion del if
 * @param {Expresion} options.stmtTrue Cuerpo del if
 * @param {Expresion|undefined} options.stmtFalse Cuerpo del else
    */
    constructor({ cond, stmtTrue, stmtFalse }) {
        super();
        
        /**
         * Condicion del if
         * @type {Expresion}
        */
        this.cond = cond;


        /**
         * Cuerpo del if
         * @type {Expresion}
        */
        this.stmtTrue = stmtTrue;


        /**
         * Cuerpo del else
         * @type {Expresion|undefined}
        */
        this.stmtFalse = stmtFalse;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitIf(this);
    }
}
    
export class While extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.cond Condicion del while
 * @param {Expresion} options.stmt Cuerpo del while
    */
    constructor({ cond, stmt }) {
        super();
        
        /**
         * Condicion del while
         * @type {Expresion}
        */
        this.cond = cond;


        /**
         * Cuerpo del while
         * @type {Expresion}
        */
        this.stmt = stmt;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitWhile(this);
    }
}
    
export class For extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.init Inicializacion del for
 * @param {Expresion} options.cond Condicion del for
 * @param {Expresion} options.inc Incremento del for
 * @param {Expresion} options.stmt Cuerpo del for
    */
    constructor({ init, cond, inc, stmt }) {
        super();
        
        /**
         * Inicializacion del for
         * @type {Expresion}
        */
        this.init = init;


        /**
         * Condicion del for
         * @type {Expresion}
        */
        this.cond = cond;


        /**
         * Incremento del for
         * @type {Expresion}
        */
        this.inc = inc;


        /**
         * Cuerpo del for
         * @type {Expresion}
        */
        this.stmt = stmt;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFor(this);
    }
}

export class Switch extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a evaluar
 * @param {Expresion []} options.cases Casos del switch
 * @param {Expresion[]|undefined} options.defa Caso por defecto
    */
    constructor({ exp, cases, defa }) {
        super();
        
        /**
         * Expresion a evaluar
         * @type {Expresion}
        */
        this.exp = exp;


        /**
         * Casos del switch
         * @type {Expresion []}
        */
        this.cases = cases;


        /**
         * Caso por defecto
         * @type {Expresion[]|undefined}
        */
        this.defa = defa;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitSwitch(this);
    }
}

export class Foreach extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo de la lista
 * @param {string} options.id Identificador de la lista
 * @param {string} options.id2 Identificador de la variable
 * @param {Expresion} options.stmt Sentencia del foreach
    */
    constructor({ tipo, id, id2, stmt }) {
        super();
        
        /**
         * Tipo de la lista
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Identificador de la lista
         * @type {string}
        */
        this.id = id;


        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id2 = id2;


        /**
         * Sentencia del foreach
         * @type {Expresion}
        */
        this.stmt = stmt;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitForeach(this);
    }
}
    
export class Break extends Expresion {

    /**
    * @param {Object} options
    * 
    */
    constructor() {
        super();
        
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBreak(this);
    }
}
    
export class Continue extends Expresion {

    /**
    * @param {Object} options
    * 
    */
    constructor() {
        super();
        
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitContinue(this);
    }
}
    
export class Ternario extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.condi Condicion del ternario
 * @param {Expresion} options.exp1 Expresion verdadera
 * @param {Expresion} options.exp2 Expresion falsa
    */
    constructor({ condi, exp1, exp2 }) {
        super();
        
        /**
         * Condicion del ternario
         * @type {Expresion}
        */
        this.condi = condi;


        /**
         * Expresion verdadera
         * @type {Expresion}
        */
        this.exp1 = exp1;


        /**
         * Expresion falsa
         * @type {Expresion}
        */
        this.exp2 = exp2;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitTernario(this);
    }
}

export class Return extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion|undefined} options.exp Expresion a retornar
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a retornar
         * @type {Expresion|undefined}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitReturn(this);
    }
}
    
export class Llamada extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.callee Expresion a llamar
 * @param {Expresion[]} options.args Argumentos de la llamada
    */
    constructor({ callee, args }) {
        super();
        
        /**
         * Expresion a llamar
         * @type {Expresion}
        */
        this.callee = callee;


        /**
         * Argumentos de la llamada
         * @type {Expresion[]}
        */
        this.args = args;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitLlamada(this);
    }
}

export class DeclaracionFuncion extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la funcion
 * @param {string[]} options.params Parametros de la funcion
 * @param {Bloque} options.bloque Cuerpo de la funcion
 * @param {string} options.tipo Tipo de la funcion
    */
    constructor({ id, params, bloque, tipo }) {
        super();
        
        /**
         * Identificador de la funcion
         * @type {string}
        */
        this.id = id;


        /**
         * Parametros de la funcion
         * @type {string[]}
        */
        this.params = params;


        /**
         * Cuerpo de la funcion
         * @type {Bloque}
        */
        this.bloque = bloque;

        /**
         * Tipo de la funcion
         * @type {string}
        */
        this.tipo = tipo;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFuncDeclaracionFuncion(this);
    }
}
    
export class DeclaracionClase extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la clase
 * @param {Expresion} options.dcls Declaraciones de la clase
    */
    constructor({ id, dcls }) {
        super();
        
        /**
         * Identificador de la clase
         * @type {string}
        */
        this.id = id;


        /**
         * Declaraciones de la clase
         * @type {Expresion}
        */
        this.dcls = dcls;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionClase(this);
    }
}

export class Struct extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Identificador del struct
 * @param {Expresion[]} options.atrib Atributos del struct
    */
    constructor({ tipo, atrib }) {
        super();
        
        /**
         * Identificador del struct
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Atributos del struct
         * @type {Expresion[]}
        */
        this.atrib = atrib;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitStruct(this);
    }
}
    
export class Instancia extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Identificador de la clase
    * @param {string} options.id Identificador de la clase
 * @param {Expresion} options.instancia Argumentos de la instancia
    */
    constructor({ tipo, id, instancia }) {
        super();
        
        /**
         * Identificador de la clase
         * @type {string}
        */
        this.tipo = tipo;

        /**
         * Identificador de la clase
         * @type {string}
        */
        this.id = id;


        /**
         * Argumentos de la instancia
         * @type {Expresion}
        */
        this.instancia = instancia;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitInstancia(this);
    }
}
    
export class Get extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.objetivo Objeto de la propiedad
 * @param {string} options.propiedad Identificador de la propiedad
    */
    constructor({ objetivo, propiedad }) {
        super();
        
        /**
         * Objeto de la propiedad
         * @type {Expresion}
        */
        this.objetivo = objetivo;


        /**
         * Identificador de la propiedad
         * @type {string}
        */
        this.propiedad = propiedad;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitGet(this);
    }
}
    
export class Set extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.objetivo Objeto de la propiedad
 * @param {string} options.propiedad Identificador de la propiedad
 * @param {Expresion} options.valor Valor de la propiedad
    */
    constructor({ objetivo, propiedad, valor }) {
        super();
        
        /**
         * Objeto de la propiedad
         * @type {Expresion}
        */
        this.objetivo = objetivo;


        /**
         * Identificador de la propiedad
         * @type {string}
        */
        this.propiedad = propiedad;


        /**
         * Valor de la propiedad
         * @type {Expresion}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitSet(this);
    }
}

    
export default { Expresion, OperacionBinaria, OperacionUnaria, Agrupacion, Numero, Char,Float, String, Boolean, DeclaracionVariable, ReferenciaVariable, Print, ExpresionStmt, Asignacion, Bloque, If, While, For, Switch, Break, Continue, Return, Llamada,  DeclaracionFuncion, DeclaracionClase, Instancia, Get, Set, Foreach };
