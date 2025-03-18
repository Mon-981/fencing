
function changeNames(element){
    let newName = prompt('Your name');
    let regex = /^[a-zA-Z]+$/
    const id = element.id;
    if (newName!= null && regex.test(newName)){
        document.getElementById(id).textContent = newName;
    }else{
        alert('Name field can only contain letters');
        let id = element.id;
        if(id === 'pa-name'){
            document.getElementById(id).textContent = 'Player A';
        }else{
            document.getElementById(id).textContent = 'Player B';
        }
    }
}

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

document.querySelectorAll('.p-names').forEach(player => {
    player.addEventListener('click', function(){
        changeNames(this);
    })
    
});

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


//Selecciona todos los elementos de la clase add-btns y le añade el addEventListener 
// con la funcion add, pasándole la información del botón que la ejecutó
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

