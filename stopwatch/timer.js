let hrs=0,min=0,sec=0;
let paused=true,elapsed=0,start=0;

function starter(){
    if (paused){
        paused = false;
        start = Date.now()-elapsed;
        intervalId = setInterval(updateTime,75);
    }
}

function pauser() {
    if(!paused){
        paused=true;
        elapsed = Date.now() - start;
        clearInterval(intervalId);    
    }
}
function reseter(){
    document.getElementById("time").textContent = "00:00:00";
    clearInterval(intervalId);
    start=0,elapsed=0,hrs=0,min=0,sec=0,pause=true;
}

function updateTime(){
    elapsed = Date.now() - start;
    sec = pad(Math.floor((elapsed/1000) % 60));
    min = pad(Math.floor((elapsed/(1000 *60)) % 60));
    hrs = pad(Math.floor((elapsed/(1000*60*60)) % 60));

    document.getElementById("time").textContent = `${hrs}:${min}:${sec}`;
    // console.log(`${hrs}:${min}:${sec}`);

    function pad(unit){
        return ("0"+unit).length>2 ? unit : "0" + unit;
    }
}

// setTime(1)
// setTimeout(setTime,5000,-1)
