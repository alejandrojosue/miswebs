for (i = 1; i < 100; i++) {
    document.querySelector('.insert').innerHTML += `<br><canvas id="d${i}" width="780" height="430">
    </canvas>`;
}

const btn = document.querySelector(".borrar");
const dibujar = document.querySelector(".dibujar");
const agregar_hoja = document.querySelector('.agregar-hoja');
let $canvas = document.querySelectorAll("canvas");
let arrayCanvas = [].slice.call($canvas);
let contador = 0;
let COLOR = "black";
let GROSOR = 2;
const crearCanvas = () => {

    arrayCanvas.forEach(($canvas) => {

        const contexto = $canvas.getContext("2d");

        let xAnterior = 0,
            yAnterior = 0,
            xActual = 0,
            yActual = 0;

        const obtenerXReal = (clientX) => clientX - $canvas.getBoundingClientRect().left;
        const obtenerYReal = (clientY) => clientY - $canvas.getBoundingClientRect().top;
        let haComenzadoDibujo = false; // Bandera que indica si el usuario está presionando el botón del mouse sin soltarlo
        $canvas.addEventListener("mousedown", evento => {
            // En este evento solo se ha iniciado el clic, así que dibujamos un punto
            xAnterior = xActual;
            yAnterior = yActual;
            xActual = obtenerXReal(evento.clientX);
            yActual = obtenerYReal(evento.clientY);
            contexto.beginPath();
            contexto.fillStyle = COLOR;
            contexto.fillRect(xActual, yActual, GROSOR, GROSOR);
            contexto.closePath();
            // Y establecemos la bandera
            haComenzadoDibujo = true;
        });

        $canvas.addEventListener("mousemove", (evento) => {
            if (!haComenzadoDibujo) {
                return;
            }
            // El mouse se está moviendo y el usuario está presionando el botón, así que dibujamos todo

            xAnterior = xActual;
            yAnterior = yActual;
            xActual = obtenerXReal(evento.clientX);
            yActual = obtenerYReal(evento.clientY);
            contexto.beginPath();
            contexto.moveTo(xAnterior, yAnterior);
            contexto.lineTo(xActual, yActual);
            contexto.strokeStyle = COLOR;
            contexto.lineWidth = GROSOR;
            contexto.stroke();
            contexto.closePath();
        });

        ["mouseup", "mouseout"].forEach(nombreDeEvento => {
            $canvas.addEventListener(nombreDeEvento, () => {
                haComenzadoDibujo = false;
            });
        });
    });
}

btn.addEventListener('click', () => {
    COLOR = 'white';
    GROSOR = 10;
});

dibujar.addEventListener('click', () => {
    COLOR = 'black';
    GROSOR = 2;
});

document.querySelector('.black').addEventListener('click', () => {
    COLOR = 'black';
    GROSOR = 2;
});

document.querySelector('.green').addEventListener('click', () => {
    COLOR = '#2ECC71';
    GROSOR = 2;
});

document.querySelector('.red').addEventListener('click', () => {
    COLOR = 'red';
    GROSOR = 2;
});

agregar_hoja.addEventListener('click', () => {
    // document.querySelector('.insert').innerHTML += `<canvas width="780" height="430">
    // </canvas><br><br>`;
    // crearCanvas();
    contador++;
    document.querySelector(`#d${contador}`).style.display = 'block';
    document.querySelector('.insert').style.height = contador * 450 + 'px';
});

crearCanvas();