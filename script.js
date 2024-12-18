const form = document.getElementById('upload-form');
const fileInput = document.getElementById('file-input');
const convertedImage = document.getElementById('converted-image');

form.addEventListener('submit', async (event) => {
    event.preventDefault();  // Previene la acción por defecto del formulario

    const formData = new FormData();  // Creamos un objeto FormData para enviar el archivo
    formData.append('file', fileInput.files[0]);  // Agregamos el archivo a la solicitud

    try {
        const response = await fetch('http://127.0.0.1:5000/convert-image', {
            method: 'POST',  // Usamos el método POST para enviar los datos
            body: formData,  // Enviamos el archivo
        });

        if (response.ok) {  // Si la respuesta del servidor es exitosa
            const blob = await response.blob();  // Convertimos la respuesta en un blob
            const imageUrl = URL.createObjectURL(blob);  // Creamos una URL para la imagen
            convertedImage.src = imageUrl;  // Mostramos la imagen convertida en el <img>
        } else {
            alert('Error al convertir la imagen.');  // Si hubo un error, mostramos un mensaje
        }
    } catch (error) {
        console.error('Error:', error);  // Si ocurre un error, lo mostramos en la consola
        alert('Error en la comunicación con el servidor.');  // También mostramos un mensaje
    }
});
