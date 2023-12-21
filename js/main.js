window.addEventListener('DOMContentLoaded', () => {
    const modes = [
        {
            mode: "synthetic",
            desc: "Loads should be under 8 poundes. It is recommended using neutral detergent to prevent damage to the cloth and to improve the washing results.",
            timer: "45",
            temperature: "cold",
            load: "medium"
        },
        {
            mode: "wool",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
            timer: "30",
            temperature: "cold",
            load: "medium"
        },
        {
            mode: "denim",
            desc: "when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
            timer: "65",
            temperature: "warm",
            load: "hard"
        },
        {
            mode: "silk",
            desc: "but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,",
            timer: "120",
            temperature: "very hot",
            load: "very hard"
        },
        {
            mode: "linen",
            desc: "and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            timer: "15",
            temperature: "cold",
            load: "easy"
        }
    ]
    
    let indexModes = 0;
    let totalMinutes = 0;
    let totalSeconds = 0;
    let updaterID = undefined;
    
    
    const elWashingModeList = document.querySelector('.washing-mode-list'),
    elModeControllerPrev = document.querySelector('.washing-mode-controller-prev'),
    elModeControllerNext = document.querySelector('.washing-mode-controller-next'),
    elTimerStatus = document.querySelector('.washing-mode-status-item-timer'),
    elTemperatureStatus = document.querySelector('.washing-mode-status-item-temperature'),
    elLoadStatus = document.querySelector('.washing-mode-status-item-load'),
    elModeNotice = document.querySelector('.washing-mode-notice'),
    elStartBtn = document.querySelector('.start-button'),
    elPauseBtn = document.querySelector('.pause-button');


    const renderedModes = renderModes(modes)
    activateElement(renderedModes)
    showInformations(modes)
    elWashingModeList.replaceChildren(...renderedModes)

    
    elStartBtn.addEventListener('click', () => {
        elStartBtn.classList.remove('control-btn--active');
        elPauseBtn.classList.add('control-btn--active');
        updaterID = setInterval(() => {
            updateTimer()
        }, 1000)
    })
    
    elPauseBtn.addEventListener('click', () => {
        elStartBtn.classList.add('control-btn--active');
        elPauseBtn.classList.remove('control-btn--active');
        clearInterval(updaterID)
    })
    
    
    elModeControllerPrev.addEventListener('click', () => {
        modesController(-1)
    })
    
    elModeControllerNext.addEventListener('click', () => {
        modesController(1)
    })
    
    
    function updateTimer() {
        if(totalSeconds <= 0) {
            clearInterval(updaterID)
            showInformations(modes);
            elStartBtn.classList.add('control-btn--active');
            elPauseBtn.classList.remove('control-btn--active');
        } else {
            totalSeconds = totalSeconds - 1;
            const {minutes, seconds} = getTimer();
            const timer = elTimerStatus.querySelector('.washing-mode-status-value');
            timer.textContent = `${getZero(minutes)} : ${getZero(seconds)} min`;
        }
    }
    
    function getTimer() {
        let seconds = Math.floor(totalSeconds % 60);
        let minutes = Math.floor(totalSeconds / 60);
        
        return {minutes, seconds}
    }
    
    function modesController(number) {
        indexModes += number
        if(indexModes < 0) {
            indexModes = modes.length - 1;
        } else if(indexModes > modes.length - 1) {
            indexModes = 0;
        }
        showInformations(modes);
        activateElement(renderedModes)
    }
    
    function activateElement(arr) {
        arr.forEach((item) => {
            item.classList.remove("washing-mode-item-active")
        })
        arr[indexModes].classList.add("washing-mode-item-active")
    }
    
    function showInformations(arrModes) {
        totalMinutes = modes[indexModes].timer;
        totalSeconds = Math.floor(totalMinutes * 60);
        const timer = elTimerStatus.querySelector('.washing-mode-status-value'),
        temperature = elTemperatureStatus.querySelector('.washing-mode-status-value'),
        load = elLoadStatus.querySelector('.washing-mode-status-value');
        
        timer.textContent = `${arrModes[indexModes].timer} min`;
        temperature.textContent = arrModes[indexModes].temperature;
        load.textContent = arrModes[indexModes].load;
        elModeNotice.textContent = arrModes[indexModes].desc;
    } 
    
    function renderModes(arrModes) {
        return arrModes.map((item, idx) => {
            const elLi = document.createElement('li')
            elLi.classList.add("washing-mode-item")
            elLi.innerHTML = `
            <a class="washing-mode-link" href="#">${item.mode}</a>
            `
            
            elLi.addEventListener('click', () => {
                indexModes = idx;
                activateElement(renderedModes)
            })
            
            return elLi
        })
    }
    
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
})