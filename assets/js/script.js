function timerClock() { 
  function createSecondsDate(seconds) {
    const date = new Date(seconds * 1000);
    return date.toLocaleTimeString("pt-BR", {
      hour12: false,
      timeZone: "UTC"
    });
  }

  const timer = document.querySelector(".timer");
  let seconds = 0;
  let time;

  function iniciaRelogio() {
    time = setInterval(() => {
      seconds++;
     timer.innerHTML = createSecondsDate(seconds)
    }, 1000);
  }
  
  document.addEventListener("click", (e) => {
    const element = e.target;
  
    if (element.classList.contains('start')) {
      timer.classList.remove('zero');
      clearInterval(time);
      iniciaRelogio();
    }
  
    if (element.classList.contains('paused')) {
      clearInterval(time);
      timer.classList.add('zero');
    }
  
    if (element.classList.contains('zero')) {
      clearInterval(time);
      timer.innerHTML = "00:00:00";
      timer.classList.remove('zero');
      seconds = 0;
    }
  });
}
timerClock();