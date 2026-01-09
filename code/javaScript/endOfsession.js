const params = new URLSearchParams(window.location.search);
const userString = params.get("reservation");
const reservation =  JSON.parse(decodeURIComponent(userString));
let netry_time = document.querySelector('#netry_time');
let exit_time = document.querySelector('#exit_time');
let duration = document.querySelector('#duration');
let total_duraton = document.querySelector('#total_duraton');
let total_price = document.querySelector('#total_price');
console.log(reservation);


function updateDetails(){
    netry_time.innerHTML = reservation.enterTime;
    exit_time.innerHTML = reservation.leaveTime;
    duration.innerHTML = reservation.duration;
    total_duraton.innerHTML = reservation.duration;
    total_price.innerHTML = reservation.price;
}

updateDetails();
