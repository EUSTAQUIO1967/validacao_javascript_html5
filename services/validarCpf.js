export const validarCpf = (input) => {
     
        const cpfNumeros = (input.value).replace(/\D/g,"");

        if (ehUmCpfComNumerosRepetidos(cpfNumeros)){
            input.setCustomValidity("Este não é um CPF válido");
            return;
        } 
      

        const primeiraParteCpf = cpfNumeros.substr(0,9).split("");
        const primeiroDigitoCpf = Number(cpfNumeros.charAt(9));
        const primeiroDigitoCalculado = calcularDigito(primeiraParteCpf,10);

        if (primeiroDigitoCalculado !== primeiroDigitoCpf ){
            input.setCustomValidity("Este não é um CPF válido");
            return;
        } 

        const segundaParteCpf = cpfNumeros.substr(0,10).split("");
        const segundoDigitoCpf = Number(cpfNumeros.charAt(10));
        const segundoDigitoCalculado = calcularDigito(segundaParteCpf,11);

     
        if (segundoDigitoCalculado !== segundoDigitoCpf ){
            input.setCustomValidity("Este não é um CPF válido");
            return;
        } 

      
        input.setCustomValidity("");
        return;

}

const calcularTotal = (multiplicador) => (resultado, numeroAtual) =>
      resultado + numeroAtual * multiplicador--;


const calcularDigito = (parteCpf, multiplicador) => {
    // total = multiplicacao  dos números
    // resto = total %  11
    // digito = 11 - resto
    // parteCpf é uma array de numeros = ["1", "3", "4", ...]

    const total = parteCpf.reduce(calcularTotal(multiplicador),0);
    const resto = total % 11;
    let digito = 11-resto;

    if (digito > 9) {
        digito = 0;
    }

    return digito;
}

const ehUmCpfComNumerosRepetidos = (input) => {
    
    const numRepetidos = [
            '11111111111',
            '22222222222',
            '33333333333',
            '44444444444',
            '55555555555',
            '66666666666',
            '77777777777',
            '88888888888',
            '99999999999'
        ]

        return numRepetidos.includes(input);
}
