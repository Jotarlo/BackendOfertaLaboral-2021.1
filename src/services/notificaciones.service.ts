import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llaves} from '../config/keys';
const sgMail = require('@sendgrid/mail')

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) { }

  /**
   * Envío de notificación mediante correo electrónico
   */
  EnviarCorreoElectronico(destino: string, asunto: string, contenido: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: destino, // Change to your recipient
      from: llaves.origenCorreoElectronico, // Change to your verified sender
      subject: asunto,
      html: contenido,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error: any) => {
        console.error(error)
      })
  }

}
