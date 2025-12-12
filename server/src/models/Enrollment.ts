import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export enum EnrollmentStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

interface EnrollmentAttributes {
  id: number;
  userId: number;
  courseId: number;
  status: EnrollmentStatus;
  progress: number;
  completedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface EnrollmentCreationAttributes extends Optional<EnrollmentAttributes, 'id' | 'progress' | 'completedAt'> {}

class Enrollment extends Model<EnrollmentAttributes, EnrollmentCreationAttributes> implements EnrollmentAttributes {
  public id!: number;
  public userId!: number;
  public courseId!: number;
  public status!: EnrollmentStatus;
  public progress!: number;
  public completedAt?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Enrollment.init(
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
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'course_id',
      references: {
        model: 'courses',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM(...Object.values(EnrollmentStatus)),
      allowNull: false,
      defaultValue: EnrollmentStatus.ACTIVE
    },
    progress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: 'Progress percentage (0-100)'
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'completed_at'
    }
  },
  {
    sequelize,
    tableName: 'enrollments',
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'course_id']
      }
    ]
  }
);

export default Enrollment;
