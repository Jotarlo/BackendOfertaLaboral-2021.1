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
  TipoUsuario,
  Usuario,
} from '../models';
import {TipoUsuarioRepository} from '../repositories';

export class TipoUsuarioUsuarioController {
  constructor(
    @repository(TipoUsuarioRepository) protected tipoUsuarioRepository: TipoUsuarioRepository,
  ) { }

  @get('/tipo-usuarios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of TipoUsuario has many Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.tipoUsuarioRepository.usuarios(id).find(filter);
  }

  @post('/tipo-usuarios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'TipoUsuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TipoUsuario.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInTipoUsuario',
            exclude: ['_id'],
            optional: ['tipoUsuarioId']
          }),
        },
      },
    }) usuario: Omit<Usuario, '_id'>,
  ): Promise<Usuario> {
    return this.tipoUsuarioRepository.usuarios(id).create(usuario);
  }

  @patch('/tipo-usuarios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'TipoUsuario.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.tipoUsuarioRepository.usuarios(id).patch(usuario, where);
  }

  @del('/tipo-usuarios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'TipoUsuario.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.tipoUsuarioRepository.usuarios(id).delete(where);
  }
}
