let rec;
const hablar = document.getElementById('hablar');

const btnIniciar = document.getElementById('btnIniciar');
const range = document.getElementById('range');
const show_frequency = document.querySelector('.show-frecuency');

window.addEventListener('load', inicio);

btnIniciar.addEventListener('click', iniciarFrecuencia);
range.addEventListener('change', cambiarFrecuencia);

function inicio() {
    try {
        window.AudioContext || window.webkitAudioContext;
        context = new AudioContext();
    } catch (error) {
        alert('La API no puede correr en su navegador');
    }
}

function iniciarFrecuencia() {
    osc = context.createOscillator();
    osc.frequency.value = range.value;
    osc.connect(context.destination);
    osc.start(0);
}

function cambiarFrecuencia() {
    osc.frequency.value = range.value;
    show_frequency.innerHTML = range.value + 'Hz';
}


function iniciar(event) {
    for (i = event.resultIndex; i < event.results.length; i++) {
        document.getElementById('texto').innerHTML = event.results[i][0].transcript;
        // if (event.results[i][0].transcript.trim() === 'parar') rec.stop();
        event.results[i][0].transcript.trim() === 'parar' ?
            rec.stop() :
            event.results[i][0].transcript.trim() === 'iniciar' ?
            alert('iniciar') :
            '';
    }
}



document.getElementById('iniciar').addEventListener('click', () => {
    if (!("webkitSpeechRecognition" in window)) {
        alert('Reconocimiento de voz incopatible con su navegador');
    } else {
        rec = new webkitSpeechRecognition();
        rec.lang = "es-HN";
        rec.continuous = true;
        rec.iterim = true;
        rec.addEventListener('result', iniciar);
        rec.start();
    }

});
document.getElementById('parar').addEventListener('click', () => {
    rec.stop();
});

hablar.addEventListener('click', () => {
    speechSynthesis.speak(new SpeechSynthesisUtterance('klma'));
});