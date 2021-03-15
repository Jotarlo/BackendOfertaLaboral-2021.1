import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Persona,
ProfesionPersona,
Profesion,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaProfesionController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/profesions', {
    responses: {
      '200': {
        description: 'Array of Persona has many Profesion through ProfesionPersona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Profesion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Profesion>,
  ): Promise<Profesion[]> {
    return this.personaRepository.profesiones(id).find(filter);
  }

  @post('/personas/{id}/profesions', {
    responses: {
      '200': {
        description: 'create a Profesion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Profesion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profesion, {
            title: 'NewProfesionInPersona',
            exclude: ['id'],
          }),
        },
      },
    }) profesion: Omit<Profesion, 'id'>,
  ): Promise<Profesion> {
    return this.personaRepository.profesiones(id).create(profesion);
  }

  @patch('/personas/{id}/profesions', {
    responses: {
      '200': {
        description: 'Persona.Profesion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profesion, {partial: true}),
        },
      },
    })
    profesion: Partial<Profesion>,
    @param.query.object('where', getWhereSchemaFor(Profesion)) where?: Where<Profesion>,
  ): Promise<Count> {
    return this.personaRepository.profesiones(id).patch(profesion, where);
  }

  @del('/personas/{id}/profesions', {
    responses: {
      '200': {
        description: 'Persona.Profesion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Profesion)) where?: Where<Profesion>,
  ): Promise<Count> {
    return this.personaRepository.profesiones(id).delete(where);
  }
}
