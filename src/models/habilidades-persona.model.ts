import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_persona_id_habilidades: {
        name: 'fk_persona_id_habilidades',
        entity: 'Persona',
        entityKey: 'id',
        foreignKey: 'personaId',
      },
      fk_habilidad_id_habilidades: {
        name: 'fk_habilidad_id_habilidades',
        entity: 'Habilidad',
        entityKey: 'id',
        foreignKey: 'habilidadId',
      },
    },
  },
})
export class HabilidadesPersona extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  personaId?: number;

  @property({
    type: 'number',
  })
  habilidadId?: number;

  constructor(data?: Partial<HabilidadesPersona>) {
    super(data);
  }
}

export interface HabilidadesPersonaRelations {
  // describe navigational properties here
}

export type HabilidadesPersonaWithRelations = HabilidadesPersona & HabilidadesPersonaRelations;
