export const validarPreco = input => {
    const preco = input.formatToNumber();
    console.log(preco);

    if (preco === 0){
        input.setCustomValidity("O preco tem que ser maior que R$ 0,00");
        return;
    }
    input.setCustomValidity("") ;
    return;


}