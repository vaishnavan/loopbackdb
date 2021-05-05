import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TodoList,
  TodoList,
} from '../models';
import {TodoListRepository} from '../repositories';

export class TodoListTodoListController {
  constructor(
    @repository(TodoListRepository)
    public todoListRepository: TodoListRepository,
  ) { }

  @get('/todo-lists/{id}/todo-list', {
    responses: {
      '200': {
        description: 'TodoList belonging to TodoList',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TodoList)},
          },
        },
      },
    },
  })
  async getTodoList(
    @param.path.number('id') id: typeof TodoList.prototype.id,
  ): Promise<TodoList> {
    return this.todoListRepository.todoList(id);
  }
}
