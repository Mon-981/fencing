
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
Selecciona los dos elementos de la clase p-names (nombres de los jugadores) 
y les aplica el event listener click para llamar a la función changeNames
*/
document.querySelectorAll('.p-names').forEach(player => {
    player.addEventListener('click', function(){
        changeNames(this);
    })
    
})

/*
 Función para sumar puntos
 */
let A_SCORE = document.getElementById('pa-points');
let B_SCORE = document.getElementById('pb-points');
function add(btn){
    const id = btn.id;     
    if (id === 'pa-plus'){
        A_SCORE.textContent++ ;         
    } else{
        B_SCORE.textContent++ ;    
    }
}

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

/*
Para crear el cronómetro emplearemos requestAnimationFrame por ser un método más preciso que setInterval
Marcamos como duración por defecto para los asaltos 3 minutos
Calculamos el total de milisegundos
*/
let totalMinutes = 3
let totalTime = totalMinutes*(60 * 1000); 
let running = false;
let lastTime;
let passivityTime = 0.1*60*1000;
let passivityLastTime;

/**
 * Cambia los valores del texto del botón START cada vez que se pulsa
 */
function toggleStartStopButton(){
    let button = document.getElementById('start-stop-button');
    if (!running){
        button.textContent = "START";
    } else{
        button.textContent = "STOP";
    }
}

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

    if (!passivityLastTime) passivityLastTime = currentTime;
    const passivityDeltaTime = currentTime - passivityLastTime;
    passivityLastTime = currentTime;
    passivityTime -= passivityDeltaTime;

    if (totalTime <= 0) {
        totalTime = 0;
        running = false;
        toggleStartStopButton();
        alert("Time is up!");
        return;
    }
    
    
    if (passivityTime <= 0) {        
        passivityTime = 0;
        running = false;
        toggleStartStopButton();
        passivityTime = 0.1*60*1000;        
        alert('Penalty for passivity for both players');
        changePassivityStatus('playerA', 'playerB')
        totalTime += 10
    }
    
    updateTimer();
    updatePassivityTimer();
    requestAnimationFrame(step);
}
/*
startStop es la función que se llama al presionar el botón de inicio
Obtiene el tiempo transcurrido con una precisión de una fracción de milisegundos a través de performance.now
Si el cronómetro no está corriendo lo inicia y cambia el texto del botón a stop
Si el cronómetro ya  está corriendo lo para y restaura el valor del botón a start
*/
function startStop() {    
    if (!running) {
        running = true;
        toggleStartStopButton();
        lastTime = performance.now();
        passivityLastTime = performance.now();
        requestAnimationFrame(step);       
    } else {
        running = false;
        toggleStartStopButton();
    }
}

/**
 * updateTimer se encarga del cálculo del tiempo restante en minutos segundos y milisegundos
 * así como de actualizar los valores del cronómetro
 */
function updateTimer() {
    const minutes = Math.floor(totalTime / 60000);
    const seconds = Math.floor((totalTime / 1000)%60);
    const milliseconds = Math.floor((totalTime % 1000)/10);    
    document.getElementById('timer').textContent = 
        `${minutes.toString().padStart(2, '0')} : 
         ${seconds.toString().padStart(2, '0')}`;
}

document.getElementById('start-stop-button').addEventListener('click', startStop);

function updatePassivityTimer() {
    const minutes = Math.floor(passivityTime / 60000);
    const seconds = Math.floor((passivityTime / 1000)%60);
    const milliseconds = Math.floor(passivityTime % 1000);
    
    document.getElementById('pass-timer').textContent = 
        `${minutes.toString().padStart(2, '0')} : 
         ${seconds.toString().padStart(2, '0')} : 
         ${milliseconds.toString().padStart(3, '0')}`;
}

function reset(){
    totalTime = totalMinutes*(60 * 1000);
    passivityTime = 1*60*1000;
    updateTimer()
    updatePassivityTimer();
}

document.getElementById('reset-btn').addEventListener('click', reset);

let passivityStatusA = 0;
let passivityStatusB = 0;

if(passivityStatusA === 3){
    alert('Game Over');
    reset();
}
function changePassivityStatus(...args){
    for(let id of args){
        if (id === 'playerA'){
            passivityStatusA++;            
            setPassivityCards('playerA');
            if (passivityStatusA === 2){ 
                B_SCORE.textContent++;
            } else if(passivityStatusA === 3){
                alert('Jugador A descalificado');
                
            }    
        }else if (id === 'playerB') {
            passivityStatusB++;
            setPassivityCards('playerB');
            if (passivityStatusB === 2){ 
                A_SCORE.textContent++;
            } else if(passivityStatusA === 3){
                alert('Jugador B descalificado');                
            }  
        } else {
            console.log('Jugador no reconocido');
        }
    }
}
function setPassivityCards(id){
    let key= '';
    let player = '';
    if (id === 'playerA'){
        key = passivityStatusA;
        player = 'a';
    }else if (id === 'playerB') {
        key = passivityStatusB;
        player = 'b';       
    } else {
        console.log('Jugador no reconocido');
    }
    switch (key) {
        case 1:
            document.getElementById('yellow-card-' + player).style.display = 'flex';
            document.getElementById('yellow-card').style.display = 'flex';
            document.getElementById('yellow-card').addEventListener('click', function(){
                toggleDisplay(this);
            });
            break;
        case 2:
            document.getElementById('red-card-' + player).style.display = 'flex';
            document.getElementById('red-card').style.display = 'flex';
            document.getElementById('red-card').addEventListener('click', function(){
                toggleDisplay(this);
            });            
            break;    
        case 3:
            document.getElementById('black-card-' + player).style.display = 'flex';
            document.getElementById('black-card').style.display = 'flex';
            document.getElementById('black-card').addEventListener('click', function(){
                toggleDisplay(this);
            });
            reset();            
            break; 
        default:
            
            break;
    }
}

function toggleDisplay(element){
    id = element.id;
    document.getElementById(id).style.display = 'none';
}