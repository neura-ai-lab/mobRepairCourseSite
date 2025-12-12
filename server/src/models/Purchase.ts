import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface PurchaseAttributes {
  id: number;
  userId: number;
  itemType: 'course' | 'note';
  itemId: number;
  amount: number;
  paymentMethod?: string;
  transactionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PurchaseCreationAttributes extends Optional<PurchaseAttributes, 'id' | 'paymentMethod' | 'transactionId'> {}

class Purchase extends Model<PurchaseAttributes, PurchaseCreationAttributes> implements PurchaseAttributes {
  public id!: number;
  public userId!: number;
  public itemType!: 'course' | 'note';
  public itemId!: number;
  public amount!: number;
  public paymentMethod?: string;
  public transactionId?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Purchase.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    itemType: {
      type: DataTypes.ENUM('course', 'note'),
      allowNull: false,
      field: 'item_type'
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'item_id'
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    paymentMethod: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'payment_method'
    },
    transactionId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'transaction_id'
    }
  },
  {
    sequelize,
    tableName: 'purchases'
  }
);

export default Purchase;
