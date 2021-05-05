import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongoatlas',
  connector: 'mongodb',
  url: '',
  host: '',
  port: 27017,
  user: 'loopback',
  password: 'Sakthi@98',
  database: 'loopbackex',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoatlasDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongoatlas';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongoatlas', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
