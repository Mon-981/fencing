
/*
Función para cambiar los nombres de los participantes
Se solicita un nuevo nombre, debe contener al menos una letra, y no ser nulo
( esto sucede al presionar cancel en el prompt)
 Si no se cumplen estas condiciones los nombres quedan por defecto
*/
function changeNames(element){
    let newName = prompt('Your name');
    let regex = /^[a-zA-Z]+$/
    const id = element.id;
    if (newName!= null && regex.test(newName)){
        document.getElementById(id).textContent = newName;
    }else{
        alert('Name field can only contain letters');
        let id = element.id;
        id === 'pa-name' ? document.getElementById(id).textContent = 'Player A' : document.getElementById(id).textContent = 'Player B';        
    }
}
/*
 Función para sumar puntos
 */
function add(btn){
    const id = btn.id;     
    if (id === 'pa-plus'){
        let A_SCORE = document.getElementById('pa-points');
        A_SCORE.textContent++ ;         
    } else{
        let B_SCORE = document.getElementById('pb-points');
        B_SCORE.textContent++ ;    
    }
}
/*
Selecciona los dos elementos de la clase p-names (nombres de los jugadores) 
y les aplica el event listener click para llamar a la función changeNames
*/
document.querySelectorAll('.p-names').forEach(player => {
    player.addEventListener('click', function(){
        changeNames(this);
    })
    
})

/*
Función para restar puntos
Previene que el participante obtenga puntos negativos
*/
function decrease(btn){
    const id = btn.id;
    if(id === 'pa-minus'){
        let A_SCORE = document.getElementById('pa-points');        
        A_SCORE.textContent <= 0 ? A_SCORE = 0 : A_SCORE.textContent--;
    } else{
        let B_SCORE = document.getElementById('pb-points');
        B_SCORE.textContent <= 0 ? B_SCORE = 0 : B_SCORE.textContent--;
    }
}


/*
Selecciona todos los elementos de la clase add-btns y le añade el addEventListener 
con la funcion add, pasándole la información del botón que la ejecutó
*/ 
document.querySelectorAll('.add-btns').forEach(button => {
    button.addEventListener('click',function(){
        add(this);
    })    
})

document.querySelectorAll('.decrease-btns').forEach(button =>{
    button.addEventListener('click', function(){
        decrease(this);
    })
})

// let totalTime = 3*60*100;
// let running = false;
// let countdownInterval;
// function startCountdown (){
//     if (totalTime<=0){
//         clearInterval(countdownInterval);
//         running = false;
//         alert('Time is up');
//         return;
//     }
//     running = true;
//     totalTime--;
//     let minutes = Math.floor(totalTime/6000);
//     let seconds = (Math.floor(totalTime/100))%60;
//     let milliseconds = totalTime%100;
//     document.getElementById('pass-timer').textContent = 
//         `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
// }
// function startStop(){
//     if(running === false){
//         countdownInterval = setInterval(startCountdown, 10);
//     }else{
//         clearInterval(countdownInterval);
//         running = false;
//     }
// }

/*
Para crear el cronómetro emplearemos requestAnimationFrame por ser un método más preciso que setInterval
Marcamos como duración por defecto para los asaltos 3 minutos
Calculamos el total de milisegundos
*/
let totalMinutes = 3
let totalTime = totalMinutes*(60 * 1000); 
let running = false;
let lastTime;

/**
La función step calcula el tiempo que pasa entre cada ciclo de requestAnimationFrame
requestAnimationFrame es un método más preciso que setInterval por no estár vinculado a las capacidades del navegador
Depende de la tasa de refresco de la pantalla por lo que en algunos casos la frecuencia de refresco podría ser cercana a 16ms
Una tasa demasiado elevada para un cronómetro de precisión, por ello se calcula el tiempo que pasa entre cada iteracción
 DELTA_TIME calcula el tiempo que pasa entre frames, ese valor es restado al tiempo total (en ms)
 y con el valor del tiempo restante actualizamos el cronómetro llamando a updateTimer
 Finalmente ejecutamos la función step de forma recursiva con requestAnimationFrame(step) hasta que el cronometro llega a 0
 en ese momento la función deja de ejecutarse
*/
function step(currentTime) {
    if (!running) return;
    if (!lastTime) lastTime = currentTime;
    const DELTA_TIME = currentTime - lastTime; 
    lastTime = currentTime;
    totalTime -= DELTA_TIME; 
    if (totalTime <= 0) {
        totalTime = 0;
        running = false;
        alert("Time is up!");
        return;
    }
    updateTimer();
    requestAnimationFrame(step);
}
/*
startStop es la función que se llama al presionar el botón de inicio
Obtiene el tiempo transcurrido con una precisión de una fracción de milisegundos a través de performance.now
Si el cronómetro no está corriendo lo inicia y cambia el texto del botón a stop
Si el cronómetro ya  está corriendo lo para y restaura el valor del botón a start
*/
function startStop() {
    let button = document.getElementById('start-stop-button');
    if (!running) {
        running = true;
        lastTime = performance.now();
        requestAnimationFrame(step);
        button.textContent = "STOP";
    } else {
        running = false;
        button.textContent = "START";
    }
}

/**
 * updateTimer se encarga del cálculo del tiempo restante en minutos segundos y milisegundos
 * así como de actualizar los valores del cronómetro
 */
function updateTimer() {
    const minutes = Math.floor(totalTime / 60000);
    const seconds = Math.floor((totalTime % 60000) / 1000);
    const milliseconds = Math.floor(totalTime % 1000);
    
    document.getElementById('timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:
         ${seconds.toString().padStart(2, '0')}:
         ${milliseconds.toString().padStart(3, '0')}`;
}

document.getElementById('start-stop-button').addEventListener('click', startStop);
