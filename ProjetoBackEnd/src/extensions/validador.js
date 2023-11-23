const express = require('express');

function validaTexto(texto){
    if (!texto || !texto.trim()) {
        console.log("A string está nula ou vazia.");
    } else {
        console.log(`A string "${texto}" é válida.`);
    }
}

function validarCampoNumerico(valor) {
    if (!valor && valor !== 0) {
        console.log("O campo numérico está vazio ou nulo.");
    } else {
        console.log(`O valor numérico é: ${valor}`);
    }
}

module.exports = {validaTexto, validarCampoNumerico}