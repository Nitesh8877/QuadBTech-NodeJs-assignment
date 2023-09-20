module.exports=(sequelize,Sequelize)=>{

    const User=sequelize.define("users",{
        user_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          user_name: {
            type: Sequelize.STRING,
            allowNull: true, // May not be unique
          },
          user_email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          user_password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          user_image: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          total_orders: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
    },{
        timestamps: true, 
        createdAt: 'created_at', 
        updatedAt: 'last_logged_in', 
      });
    return User;

}