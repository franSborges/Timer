const selectingHtml = document.querySelector("html")
const inputCheckBox = document.querySelector("input[name=theme]")

const getStyle = (element, style) =>
  window
    .getComputedStyle(element)
    .getPropertyValue(style)

const initialColors = {
  bgColor: getStyle(selectingHtml, "--bg-color"),
  bgTimer: getStyle(selectingHtml, "--bg-timer"),
  bgButtons: getStyle(selectingHtml, "--bg-buttons"),
  colorHeadings: getStyle(selectingHtml, "--color-headings"),
  colorText: getStyle(selectingHtml, "--color-text"),
  borderColor: getStyle(selectingHtml, "--border-colors")
}

const darkMode = {
  bgColor: "#333333",
  bgTimer: "#434343",
  bgButtons: "#fcfcfc48",
  colorHeadings: "#0ac438",
  colorText: "#fff",
  borderColor: "#fff"
}

const transformKey = key => 
  "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

const changeColors = (colors) => {
  Object.keys(colors).map(key =>
    selectingHtml.style.setProperty(transformKey(key), colors[key])
  );
}

inputCheckBox.addEventListener("change", ({target}) => {
  target.checked ? changeColors(darkMode) : changeColors(initialColors)
})

function timerClock() {
  function createSecondsDate(seconds) {
    const date = new Date(seconds * 1000)
    return date.toLocaleTimeString('pt-BR', {
      hour12: false,
      timeZone: 'UTC'
    })
  }

  const timer = document.querySelector('.timer')
  let seconds = 0
  let time

  function iniciaRelogio() {
    time = setInterval(() => {
      seconds++
      timer.innerHTML = createSecondsDate(seconds)
    }, 1000)
  }

  document.addEventListener('click', e => {
    const element = e.target

    if (element.classList.contains('start')) {
      timer.classList.remove('pause')
      clearInterval(time)
      iniciaRelogio()
    }

    if (element.classList.contains('paused')) {
      clearInterval(time)
      timer.classList.add('pause')
    }

    if (element.classList.contains('zero')) {
      clearInterval(time)
      timer.innerHTML = '00:00:00'
      timer.classList.remove('pause')
      seconds = 0
    }
  })
}
timerClock()
