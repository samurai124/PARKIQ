// reservation history
const reservationHistory = [
    {id : 1 , carPlat : "AA61",carType : 'car' , spotId : 'A1' , enterTime : "10:10" , leaveTime : "12:10", duration :  "2h 30m", price : 9.5 },
]


//temporaire  reservation active 
const reservationActive = JSON.parse(localStorage.getItem("reservationActive"));


// function to add a temporaire  reservation active to locale storage
function  temporaireReservationActive(reservation){
    let reservationActive = JSON.parse(localStorage.getItem("reservationActive"));
    if(!reservationActive){
        return
    }
    reservationActive.push(reservation);
    localStorage.setItem("reservationActive" , JSON.stringify(reservationActive));
}

function removeReservationActive(reservation){
    let reservationActive = JSON.parse(localStorage.getItem("reservationActive"));
    if(!reservationActive){
        return
    }
    reservationActive = removeReservationActive.filter((e)=> e.id == reservation.id)
    localStorage.setItem("reservationActive" , JSON.stringify(reservationActive));
}





// function to display spots
function dipslaySpots() {
    let spots_container = document.querySelector("#spots_container");
    spots_container.innerHTML = "";
    parkingSpots.forEach(element => {
        if (element.occupied == true) {
            spots_container.insertAdjacentHTML('beforeend', `<div class="relative">
                    <input type="radio" name="spot" id="${element.id}" class="hidden spot-checkbox" disabled value = "${element.id}">
                    <label for="${element.id}" class="flex flex-col items-center justify-center h-24 rounded-xl border-2 border-transparent bg-slate-200 opacity-40">
                        <span class="text-[10px] font-bold uppercase tracking-tighter text-slate-500">${element.id}</span>
                    </label>
                </div>`)
        } else {
            spots_container.insertAdjacentHTML('beforeend', `
                <div class="relative">
                    <input type="radio" name="spot" id="${element.id}" class="hidden spot-checkbox" value = "${element.id}">
                    <label for="${element.id}" class="flex flex-col items-center justify-center h-24 rounded-xl border-2 border-dashed border-slate-300 cursor-pointer hover:border-indigo-500 transition-all">
                    <span class="text-[10px] font-bold uppercase tracking-tighter text-slate-400">${element.id}</span>
                    <svg class="w-6 h-6 mt-1 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    </label>
                </div>`)
        }
    });
}
dipslaySpots();


// function to get the the car spot selected 
function getSpotSelected() {
    const radios = document.getElementsByName("spot");
    let selectedValue = null;
    for (let radio of radios) {
        if (radio.checked) {
            selectedValue = radio.value;
            break;
        }
    }
    return selectedValue
}


// function to get the car infos 

function getCarInfos(){
    let spot = getSpotSelected();
    if(!spot){
        alert('select a spot pleas !!');
        return
    }
    let carplat_number = document.querySelector('#carplat_number').value;
    let car_type = document.querySelector('#car_type').value;
    if(!carplat_number || !car_type ){
        alert( ' Enter the cart plat and select a car type !!! ');
        return
    }
    if(reservationActive.find((e)=>e.carPlat == carplat_number)){
        alert('this car is alredy parked !!');
        return
    }
    let reservation = {
        id : reservationHistory.length+1,
        carPlat : carplat_number,
        carType : car_type,
        spotId : spot,
        enterTime : MomentTime() ,
    }
    updateStatus(spot,true);
    setLocaleStorage();
    temporaireReservationActive(reservation);
    const query = encodeURIComponent(JSON.stringify(reservation));
    window.location.href = `/code/html/session.html?reservation=${query}`;
}

let confirm_reservation = document.querySelector("#confirm_reservation");
confirm_reservation.addEventListener('click',()=>{
getCarInfos();
})