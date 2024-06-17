import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Role } from './Role';
// Interface for User attributes
interface UserAttributes {
  usr_id: number;
  usr_name: string;
  usr_email: string;
  usr_password: string;
  usr_role: Role;
}

// Interface for User creation attributes
interface UserCreationAttributes extends Optional<UserAttributes, 'usr_id'> {}

// Define the User model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public usr_id!: number;
  public usr_name!: string;
  public usr_email!: string;
  public usr_password!: string;
  public usr_role!: Role;
}

// Initialize the User model
User.init(
  {
    usr_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usr_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usr_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    usr_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usr_role: {
      type: DataTypes.ENUM,
      values: Object.values(Role),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false, // Disable timestamps (createdAt and updatedAt)
    tableName: 'user',
  }
);

export default User;