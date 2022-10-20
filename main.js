//inicialización de las variables
let tarjetasDestapadas=0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado= null;
let movimientos = 0;
let aciertos = 0; 
let temporizador = false;
let timer = 60;
let timerInicial = 60;
let tiempoRegresivo=null;
//Apuntar a html
let mostrarMovimientos = document.getElementById('movimientos')
let mostratAciertos = document.getElementById('aciertos')
let mostratTiempo = document.getElementById('tiempoRestante')
//Generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

//funciones
function contarTiempo(){
    tiempoRegresivo = setInterval(()=>{
        timer--;
        mostratTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer==0){
            clearInterval(tiempoRegresivo);
            bloquearTarjetas();
        }
    }, 1000)
}

function bloquearTarjetas(){
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i)
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
    }
}

//Función principal id botones
function destapar(id){

    //temporizador
    if(temporizador==false){
        contarTiempo();
        temporizador=true;
    }
    //mostrar primer numero
    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);
    if(tarjetasDestapadas==1){
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = primerResultado;

    //deshabilitar boton seleccionado
    tarjeta1.disabled = true;
    } else if (tarjetasDestapadas==2){
        //mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;
        //deshabilita segundo boton
        tarjeta2.disabled = true;

        //se incrementan los movimientos
        movimientos++;
        mostrarMovimientos.innerHTML= `Movimientos: ${movimientos}`

        if(primerResultado == segundoResultado){
            tarjetasDestapadas=0;
            aciertos++; 
            mostratAciertos.innerHTML=`Aciertos: ${aciertos}`

            if(aciertos == 8){
                clearInterval(tiempoRegresivo)
                mostratAciertos.innerHTML = `Aciertos: ${aciertos} 👍`
                mostratTiempo.innerHTML= `¡Genial! Solo demoraste ${timerInicial-timer} segundos`
                mostrarMovimientos.innerHTML=  `Movimientos: ${movimientos} ✌` 
            }
        }else{
            //mostrar tarejtas erroneas por un lapso
            setTimeout(()=>{
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled=false;
                tarjeta2.disabled=false;
                tarjetasDestapadas=0;
            },1000);
        }
    }
}