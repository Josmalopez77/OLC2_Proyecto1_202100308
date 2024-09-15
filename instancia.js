import { Struct } from './struct.js';
import { SemanticError } from "./transfer.js";
import { errores } from "./index.js";

export class Instancia  {


    constructor(struct){
        /**
         * @type {Struct}
         */
        this.struct = struct;

        this.properties = {};
        
    }


    set(nombre, valor, nodo) {

        if (!(nombre in this.struct.properties)) {
            let err = new SemanticError(nodo.location.start.line, nodo.location.start.column, `Propiedad no encontrada: ${nombre}`);
            errores.push(err);
        }
        this.struct.properties[nombre] = valor;
    }

    get(nombre,nodo) {
        if(this.struct.properties.hasOwnProperty(nombre)){
            return this.struct.properties[nombre];
        }

        let err = new SemanticError(nodo.location.start.line, nodo.location.start.column, `Propiedad no encontrada: ${nombre}`);
        errores.push(err);
    }
}