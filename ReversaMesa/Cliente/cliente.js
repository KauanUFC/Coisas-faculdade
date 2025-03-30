//nao foi implementado
//mas era pra definir o que ser colocado no input

//fazer o input do nome;
const inputName = document.getElementById('nameInput'); // HTML
inputName.addEventListener('keypress', function(event) {
   const char = String.fromCharCode(event.which);
   //pode ser usando o swith case mas fodasse 
   if(event.key === ' '){
       event.preventDefault();
       inputName.value += "_" ;
     }
   if(event.key === 'ç'){
      event.preventDefault();
      inputName.value += "ç" ;
    } 
     else if (!/[a-zA-Z]/.test(char)) {
        event.preventDefault(); 
    }
});

const inputEmail = document.getElementById('emailInput'); // HTML
inputEmail.addEventListener('keypress', function(event) {
   const char = String.fromCharCode(event.which);
   //pode ser usando o swith case mas fodasse 
   if(event.key === ' '){
       event.preventDefault();
       inputEmail.value += "_" ;
     }
     if(event.key === '@'){
        event.preventDefault();
        inputEmail.value += "@" ;
      }
     if(event.key === '.'){
        event.preventDefault();
        inputEmail.value += "." ;
      }
     else if (!/[a-zA-Z]/.test(char)) {
        event.preventDefault(); 
    }
});

const inputPhone = document.getElementById('phoneInput');
phoneInput.addEventListener('keypress', function(event){
const char = String.fromCharCode(event.which);
    if(event.key ===' '){ 
       event.preventDefault();
    }
    else if(!/[0-9]/.test(char)){
          event.preventDefault();
    }
});


  