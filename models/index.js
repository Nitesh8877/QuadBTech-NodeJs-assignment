
const config=require("../configs/db.config.js")
const Sequelize=require('sequelize');

/*
 * Creating the db connection
*/

const sequelize=new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,{
        host:config.HOST,
        dialect:config.dialect
    }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
const db={  
};
sequelize.sync()
  .then(() => {
    console.log('Tables have been created (if not exist) successfully.');
  })
  .catch((err) => {
    console.error('Unable to synchronize tables:', err);
  });
db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.users=require('./users.model.js')(db.sequelize,Sequelize)

module.exports=db;