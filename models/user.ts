// models/user.ts

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database'; // Assuming you have a Sequelize instance configured

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  dob: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public dob!: Date;

  // You can add associations and methods here if needed
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users', // Optional: specify your table name
    timestamps: true,
  }
);

export default User;
