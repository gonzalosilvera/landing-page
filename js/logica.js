/*************************************************************************************************************************/
/********************** VALIDACION DADA PARA SER UTILIZADA ***************************************************************/
/*************************************************************************************************************************/

const validarCedula = (ci) => {
    //Inicializo los coefcientes en el orden correcto
    const arrCoefs = [2, 9, 8, 7, 6, 3, 4, 1];
    let suma = 0;
    //Para el caso en el que la CI tiene menos de 8 digitos
    //calculo cuantos coeficientes no voy a usar
    const difCoef = parseInt(arrCoefs.length - ci.length);
    //recorro cada digito empezando por el de más a la derecha
    //o sea, el digito verificador, el que tiene indice mayor en el array
    for (let i = ci.length - 1; i > -1; i--) {
        //Obtengo el digito correspondiente de la ci recibida
        const dig = ci.substring(i, i + 1);
        //Lo tenía como caracter, lo transformo a int para poder operar
        const digInt = parseInt(dig);
        //Obtengo el coeficiente correspondiente al ésta posición del digito
        const coef = arrCoefs[i + difCoef];
        //Multiplico dígito por coeficiente y lo acumulo a la suma total
        suma = suma + digInt * coef;
    }
    let result = false;
    // si la suma es múltiplo de 10 es una ci válida
    if ((suma % 10) === 0) {
        result = true;
    }
    return result;
}