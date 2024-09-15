{
  const crearNodo = (tipoNodo, props) => {
  const tipos = {
    'float': nodos.Float,
    'int': nodos.Int,
    'numero': nodos.Numero,
    'char': nodos.Char, 
    'string': nodos.String,
    'boolean': nodos.Boolean,
    'agrupacion': nodos.Agrupacion,
    'binaria': nodos.OperacionBinaria,
    'unaria': nodos.OperacionUnaria,
    'declaracionVariable': nodos.DeclaracionVariable,
    'referenciaVariable': nodos.ReferenciaVariable,
    'print': nodos.Print,
    'expresionStmt': nodos.ExpresionStmt,
    'asignacion': nodos.Asignacion,
    'bloque': nodos.Bloque,
    'if': nodos.If,
    'while': nodos.While,
    'for': nodos.For,
    'break': nodos.Break,
    'continue': nodos.Continue,
    'return': nodos.Return,
    'llamada': nodos.Llamada,
    'get': nodos.Get
  };

  // Verificar si el tipo de nodo está definido
  if (!tipos[tipoNodo]) {
    throw new Error(`Tipo de nodo no encontrado: ${tipoNodo}`);
  }

  const nodo = new tipos[tipoNodo](props);
  nodo.location = location();
  return nodo;
};
}

programa = _ dcl:Declaracion* _ { return dcl }

Declaracion = dcl:tipoVar _ { console.log("DECLARANDO"); return dcl }
            / stmt:Stmt _ { return stmt }


tipoVar =  tipoString2  / tipoChar2 / tipoBoolean2 /tipoInt2/tipoFloat2 /tipoInt / tipoFloat /  tipoString  / tipoChar/ tipoBoolean /   "var" _ id:Identificador _ "=" _ exp:Expresion _ ";" { return crearNodo('declaracionVariable', { id, exp }) }
tipoFloat = "float" _ id:Identificador _ "=" _ exp:Expresion _ ";"  {  return crearNodo('declaracionVariable', { id, exp, tipo: "float" });  }
tipoInt = "int" _ id:Identificador _ "=" _ exp:Expresion _ ";"  { return crearNodo('declaracionVariable', { id, exp,tipo:"int" }) }
tipoString = "string" _ id:Identificador _ "=" _ exp:Expresion _ ";" { return crearNodo('declaracionVariable', { id, exp,tipo:"string" }) }
tipoBoolean = "boolean" _ id:Identificador _ "=" _ exp:Expresion _ ";" { return crearNodo('declaracionVariable', { id, exp,tipo:"boolean" }) }
tipoChar = "char" _ id:Identificador _ "=" _ exp:Expresion _ ";"{ return crearNodo('declaracionVariable', { id, exp, tipo:"string" }) }

tipoFloat2 = "float" _ id:Identificador _  ";"  {  return crearNodo('declaracionVariable', { id, exp:0.00, tipo: "float" });  }
tipoInt2 = "int" _ id:Identificador _  ";"  { return crearNodo('declaracionVariable', { id, exp:0,tipo:"int" }) }
tipoString2 = "string" _ id:Identificador _ ";" { return crearNodo('declaracionVariable', { id, exp:"",tipo:"string" }) }
tipoBoolean2 = "boolean" _ id:Identificador _  ";" { return crearNodo('declaracionVariable', { id, exp:true,tipo:"boolean" }) }
tipoChar2 = "char" _ id:Identificador _ ";"{ return crearNodo('declaracionVariable', { id, exp:'', tipo:"string" }) }

Stmt = "System.out.println(" _ exp:Expresion _ ")" _ ";" { return crearNodo('print', { exp }) }
    / "{" _ dcls:Declaracion* _ "}" { return crearNodo('bloque', { dcls }) }
    / "if" _ "(" _ cond:Expresion _ ")" _ stmtTrue:Stmt 
      stmtFalse:(
        _ "else" _ stmtFalse:Stmt { return stmtFalse } 
      )? { return crearNodo('if', { cond, stmtTrue, stmtFalse }) }
    / "while" _ "(" _ cond:Expresion _ ")" _ stmt:Stmt { return crearNodo('while', { cond, stmt }) }
    / "for" _ "(" _ init:ForInit _ cond:Expresion _ ";" _ inc:Expresion _ ")" _ stmt:Stmt {
      return crearNodo('for', { init, cond, inc, stmt })
    }
    / "break" _ ";" { return crearNodo('break') }
    / "continue" _ ";" { return crearNodo('continue') }
    / "return" _ exp:Expresion? _ ";" { return crearNodo('return', { exp }) }
    / exp:Expresion _ ";" { return crearNodo('expresionStmt', { exp }) }

ForInit = dcl:tipoVar { return dcl }
        / exp:Expresion _ ";" { return exp }
        / ";" { return null }

