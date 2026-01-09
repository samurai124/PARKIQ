let spot_used_id = document.querySelector('#spot_used_id');
let clock_container = document.querySelector('#clock_container');
let entery_time = document.querySelector('#entery_time');
let car_parked_plat = document.querySelector('#car_parked_plat');
let intervalId;
let reservationHistory = JSON.parse(localStorage.getItem('reservationHistory'));
console.log(reservationHistory);

const params = new URLSearchParams(window.location.search);
const userString = params.get("reservation");
const reservation =  JSON.parse(decodeURIComponent(userString));


function removeReservationActive(reservation){
    let reservationActive = JSON.parse(localStorage.getItem("reservationActive"));
    if(!reservationActive){
        return
    }
    reservationActive = reservationActive.filter((e)=> e.id != reservation.id)
    localStorage.setItem("reservationActive" , JSON.stringify(reservationActive));
}



// clock function
function clock() {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    intervalId = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
        const h = String(hours).padStart(2, "0");
        const m = String(minutes).padStart(2, "0");
        const s = String(seconds).padStart(2, "0");
        clock_container.innerHTML = `${h}:<span class="text-indigo-600">${m}</span>:${s}`
    }, 1000);
}

clock();


//clearInterval(intervalId);


// details function 
function details() {
    console.log(reservation);
    spot_used_id.innerHTML = reservation.spotId;
    entery_time.innerHTML = reservation.enterTime
    car_parked_plat.innerHTML = reservation.carPlat.toUpperCase();
}
details();


// function to end the parking time
function confirmExit(){
    clearInterval(intervalId);
    reservation.leaveTime = MomentTime();
    reservation.duration = subtractTimes(MomentTime(), reservation.enterTime);
    reservation.price = calculatePrice(reservation.duration);
    if(reservationHistory.find((e)=> e.id == reservation.id)){
        return
    }
    reservationHistory.push(reservation);
    localStorage.setItem('reservationHistory',JSON.stringify(reservationHistory));
    console.log(reservation.spotId);
    updateStatus(reservation.spotId,false);
    setLocaleStorage();
    removeReservationActive(reservation)
    const query = encodeURIComponent(JSON.stringify(reservation));
    window.location.href = `/code/html/endOfsession.html?reservation=${query}`;
}