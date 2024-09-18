import { Invocar } from "./invocar.js";
import { Instancia } from "./instancia.js";

export class Struct extends Invocar {

    constructor(nombre,properties){
        super();
        /**
         * @type {string}
         */
        this.nombre = nombre;

        /**
        * @type {Object.<string, Expresion>}        
        */
        this.properties = properties;


    }


    aridad() {
        return Object.keys(this.properties).length;
    }

    /**
    * @type {Invocar['invocar']}
    */
    invocar(interprete, args) {
        const instanciaNueva = new Instancia(this);

        Object.entries(this.properties).forEach(([nombre, valor]) => {
            instanciaNueva.set(nombre, valor);
        });

        return instanciaNueva;

    }
}