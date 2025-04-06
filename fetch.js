
const input = document.getElementById('input');
input.addEventListener('keypress', (e)=>{
  //e.preventDefault();

    if(e.key==='Enter'){
           //console.log(input.value.trim());
    const inputValue = input.value.trim();               

fetch('http://localhost:3000/input',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify({ input: inputValue }),
})

           input.value='';
         }
});