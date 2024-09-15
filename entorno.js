

export class Entorno {

    /**
        * @param {Entorno} padre
     */
    constructor(padre = undefined) {
        this.valores = {};
        this.padre = padre;
    }

    /**
     * @param {string} nombre
     * @param {object} valor
     */
    setVariable(nombre, valor) {
        if (this.valores[nombre] !== undefined) {
            throw new Error(`Variable ${nombre} ya definida`);
        }

        this.valores[nombre] = valor;
    }
    
    

    

    /**
     * @param {string} nombre
     */
    getVariable(nombre) {
        const valorActual = this.valores[nombre];
        /*if (nombre == "true") {
            return true;
        }
        if (nombre == "false") {
            return false;
        } */
        if (valorActual !== undefined) return valorActual;

        if (this.padre) {
            return this.padre.getVariable(nombre);
        }

        throw new Error(`Variable ${nombre} no definida`);
    }

    /**
   * @param {string} nombre
   * @param {Object} valor
   */
    assignVariable(nombre, valor) {
        const valorActual = this.valores[nombre];

    if (valorActual !== undefined) {
        valorActual.valor = valor;
        return;
    }

    if (this.padre) {
        this.padre.assignVariable(nombre, valor);
        return;
    }

    throw new Error(`Variable ${nombre} no definida`);
}
/**
     * @type {BaseVisitor['visitGet']}
     */
visitGet(node){
    const instan = node.objetivo.accept(this);

        if(!(instan.valor instanceof Instancia)){
            let err = new SemanticError(node.location.start.line,node.location.start.column,`La variable ${instan.valor} no es una instancia`);
            errores.push(err);
        }

        return instan.valor.get(node.propiedad,node);
}

}