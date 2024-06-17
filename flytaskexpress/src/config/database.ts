import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('flytask', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres', // Adjust this based on your database type (e.g., 'mysql', 'sqlite')
  logging: false, // Disable logging of SQL queries to avoid cluttering your console
  define: {
    timestamps: true, // Sequelize adds createdAt and updatedAt fields automatically
    freezeTableName: true // Prevent Sequelize from pluralizing table names
  },
});

export default sequelize;