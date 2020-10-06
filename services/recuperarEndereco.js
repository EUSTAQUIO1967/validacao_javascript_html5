export const recuperarEndereco = (input) =>{
    const cepNumeros = input.value.replace(/\D/g,"");

    if (input.validity.valid){
        const url = `https://viacep.com.br/ws/${cepNumeros}/json`;

        const options = {
            method: 'GET',
            mode: 'cors',
            headers :{
                "content-type": "application/json;charset=utf-8"
            }

        };

        fetch(url, options)
                .then(response => response.json())
                .then(data =>{
                        if (data.erro){
                            input.setCustomValidity('Este não é um CEP válido.')
                            return;
                        }
                        preencherDadosEndereco(data);
                })
                input.setCustomValidity('');
                return;
    }
}

const preencherDadosEndereco= (data) => {
    document.getElementById('logradouro').value = data.logradouro;
    document.getElementById('cidade').value = data.localidade;
    document.getElementById('estado').value = data.uf;
    document.getElementById('bairro').value = data.bairro;
}