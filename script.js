const firebaseConfig = {
  apiKey: "AIzaSyA_uUNnaJMxFAeuLfUEk40J51r6B-nVx3U",
  authDomain: "datosformulariobase.firebaseapp.com",
  projectId: "datosformulariobase",
  storageBucket: "datosformulariobase.appspot.com",
  messagingSenderId: "1092882226334",
  appId: "1:1092882226334:web:dd025e6ff5a944a4792f8f",
  measurementId: "G-H6YG0MD2VN"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.reventDefault(); // Corrección: es preventDefault(), no preventDefaul()

    let entradaNombre = document.getElementById('name');
    let errorNombre = document.getElementById('nameError');

    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor introduce tu nombre';
        errorNombre.classList.add('error-message');
    } else {
        errorNombre.textContent = '';
        errorNombre.classList.remove('error-message');
    }

    let emailEntrada = document.getElementById('email');
    let emailError = document.getElementById('emailError');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailEntrada.value)){
        emailError.textContent = 'Por favor introduce un correo válido';
        emailError.classList.add('error-message');
    } else {
        emailError.textContent = '';
        emailError.classList.remove('error-message');
    }

    let contrasenaEntrada = document.getElementById('password');
    let contrasenaError = document.getElementById('passwordError');
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = 'La contraseña debe contener al menos 8 caracteres, números, mayúsculas y caracteres especiales';
        contrasenaError.classList.add('error-message');
    } else {
        contrasenaError.textContent = '';
        contrasenaError.classList.remove('error-message');
    }

    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {

        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con éxito', docRef.id);
            document.getElementById('formulario').reset();
        })
        .cath((error) => {
            alert(error);
        })

        
        
    }
});
