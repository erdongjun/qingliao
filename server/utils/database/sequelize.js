/**
 * mysql model init
 */

import path from 'path';
import Sequelize from 'sequelize';

import Config from '../../config';

const { dbConfig, isLocal } = Config;


const sequelize = new Sequelize({
  host: dbConfig.host,
  database: dbConfig.database,
  username: dbConfig.user,
  password: dbConfig.password,
  dialect: 'mysql',
  modelPaths: [path.resolve(__dirname, '../../models')],
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: false,
    underscored: false,
    freezeTableName: true,
  },
  operatorsAliases: false,
  // 本地环境输出生成后的SQL语句
  logging: isLocal && console.log,
});

export default sequelize;
