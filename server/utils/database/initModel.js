/**
 * mysql model init
 */

import path from 'path';
import Sequelize from 'sequelize';

import Config from '../../config';

const { dbConfig, isLocal } = Config;

const initModel = (config) => {
  const sequelize = new Sequelize({
    host: config.host,
    database: config.database,
    username: config.user,
    password: config.password,
    dialect: 'mysql',
    modelPaths: [path.resolve(__dirname, '../../models')],
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    operatorsAliases: false,
    // 本地环境输出生成后的SQL语句
    logging: isLocal && console.log,
  });
  return sequelize;
};

export default initModel;
