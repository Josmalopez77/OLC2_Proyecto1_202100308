    import { Entorno } from "./entorno.js";
    import { BaseVisitor } from "./visitor.js";
    import nodos, { Expresion } from './nodos.js'
    import { BreakException, ContinueException, ReturnException } from "./transferencia.js";
    import { Invocable } from "./invocable.js";
    import { embebidas } from "./embebidas.js";
    import { FuncionForanea } from "./foreanea.js";
    import { Clase } from "./clase.js";
    import { Instancia } from "./instancia.js";


    export class InterpreterVisitor extends BaseVisitor {

        constructor() {
            super();
            this.entornoActual = new Entorno();

            // funciones embebidas
            Object.entries(embebidas).forEach(([nombre, funcion]) => {
                this.entornoActual.setVariable(nombre, funcion);
            });


            this.salida = '';

            /**
             * @type {Expresion | null}
            */
            this.prevContinue = null;
        }

        /**
        *@type {BaseVisitor['visitExpresion']} 
        */ 
        visitExpresion(node) {
            throw new Error('Metodo visitExpresion no implementado');
        }

        interpretar(nodo) {
            return nodo.accept(this);
        }

        /**
         * @type {BaseVisitor['visitOperacionBinaria']}
         */
        visitOperacionBinaria(node) {
            const izq = node.izq.accept(this);
            const der = node.der.accept(this);
            console.log(`Izquierda: ${izq}, Derecha: ${der}, Operador: ${node.op}`);

            switch (node.op) {
                case '+':
                    return izq + der;
                case '-':
                    return izq - der;
                case '*':
                    return izq * der;
                case '/':
                    return izq / der;
                case '%':
                    return izq % der;
                case '<=':
                    return izq <= der;
                case '==':
                    return izq === der;
                case '!=':
                    return izq !== der;
                case '>=':
                    return izq >= der;
                case '>':
                    return izq > der;
                case '<':
                    return izq < der;
                case '&&':
                    return izq && der;
                case '||':
                    return izq || der;
                default:
                    throw new Error(`Operador no soportado: ${node.op}`);
            }
        }

        /**
         * @type {BaseVisitor['visitOperacionUnaria']}
         */
        visitOperacionUnaria(node) {
            const exp = node.exp.accept(this);

            switch (node.op) {
                case '-':
                    return -exp;
                case '!':
                    return !exp;
                default:
                    throw new Error(`Operador no soportado: ${node.op}`);
            }
        }

        /**
         * @type {BaseVisitor['visitAgrupacion']}
         */
        visitAgrupacion(node) {
            return node.exp.accept(this);
        }

        /**
         * @type {BaseVisitor['visitNumero']}
         */
        visitNumero(node) {
            return node.valor;
        }

        /**
         * @type {BaseVisitor['visitString']}
         */
        visitString(node) {
            return node.valor;
        }

        /**
         * @type {BaseVisitor['visitBoolean']}
         */
        visitBoolean(node) {
            return node.valor;
        }

        /**
         * @type {BaseVisitor['visitChar']}
         */
        visitChar(node) {
            return node.valor;
        }

        /**
         * @type {BaseVisitor['visitFloat']}
         */
        visitFloat(node) {
            return node.valor;
        }


        /**
         * @type {BaseVisitor['visitDeclaracionVariable']}
         */
        visitDeclaracionVariable(node) {
            const nombreVariable = node.id;
            const tipoVariable = node.tipo;

            if (node.exp && typeof node.exp.accept === 'function') {
                const valorVariable = node.exp.accept(this);
                console.log(`Declarando variable ${nombreVariable} de tipo ${tipoVariable} con valor ${valorVariable}`);
                this.entornoActual.setVariable(nombreVariable, { valor: valorVariable, tipo: tipoVariable });
                return;
            } 
            const valorVariable = node.exp;
            console.log(`Declarando variable ${nombreVariable} de tipo ${tipoVariable} con valor ${valorVariable}`);

        this.entornoActual.setVariable(nombreVariable, { valor: valorVariable, tipo: tipoVariable });
    
    }


        /**
         * @type {BaseVisitor['visitReferenciaVariable']}
         */
        visitReferenciaVariable(node) {
            const nombreVariable = node.id;
            console.log(`Referenciando variable ${nombreVariable}`);
            if (nombreVariable === "true") {
                return true;
            }
            if (nombreVariable === "false") {
                return false;
            }
            const variable = this.entornoActual.getVariable(nombreVariable);
            return variable.valor;
        }


        /**
         * @type {BaseVisitor['visitPrint']}
         */
        visitPrint(node) {
            /* const valor = node.exp.accept(this);
            this.salida += valor + '\n'; */

            const output = node.outputs.map(exp => {
                const valor = exp.accept(this);
                    if(valor != null){
                        return valor;
                    }
                    return "null";
                });
                this.salida += output.join(' ') + '\n';
        }


        /**
         * @type {BaseVisitor['visitExpresionStmt']}
         */
        visitExpresionStmt(node) {
            node.exp.accept(this);
        }

        /**
         * @type {BaseVisitor['visitAsignacion']}
         */
        visitAsignacion(node) {
            const valor = node.asgn.accept(this);
            let tipoVariable = typeof valor;

            if(tipoVariable === "number") {
                if(Number.isInteger(valor)) {
                    tipoVariable = "int";
                }else {
                    tipoVariable = "float";
                }
            }
        
            
        console.log(`Tipo del valor a asignar: ${tipoVariable}`);

        const variable = this.entornoActual.getVariable(node.id);
        console.log(`Tipo esperado de la variable: ${variable.tipo}`);

        if (variable.tipo != tipoVariable) {
            throw new Error(`Tipo de valor incorrecto para la variable ${node.id}. Esperado ${variable.tipo}, recibido ${valor.tipo}.`);
        }

        this.entornoActual.assignVariable(node.id, valor);

        return valor;
        }

        /**
         * @type {BaseVisitor['visitBloque']}
         */
        visitBloque(node) {

            const entornoAnterior = this.entornoActual;
            this.entornoActual = new Entorno(entornoAnterior);

            node.dcls.forEach(dcl => dcl.accept(this));

            this.entornoActual = entornoAnterior;
        }

        /**
         * @type {BaseVisitor['visitIf']}
         */
        visitIf(node) {
            const cond = node.cond.accept(this);

            if (cond) {
                node.stmtTrue.accept(this);
                return;
            }

            if (node.stmtFalse) {
                node.stmtFalse.accept(this);
            }

        }

        /**
         * @type {BaseVisitor['visitWhile']}
         */
        visitWhile(node) {
            const entornoConElQueEmpezo = this.entornoActual;

            try {
                while (node.cond.accept(this)) {
                    node.stmt.accept(this);
                }
            } catch (error) {
                this.entornoActual = entornoConElQueEmpezo;

                if (error instanceof BreakException) {
                    console.log('break');
                    return
                }

                if (error instanceof ContinueException) {
                    return this.visitWhile(node);
                }

                throw error;

            }
        }

        /**
         * @type {BaseVisitor['visitFor']}
         */
        visitFor(node) {
            // this.prevContinue = node.inc;
            const incrementoAnterior = this.prevContinue;
            this.prevContinue = node.inc;

            const forTraducido = new nodos.Bloque({
                dcls: [
                    node.init,
                    new nodos.While({
                        cond: node.cond,
                        stmt: new nodos.Bloque({
                            dcls: [
                                node.stmt,
                                node.inc
                            ]
                        })
                    })
                ]
            })

            forTraducido.accept(this);

            this.prevContinue = incrementoAnterior;
        }

        /**
         * @type {BaseVisitor['visitSwitch']}
         */
        visitSwitch(node) {
            const condition = node.exp.accept(this);
            let flag = false;
            const entornoAnterior = this.entornoActual;
        
            try {
                node.cases.forEach(caso => {
                    this.entornoActual = new Entorno(entornoAnterior);
        
                    if (condition == caso.exp.accept(this) || flag) {
                        flag = true;
        
                        caso.stmt.forEach(stmt => {
                            try {
                                stmt.accept(this);
                            } catch (e) {
                                if (e instanceof BreakException) {
                                    throw e; // Salir del switch
                                } else {
                                    throw e; // Propagar cualquier otra excepción
                                }
                            }
                        });
                    }
        
                    this.entornoActual = entornoAnterior;
                });
        
                if (node.defa && !flag) {
                    node.defa.forEach(sentencia => sentencia.accept(this));
                }
        
            } catch (e) {
                this.entornoActual = entornoAnterior;
                if (e instanceof BreakException) {
                    return; // Manejo de la salida del switch por un break
                }
                throw e; // Propagar cualquier otra excepción no manejada
            }
        }
        

        /**
         * @type {BaseVisitor['visitForeach']}
         */
        visitForeach(node) {

            
        }


        /**
         * @type {BaseVisitor['visitBreak']}
         */
        visitBreak(node) {
            throw new BreakException();
        }

        /**
         * @type {BaseVisitor['visitContinue']}
         */
        visitContinue(node) {

            if (this.prevContinue) {
                this.prevContinue.accept(this);
            }

            throw new ContinueException();
        }

        /**
         * @type {BaseVisitor['visitReturn']}
         */
        visitReturn(node) {
            let valor = null
            if (node.exp) {
                valor = node.exp.accept(this);
            }
            throw new ReturnException(valor);
        }

        /**
        * @type {BaseVisitor['visitLlamada']}
        */
        visitLlamada(node) {
            const funcion = node.callee.accept(this);

            const argumentos = node.args.map(arg => arg.accept(this));

            if (!(funcion instanceof Invocable)) {
                throw new Error('No es invocable');
                // 1() "sdalsk"()
            }

            if (funcion.aridad() !== argumentos.length) {
                throw new Error('Aridad incorrecta');
            }

            return funcion.invocar(this, argumentos);
        }

        /**
    * @type {BaseVisitor['visitFuncDeclaracionFuncion']}
    */
    visitFuncDeclaracionFuncion(node) {
        const funcion = new FuncionForanea(node, this.entornoActual);
        console.log("DECLARANDO FUNCION", node.id);
        console.log("DE TIPO", node.tipo);
        console.log("ACCION",  funcion);
        this.entornoActual.setVariable(node.id, {valor: funcion, tipo: node.tipo});
    }


    /**
    * @type {BaseVisitor['visitDeclaracionClase']}
    */
    visitDeclaracionClase(node) {

        const metodos = {}
        const propiedades = {}

        node.dcls.forEach(dcl => {
            if (dcl instanceof nodos.DeclaracionClase) {
                metodos[dcl.id] = new FuncionForanea(dcl, this.entornoActual);
            } else if (dcl instanceof nodos.DeclaracionVariable) {
                propiedades[dcl.id] = dcl.exp
            }
        });

        const clase = new Clase(node.id, propiedades, metodos);

        this.entornoActual.setVariable(node.id, { valor: clase, tipo: 'clase' });

    }

    /**
    * @type {BaseVisitor['visitInstancia']}
    */
    visitInstancia(node) {

        const clase = this.entornoActual.get(node.id);

        const argumentos = node.args.map(arg => arg.accept(this));


        if (!(clase instanceof Clase)) {
            throw new Error('No es posible instanciar algo que no es una clase');
        }



        return clase.invocar(this, argumentos);
    }


    /**
    * @type {BaseVisitor['visitGet']}
    */
    visitGet(node) {

        // var a = new Clase();
        // a.propiedad
        const instancia = node.objetivo.accept(this);

        if (!(instancia instanceof Instancia)) {
            console.log(instancia);
            throw new Error('No es posible obtener una propiedad de algo que no es una instancia');
        }

        return instancia.get(node.propiedad);
    }

    /**
    * @type {BaseVisitor['visitSet']}
    */
    visitSet(node) {
        const instancia = node.objetivo.accept(this);

        if (!(instancia instanceof Instancia)) {
            throw new Error('No es posible asignar una propiedad de algo que no es una instancia');
        }

        const valor = node.valor.accept(this);

        instancia.set(node.propiedad, valor);

        return valor;
    }
        

    }