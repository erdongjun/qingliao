/**
 * mysql model init
 */

import path from 'path'
import { MysqlConfig } from 'config'
import { Sequelize } from 'sequelize-typescript'
import { random, getQconf } from '../index'
import { isLocal } from '../../config'

const poolList: { [key: string]: Sequelize } = {}

const mapModel = (configs: MysqlConfig) => {
  // 如果已经存在该数据库对应的链接，直接返回即可
  if (poolList[configs.key]) {
    return poolList[configs.key]
  }
  // 去除端口号
  const [mysqlServer] = configs.host[random(0, configs.host.length - 1)].split(
    ':'
  )

  const sequelize = new Sequelize({
    host: mysqlServer,
    database: configs.database,
    username: configs.user,
    password: configs.password,
    dialect: 'mysql',
    modelPaths: [path.resolve(__dirname, `../../models/${configs.key}`)],
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    operatorsAliases: false,
    // 本地环境输出生成后的SQL语句
    logging: isLocal && console.log,
  })

  poolList[configs.key] = sequelize

  return sequelize
}

export default (key: string) => mapModel(getQconf(key) as MysqlConfig)
