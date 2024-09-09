import * as monaco from 'https://cdn.jsdelivr.net/npm/monaco-editor@0.50.0/+esm'

import { parse } from './analizador.js'
import { InterpreterVisitor } from './interprete.js'


// const editor = document.getElementById('editor')
const btn = document.getElementById('btn')
const ast = document.getElementById('ast')
const salida = document.getElementById('salida')
const editor = document.getElementById('editor')

btn.addEventListener('click', () => {
    const codigoFuente = editor.value;
    try {


        const sentencias = parse(codigoFuente)
        // ast.innerHTML = JSON.stringify(sentencias, null, 2)

        const interprete = new InterpreterVisitor()

        // for (const sentencia of sentencias) {
        //     sentencia.accept(interprete)
        // }
        console.log({ sentencias })
        sentencias.forEach(sentencia => sentencia.accept(interprete))

        salida.value = interprete.salida

    } catch (error) {
        console.log(error)
        // console.log(JSON.stringify(error, null, 2))
        salida.value = error.message + ' at line ' + error.location.start.line + ' column ' + error.location.start.column
    }
})