// ==UserScript==
// @name         Descifrado de IDs con Detección de Llave
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Descifra IDs con la llave detectada en clases que contienen 'M'
// @author       You
// @match        https://scarlet-jillana-15.tiiny.site
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tiiny.site
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js#sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==
// ==/UserScript==

(function() {
    'use strict';

    // Detectar la llave de cifrado buscando las letras mayúsculas
    function detectarLlaveCifrado() {
        const textoPagina = document.body.textContent;
        const letrasMayusculas = textoPagina.match(/[A-Z]/g);

        if (letrasMayusculas) {
            const llaveCifrado = letrasMayusculas.join('');
            console.log('Llave de Cifrado:', llaveCifrado);
            return llaveCifrado;
        } else {
            console.log('No se encontraron letras mayúsculas para la llave de cifrado');
            return "Vacio";
        }
    }

    // Almacenar la llave de cifrado
    const llaveCifrado = detectarLlaveCifrado();

    function descifrarIDsConLlave(llave) {
        const elementosConClaseM = document.querySelectorAll('[class*="M"]');
        const numeroDeElementos = elementosConClaseM.length;

        console.log(`Existen ${numeroDeElementos} elementos con su class igual a 'M':`);

        const configuracion = {
            mode: CryptoJS.mode.ECB
        };

        elementosConClaseM.forEach(elemento => {
            const idCifrado = elemento.id;
            const claveDescifrado = CryptoJS.enc.Utf8.parse(llave);

            // Descifrar el ID
            const idDescifrado = CryptoJS.TripleDES.decrypt(idCifrado, claveDescifrado, configuracion);

            console.log(`ID: ${elemento.id}, Texto Descifrado: ${idDescifrado.toString(CryptoJS.enc.Utf8)}`);
            const textoDescifrado = idDescifrado.toString(CryptoJS.enc.Utf8);

            // Se puede hacer lo que se necesite con el texto descifrado, como agregarlo al elemento o realizar otras operaciones
            elemento.textContent = textoDescifrado;
        });
    }

    // Ejecutar la función al cargar la página
    descifrarIDsConLlave(llaveCifrado);
})();
