import { /* inject, */ BindingScope, injectable} from '@loopback/core';
const generator = require('generate-password');
const CryptoJS = require("crypto-js");
@injectable({scope: BindingScope.TRANSIENT})
export class FuncionesGeneralesService {
  constructor(/* Add @inject to inject parameters */) { }

  /**
   * Función para generar una contraseña aleatoria
   */
  CrearClaveAleatoria(): string {
    let clave = generator.generate({
      length: 10,
      numbers: true,
      symbols: false,
      uppercase: true,
      lowercase: true
    });

    return clave;
  }

  /**
   * Cifrar texto
   */
  CifrarTexto(texto: string): string {
    let textoCifrado = CryptoJS.MD5(texto).toString();
    return textoCifrado;
  }


}
