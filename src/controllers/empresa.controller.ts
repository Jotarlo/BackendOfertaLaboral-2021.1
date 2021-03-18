import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Empresa} from '../models';
import {EmpresaRepository} from '../repositories';

export class EmpresaController {
  constructor(
    @repository(EmpresaRepository)
    public empresaRepository : EmpresaRepository,
  ) {}

  @post('/empresa')
  @response(200, {
    description: 'Empresa model instance',
    content: {'application/json': {schema: getModelSchemaRef(Empresa)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresa, {
            title: 'NewEmpresa',
            exclude: ['id'],
          }),
        },
      },
    })
    empresa: Omit<Empresa, 'id'>,
  ): Promise<Empresa> {
    return this.empresaRepository.create(empresa);
  }

  @get('/empresa/count')
  @response(200, {
    description: 'Empresa model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Empresa) where?: Where<Empresa>,
  ): Promise<Count> {
    return this.empresaRepository.count(where);
  }

  @get('/empresa')
  @response(200, {
    description: 'Array of Empresa model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Empresa, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Empresa) filter?: Filter<Empresa>,
  ): Promise<Empresa[]> {
    return this.empresaRepository.find(filter);
  }

  @patch('/empresa')
  @response(200, {
    description: 'Empresa PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresa, {partial: true}),
        },
      },
    })
    empresa: Empresa,
    @param.where(Empresa) where?: Where<Empresa>,
  ): Promise<Count> {
    return this.empresaRepository.updateAll(empresa, where);
  }

  @get('/empresa/{id}')
  @response(200, {
    description: 'Empresa model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Empresa, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Empresa, {exclude: 'where'}) filter?: FilterExcludingWhere<Empresa>
  ): Promise<Empresa> {
    return this.empresaRepository.findById(id, filter);
  }

  @patch('/empresa/{id}')
  @response(204, {
    description: 'Empresa PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresa, {partial: true}),
        },
      },
    })
    empresa: Empresa,
  ): Promise<void> {
    await this.empresaRepository.updateById(id, empresa);
  }

  @put('/empresa/{id}')
  @response(204, {
    description: 'Empresa PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() empresa: Empresa,
  ): Promise<void> {
    await this.empresaRepository.replaceById(id, empresa);
  }

  @del('/empresa/{id}')
  @response(204, {
    description: 'Empresa DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.empresaRepository.deleteById(id);
  }
}
