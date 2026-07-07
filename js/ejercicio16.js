const inputNumero1 = document.getElementById('numero1');
const inputNumero2 = document.getElementById('numero2');
const inputResultado = document.getElementById('resultado');

const sumar = (a, b) => a + b;

const restar = (a, b) => a - b;

const multiplicar = (a, b) => a * b;

const dividir = (a, b) => (b !== 0 ? a / b : 'Error: División por cero');

/**
 * @param {string} operacion - "suma", "resta", "multiplicacion" o "division".
 */
function calcularOperacion(operacion) {

    const valor1 = inputNumero1.value.trim();
    const valor2 = inputNumero2.value.trim();

    // Validación: los campos no deben estar vacíos
    if (valor1 === '' || valor2 === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Ingresa los dos números antes de calcular.'
        });
        return;
    }

    if (isNaN(valor1) || isNaN(valor2)) {
        Swal.fire({
            icon: 'error',
            title: 'Valor inválido',
            text: 'Ambos campos deben contener solo números.'
        });
        return;
    }

    const numero1 = Number(valor1);
    const numero2 = Number(valor2);
    let resultado;

    switch (operacion) {
        case 'suma':
            resultado = sumar(numero1, numero2);
            break;
        case 'resta':
            resultado = restar(numero1, numero2);
            break;
        case 'multiplicacion':
            resultado = multiplicar(numero1, numero2);
            break;
        case 'division':
            resultado = dividir(numero1, numero2);
            break;
        default:
            resultado = 'Operación no reconocida';
    }

    if (resultado === 'Error: División por cero') {
        Swal.fire({
            icon: 'error',
            title: 'División por cero',
            text: 'No es posible dividir entre cero.'
        });
        inputResultado.value = '';
        return;
    }

    inputResultado.value = resultado;
}
