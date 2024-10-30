const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

// Definição do modelo Coleta
const Coleta = sequelize.define('Coleta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  material: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {  // Renomeado para manter consistência em português
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {  // Renomeado para manter consistência em português
    type: DataTypes.DATE,
    allowNull: false,
  },
  address: {  // Renomeado para manter consistência em português
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('aguardando', 'em_andamento', 'concluida'),  // Usando ENUM para status fixos
    defaultValue: 'aguardando',
  },
  userId: { // Coluna para a referência ao User
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Modelo referenciado
      key: 'id',   // Chave referenciada
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  coletorId: { // ID do coletor que aceitou a coleta
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User, // Supondo que o coletor também seja um usuário
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
}, {
  timestamps: true,
});

// Associação: Coleta pertence a um User (solicitante)
Coleta.belongsTo(User, { as: 'user', foreignKey: 'userId' });
// Associação opcional: Coletor pode ser um User
Coleta.belongsTo(User, { as: 'coletor', foreignKey: 'coletorId' });

module.exports = Coleta;