Identificador = [a-zA-Z][a-zA-Z0-9]* { return text() }


Expresion =  Asignacion  

Asignacion = asignado:Llamada _ "=" _ asgn:Asignacion {
                  return crearNodo('asignacion', { id: asignado.id, asgn })
                } / Logicas

Igulacion = izq:Comparacion expansion:(
  _ op:("==" / "!=") _ der:Comparacion { return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (operacionAnterior, operacionActual) => {
      const { tipo, der } = operacionActual
      return crearNodo('binaria', { op: tipo, izq: operacionAnterior, der })
    },
    izq
  )
}

Comparacion = izq:Suma expansion:(
  _ op:("<=" /  ">=" / "<" / ">" ) _ der:Suma { return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (operacionAnterior, operacionActual) => {
      const { tipo, der } = operacionActual
      return crearNodo('binaria', { op:tipo, izq: operacionAnterior, der })
    },
    izq
  )
}

Suma = izq:Multiplicacion expansion:(
  _ op:("+" / "-") _ der:Multiplicacion { return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (operacionAnterior, operacionActual) => {
      const { tipo, der } = operacionActual;
      return crearNodo('binaria', { op: tipo, izq: operacionAnterior, der });
    },
    izq
  );
}

Multiplicacion = izq:Unaria expansion:(
  _ op:("*" / "/" / "%") _ der:Unaria { return { tipo: op, der } }
)* {
    return expansion.reduce(
      (operacionAnterior, operacionActual) => {
        const { tipo, der } = operacionActual;
        return crearNodo('binaria', { op: tipo, izq: operacionAnterior, der });
      },
      izq
    );
}

// Operaciones Unarias
Unaria = "-" _ num:Unaria { return crearNodo('unaria', { op: '-', exp: num }); }
        / "!" _ num:Unaria { return crearNodo('unaria', { op: '!', exp: num }); }
       / Llamada
tipos2 = Float / Int / Boolean / Char / Cadena
Logicas = izq:Igulacion expresion:(
              _ op:("&&" / "||") _ der:Igulacion { return { tipo: op, der } }
            )* {
              return expresion.reduce(
                (operacionAnterior, operacionActual) => {
                  const { tipo, der } = operacionActual
                  return crearNodo('binaria', { op: tipo, izq: operacionAnterior, der })
                },
                izq
              )
            }

// Llamada de Función
Llamada = call:tipos2 params:(
    ("(" _ args:Argumentos? _ ")" { return {args, tipo: 'llamada' } })
    / ("." _ id:Identificador _ { return { id, tipo: 'get' } })
  )* 
  {
  const op =  params.reduce(
    (objetivo, args) => {
      const { tipo, id, args:argumentos } = args

      if (tipo === 'llamada') {
        return crearNodo('llamada', { callee: objetivo, args: argumentos || [] })
      }else if (tipo === 'get') {
        return crearNodo('get', { objetivo, propiedad: id })
      }
    },
    call
  )

return op
}

// Argumentos para la llamada de función
Argumentos = arg:Expresion _ args:("," _ exp:Expresion { return exp })* { return [arg, ...args] }

Cadena = '"' texto:[^"]* '"' { return crearNodo('string', { valor: texto.join('') }) }
/ "(" _ exp:Expresion _ ")" { return crearNodo('agrupacion', { exp }) }
  / id:Identificador { return crearNodo('referenciaVariable', { id }) }

Char = "'" texto:[^']* "'" { return crearNodo('char', { valor: texto.join('') }) }
  / "(" _ exp:Expresion _ ")" { return crearNodo('agrupacion', { exp }) }
  / id:Identificador { return crearNodo('referenciaVariable', { id }) }

Float = [0-9]+( "." [0-9]+ ) {return crearNodo('float', { valor: parseFloat(text(), 10) })}
  / "(" _ exp:Expresion _ ")" { return crearNodo('agrupacion', { exp }) }
  / id:Identificador { return crearNodo('referenciaVariable', { id }) }

Int = [0-9]+ {return crearNodo('numero', { valor: parseInt(text(), 10) })}
  / "(" _ exp:Expresion _ ")" { return crearNodo('agrupacion', { exp }) }
  / id:Identificador { return crearNodo('referenciaVariable', { id }) }

Boolean = "true" { return crearNodo('boolean', { valor: true }) }
        / "false" { return crearNodo('boolean', { valor: false }) }
        / "(" _ exp:Expresion _ ")" { return crearNodo('agrupacion', { exp }) }
        / id:Identificador { return crearNodo('referenciaVariable', { id }) }


_ = ([ \t\n\r] / Comentarios)* 

Comentarios = "//" (![\n] .)*
            / "/*" (!("*/") .)* "*/"