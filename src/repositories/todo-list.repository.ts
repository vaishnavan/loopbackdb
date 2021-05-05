import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoatlasDataSource} from '../datasources';
import {TodoList, TodoListRelations} from '../models';
import {TodoListRepository} from './todo-list.repository';

export class TodoListRepository extends DefaultCrudRepository<
  TodoList,
  typeof TodoList.prototype.id,
  TodoListRelations
> {

  public readonly todoLists: HasManyRepositoryFactory<TodoList, typeof TodoList.prototype.id>;

  public readonly todoList: BelongsToAccessor<TodoList, typeof TodoList.prototype.id>;

  constructor(
    @inject('datasources.mongoatlas') dataSource: MongoatlasDataSource, @repository.getter('TodoListRepository') protected todoListRepositoryGetter: Getter<TodoListRepository>,
  ) {
    super(TodoList, dataSource);
    this.todoList = this.createBelongsToAccessorFor('todoList', todoListRepositoryGetter,);
    this.registerInclusionResolver('todoList', this.todoList.inclusionResolver);
    this.todoLists = this.createHasManyRepositoryFactoryFor('todoLists', todoListRepositoryGetter,);
    this.registerInclusionResolver('todoLists', this.todoLists.inclusionResolver);
  }
}
