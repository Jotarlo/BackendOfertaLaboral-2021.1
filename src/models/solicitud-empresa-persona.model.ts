import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Empresa} from './empresa.model';
import {Persona} from './persona.model';

@model({
  settings: {
    foreignKeys: {
      fk_persona_id_solicitud: {
        name: 'fk_persona_id_solicitud',
        entity: 'Persona',
        entityKey: 'id',
        foreignKey: 'personaId',
      },
      fk_empresa_id_solicitud: {
        name: 'fk_empresa_id_solicitud',
        entity: 'Empresa',
        entityKey: 'id',
        foreignKey: 'empresaId',
      },
    },
  },
})
export class SolicitudEmpresaPersona extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  asunto: string;

  @property({
    type: 'string',
    required: true,
  })
  contenido: string;

  @belongsTo(() => Empresa)
  empresaId: number;

  @belongsTo(() => Persona)
  personaId: number;

  constructor(data?: Partial<SolicitudEmpresaPersona>) {
    super(data);
  }
}

export interface SolicitudEmpresaPersonaRelations {
  // describe navigational properties here
}

export type SolicitudEmpresaPersonaWithRelations = SolicitudEmpresaPersona & SolicitudEmpresaPersonaRelations;
