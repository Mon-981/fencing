
function changeNames(element){
    let newName = prompt('Your name');
    let regex = /^[a-zA-Z]+$/
    const id = element.id;
    if (regex.test(newName)){
        document.getElementById(id).textContent = newName;
    }else{
        alert('Name field can only contain letters');
        document.getElementById(id).textContent = 'Player A';
    }
}

function add(point){
    const id = point.id;     
    if (id === 'pa-plus'){
        let A_SCORE = document.getElementById('pa-points');
        A_SCORE.textContent++ ;         
    } else{
        let B_SCORE = document.getElementById('pb-points');
        B_SCORE.textContent++ ;    
    }
}

function substract(point){
    const id = point.id;
    if(id === 'pa-minus'){
        let A_SCORE = document.getElementById('pa-points');        
        A_SCORE.textContent <= 0 ? A_SCORE = 0 : A_SCORE.textContent--;
    } else{
        let B_SCORE = document.getElementById('pb-points');
        B_SCORE.textContent <= 0 ? B_SCORE = 0 : B_SCORE.textContent--;
    }
}
