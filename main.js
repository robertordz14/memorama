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
let numeroPares=null;

//Apuntar a html
let mostrarMovimientos = document.getElementById('movimientos')
let mostratAciertos = document.getElementById('aciertos')
let mostratTiempo = document.getElementById('tiempoRestante')
let aciertoFinalV = document.getElementById('aciertosDosV')
let aciertoFinalR = document.getElementById('aciertosDosR')
let aciertoFinalA = document.getElementById('aciertosDosA')

//Generacion de numeros aleatorios
//Array de pares uno y dos
let parUno = [];
let parDos = [];
//array final
let numeros = [];
//ciclo que se repite 7 veces para la generacion de pares
for (var i = 0; i < 8; i++) {
    i = i++;
    //genero un numero random entre 0 a 32
    var x = Math.floor(Math.random()*(0-32+1)+32);
    //si el numero random es diferente al anterior se agrega al array si no, se elimina la vuelta
    if(parDos.indexOf(x)!=-1){i--;continue;}else{parDos.push(x)}
    console.log(`Dos: `+parDos);
  }
  //Al otro array se le asigna el valor del array anterior desordenado
  parUno = parDos.sort(()=>{return Math.random()-0.5});
  console.log(`Uno: `+parUno);
  //al array final le concateno los dos arrays para hacer solo uno
  numeros = parDos.concat(parUno);
  //mezclo los numeros del array final nuevamente
  numeros = numeros.sort(()=>{return Math.random()-0.5});
  console.log(`FINAL `+numeros);


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
        tarjetaBloqueada.innerHTML =  `<img src="./images/${numeros[i]}.jpg" alt="">`;
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
    tarjeta1.innerHTML = `<img src="./images/${primerResultado}.jpg" alt="">`;

    //deshabilitar boton seleccionado
    tarjeta1.disabled = true;
    } else if (tarjetasDestapadas==2){
        //mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML =  `<img src="./images/${segundoResultado}.jpg" alt="">`;
        //deshabilita segundo boton
        tarjeta2.disabled = true;

        //se incrementan los movimientos
        movimientos++;
        mostrarMovimientos.innerHTML= `Movimientos: ${movimientos}`

        if(primerResultado == segundoResultado){
            tarjetasDestapadas=0;
            aciertos++; 
            mostratAciertos.innerHTML=`Aciertos: ${aciertos}`
            aciertoFinalV.style.background='#00ff15'
            aciertoFinalR.style.background='#FF000056'
            aciertoFinalA.style.background='#FF830056'
            if(aciertos == 8){
                clearInterval(tiempoRegresivo)
                mostratAciertos.innerHTML = `Aciertos: ${aciertos} 👍`
                mostratTiempo.innerHTML= `¡Genial! Tardaste ${timerInicial-timer} segundos`
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
                aciertoFinalV.style.background='#00ff1520'
                aciertoFinalR.style.background='#FF0000'
                aciertoFinalA.style.background='#FF830056'
            },1000);
        }
    }
}