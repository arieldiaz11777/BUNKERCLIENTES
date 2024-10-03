document.getElementById('clientForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const formData = new FormData(this);
    const params = new URLSearchParams(formData).toString();

    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = '0%'; // Reinicia el ancho de la barra de progreso
    let width = 0;

    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval); // Detiene el intervalo cuando llega al 100%
            // Envía los datos a la hoja de cálculo
            fetch('https://script.google.com/macros/s/AKfycbwba1rZmJnxF8AM_kdzNjhPwVEw3SW_Fxvad_4IzDiQI6Gb8S_328hmFdSHJpJH-uVGLQ/exec', {
                method: 'POST',
                body: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
                .then(response => response.text())
                .then(data => {
                    document.getElementById('message').innerText = data; // Mostrar mensaje de éxito o error
                    progressBar.style.width = '100%'; // Asegura que la barra llegue al 100%
                    this.reset(); // Reiniciar el formulario
                })
                .catch(error => {
                    document.getElementById('message').innerText = "Error: " + error.message;
                });
        } else {
            width++;
            progressBar.style.width = width + '%'; // Actualiza el ancho de la barra
        }
    }, 50); // Cambia el tiempo para acelerar o desacelerar la carga
});
