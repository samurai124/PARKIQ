// const parkingSpots = [
//     { id: "A1", occupied: false },
//     { id: "A2", occupied: true },
//     { id: "A3", occupied: true },
//     { id: "A4", occupied: true },
//     { id: "A5", occupied: true },
//     { id: "A6", occupied: true },
//     { id: "A7", occupied: true },
//     { id: "A8", occupied: true },
//     { id: "A9", occupied: true },
//     { id: "A10",occupied: true }
// ];
const parkingSpots = getLocaleStorage();

// function to set the parkingSpots in the localeStorage 
function setLocaleStorage() {
    if (parkingSpots) {
            localStorage.setItem("parkingSpots", JSON.stringify(parkingSpots));
    }
}



// function to get items from locateStorage
function getLocaleStorage() {
    let parkingSpots;
    if (localStorage.getItem('parkingSpots')) {
        parkingSpots = JSON.parse(localStorage.getItem("parkingSpots"));
    }
    return parkingSpots || [];
}



// function to update status for the spot
function updateStatus(id,status){
    let spot_to_update = parkingSpots.find((e)=> e.id == id);
    if(spot_to_update){
        spot_to_update.occupied = Boolean(status);
    }
}



// function to find the first free spot
function findFreeSpot() {
    let freeSpot = parkingSpots.find((e) => e.occupied == false);
    return freeSpot;
}





// function to verify if capacity is full or not
function verifyCapacity() {
    let occupiedSpots = parkingSpots.filter((e) => e.occupied == true) || [];
    let capacity = (occupiedSpots.length / parkingSpots.length) * 100;    
    let capaciter_pursentage = document.querySelector("#apaciter_pursentage_card");
    capaciter_pursentage.innerHTML = `  <div class="flex justify-between items-end mb-6">
                    <div>
                        <p class="text-slate-500 text-sm font-medium uppercase tracking-wider mb-1">System Capacity</p>
                        <h2 class="text-4xl font-bold">${capacity}<span class="text-lg text-slate-400 font-normal">%</span></h2>
                    </div>
                    <div class="text-right">
                        <span class="text-emerald-500 text-sm font-bold">Optimal</span>
                        <p class="text-slate-500 text-xs">${occupiedSpots.length} / ${parkingSpots.length} total spots occupied</p>
                    </div>
                </div>
                <div  class="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                        class="absolute top-0 left-0 h-full w-[${capacity}%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full">
                    </div>
                </div>`
    
}





//  function to update tha main card 
function updateMainCard() {
    let first_free_spot = document.querySelector("#first_free_spot");
    let reserve_link = document.querySelector('#myLink');
    let freeSpoteid;
    let spotStatus;
    let freeSpot = findFreeSpot();
    if (freeSpot) {
        freeSpoteid = `<span 
                            id="first_free_spot"
                            class="px-4 py-1.5 glass rounded-full text-xs font-bold uppercase tracking-widest text-slate-800">
                            ${freeSpot.id}
                        </span>`;
        spotStatus = `<span
                            id="spot_status"
                            class="bg-emerald-500/20 text-emerald-600 px-3 py-1 rounded-lg text-xs font-bold border border-emerald-500/30">AVAILABLE
                        </span>`
    } else {
        freeSpoteid = `<span 
                            id="first_free_spot"
                            class="px-4 py-1.5 glass rounded-full text-xs font-bold uppercase tracking-widest text-slate-800">
                            0 Spot avilabl
                        </span>`;
        spotStatus = `<span 
                            id="spot_status"
                            class="bg-rose-500/20 text-rose-600 px-3 py-1 rounded-lg text-xs font-bold border border-rose-500/30">
                            ALL SPOTS ARE OCCUPIED
                        </span>`;
        reserve_link.addEventListener("click",function (e) {
            e.preventDefault();
            alert("Sorry all spots are occupied !!");
        })
    }
    first_free_spot.innerHTML = ""
    first_free_spot.insertAdjacentHTML('beforeend',freeSpoteid);
    first_free_spot.insertAdjacentHTML('beforeend',spotStatus);
}




// function to get the moment time

function MomentTime() {
    const now = new Date();
    const hours = now.getHours(); 
    const minutes = now.getMinutes();
    return `${hours}:${minutes}`;
}


// function to subtract two times 

function subtractTimes(time1, time2) {
    const [h1, m1] = time1.split(":").map(Number);
    const [h2, m2] = time2.split(":").map(Number);
    const t1 = new Date(1970, 0, 1, h1, m1, 0, 0);
    const t2 = new Date(1970, 0, 1, h2, m2, 0, 0);
    let diffMs = t1 - t2;
    if (diffMs < 0) {
        diffMs += 24 * 60 * 60 * 1000;
    }
    const diffMinutes = diffMs / 1000 / 60;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}h ${minutes}m`;
}


