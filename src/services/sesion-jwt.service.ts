import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llaves} from '../config/keys';
import {Usuario} from '../models';
const jwt = require('jsonwebtoken');
@injectable({scope: BindingScope.TRANSIENT})
export class SesionJwtService {
  constructor(/* Add @inject to inject parameters */) { }

  /**
   * Creación de un token JWT
   */
  CrearTokenJWT(usuario: Usuario) {
    return jwt.sign({
      exp: llaves.tiempoJWT,
      data: {
        nomUsuario: usuario.nombre_usuario,
        rol: usuario.tipoUsuarioId
      }
    }, llaves.claveJWT);
  }
}
