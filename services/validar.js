import { validarDataNascimento } from './validarDataNascimento.js';
import { validarCpf } from './validarCpf.js';
import { recuperarEndereco } from './recuperarEndereco.js';
import { validarPreco } from './validarPreco.js';

/*
badInput: false
customError: data de nascimento, cep
patternMismatch: cep
rangeOverflow: data de nascimento
rangeUnderflow: data de nascimento
stepMismatch: false
tooLong: false
tooShort: senha
typeMismatch: email
valid: false
valueMissing: email
*/

const retornarMensagemDeErro = (tipo, validity) => {
    
    let mensagemDeErro = "";

    const tiposDeErro =  ['badInput',
        'customError',
        'patternMismatch',
        'rangeOverflow',
        'rangeUnderflow',
        'stepMismatch',
        'tooLong',
        'tooShort',
        'typeMismatch',
        'valid',
        'valueMissing'];


        const mensagensDeErro = {
            email: {
                valueMissing: 'O email é necessário',
                typeMismatch: 'Este não é um e-mail válido'
            },
            senha: {
                valueMissing: 'A senha é necessária',
                tooShort: 'A senha deve ter pelo menos 4 caracteres.'   
            },

            dataNascimento: {
                valueMissing: 'A data de nascimento é necessária',
                rangeUnderflow: 'O ano de nascimento deve ser superior a 01/01/1900.',
                customError: 'A idade mínima é 18 anos'
            },
            cpf: {
                valueMissing: "O CPF é necessário.",
                customError: "Não é um CPF válido"
            },
            rg: {
                valueMissing: "O RG é necessário.",
               
            },
            cep: {
                valueMissing: "O CEP é necessário.",
                patternMismatch: "Este não é um CEP válido",
                customError: "Este não é um CEP válido"
            },
            logradouro: {
                valueMissing: "O Logradouro é necessário."
            },
            complemento: {
                valueMissing: "O Complemento é necessário."
            },
            cidade: {
                valueMissing: "A Cidade é necessária."
            },
            bairro: {
                valueMissing: "O Bairro é necessário."
            },
            estado: {
                valueMissing: "O Estado é necessário"
            },
            preco: {
                valueMissing: "O preço é necessário",
                customError: "O preço do produto deve ser maior que R$ 0,00"
            },
            nomeProduto: {
                valueMissing: "O nome do produto é necessário"
            }

        }

        tiposDeErro.forEach( erro => {
            if (validity[erro]){
                mensagemDeErro = mensagensDeErro[tipo][erro];
            }
        });
        return mensagemDeErro;

};

export const validarInput = (input,adicionarErro = true) => {
    const classeElementoErro = 'erro-validacao';
    const classeInputErro = 'possui-erro-validacao';
    const elementoPai = input.parentNode;

    const elementoErroExiste = elementoPai.querySelector(
        `.${classeElementoErro}`
    );

    const elementoErro = elementoErroExiste || document.createElement('div');

    const elementoEhValido = input.validity.valid; //retorna true para valido

    const tipo = input.dataset.tipo;
   
    const validadoresEspecificos = {
        dataNascimento: input => validarDataNascimento(input),
        cpf: input => validarCpf(input),
        cep: input => recuperarEndereco(input),
        preco: input => validarPreco(input)
    };
    
    if (validadoresEspecificos[tipo]){
        validadoresEspecificos[tipo](input);
    }

    if (!elementoEhValido) {
          elementoErro.className = classeElementoErro;
          elementoErro.textContent = retornarMensagemDeErro(tipo, input.validity);

        if (adicionarErro){
            input.classList.add(classeInputErro);
            input.after(elementoErro);
        }
      
    }else {
        elementoErro.remove();
        input.classList.remove(classeInputErro);

    }
};