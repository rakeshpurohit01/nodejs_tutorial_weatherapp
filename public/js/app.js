// console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent =  '';

    if(location){

        fetch('http://localhost:3000/weather?address='+location).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    console.log(data.error);
                    messageOne.textContent = data.error;
                }
                else{
                    messageOne.textContent = data.location;
                    messageTwo.textContent =  data.forecast;
                    console.log(data.forecast);
                }
            });
        });
    }
       
});