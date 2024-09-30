const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const User = require('./User');

// Definição do modelo Posts
const Posts = sequelize.define('Posts', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conteudo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: { // Coluna para a referência ao User
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Modelo referenciado
      key: 'id',   // Chave referenciada
    },
  },
});

// Associação: Post pertence a um User
Posts.belongsTo(User, { as: 'user', foreignKey: 'userId' });

module.exports = Posts;
