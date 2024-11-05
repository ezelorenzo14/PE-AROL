//let nombredeusuario = prompt("Ingresar nombre de usuario")
//if (nombredeusuario == "") {
//    console.log("no ingrsaste el nombre de usuario")
//}
//else {
//    console.log("nombre de usuario ingrsado " + nombredeusuario)
//}

//let ingresarnumero = parseInt(prompt("ingrsar numero"));

//for (let i = 1; i <= 10; i++) {
   // let resultado = ingresarnumero * i;
    //console.log(ingresarnumero + " X "+ i +" = "+ resultado);
//}


const preguntastotales = 3;

const preguntas = [
    "¿En qué año se fundó el Club Atlético Peñarol?",
    "¿Cuál es el apodo de Peñarol?",
    "¿Cuál es el máximo rival de Peñarol?",
];

const respuestasCorrectas = [
    "1891",
    "manyas",
    "nacional",
];

let aciertos = 0;

for (let i = 0; i < preguntastotales; i++) {

    let respuestaUsuario = prompt(preguntas[i]);
    if (respuestaUsuario) {
        respuestaUsuario = respuestaUsuario.toLowerCase();
    }
    if (respuestaUsuario === respuestasCorrectas[i]) {
        console.log("¡Correcto!");
        aciertos++;
    } else {
        console.log("Incorrecto. La respuesta correcta es: " + respuestasCorrectas[i]);
    }
}

let puntajeFinal = (aciertos / preguntastotales) * 10;

console.log("Has terminado el cuestionario.");
console.log("Aciertos: " + aciertos + " de " + preguntastotales);
console.log("Tu puntaje final es: " + puntajeFinal.toFixed(1));

//No se que hago mal que me saltea la segunda pregunta, intenté arreglarlo con chatgpt y supuestamente me lo arregló pero sigue salteandola, para peor no veo donde le estoy errando, pero bueno es la primera preentrega