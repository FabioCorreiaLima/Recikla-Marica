'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Coleta', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      material: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantity: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: { // Renomeado para coincidir com o modelo
        type: Sequelize.DATE,
        allowNull: false,
      },
      address: { // Renomeado para coincidir com o modelo
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('aguardando', 'em_andamento', 'concluida'),  // Usando ENUM para status fixos
        defaultValue: 'aguardando',
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Nome da tabela referenciada
          key: 'id',
        },
        onDelete: 'CASCADE', // Ação ao deletar o usuário
        onUpdate: 'CASCADE', // Ação ao atualizar o usuário
      },
      coletorId: { // Renomeado para coincidir com o modelo
        type: Sequelize.INTEGER, // ID do coletor que aceitou a coleta
        allowNull: true,
        references: {
          model: 'Users', // Nome da tabela referenciada
          key: 'id',
        },
        onDelete: 'SET NULL', // Ação ao deletar o coletor
        onUpdate: 'CASCADE', // Ação ao atualizar o coletor
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Coleta');
  }
};
