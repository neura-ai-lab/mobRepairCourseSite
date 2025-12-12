import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export enum CourseLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

export enum CourseStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

interface CourseAttributes {
  id: number;
  title: string;
  description: string;
  shortDescription?: string;
  thumbnail?: string;
  price: number;
  discountPrice?: number;
  instructorId: number;
  categoryId?: number;
  level: CourseLevel;
  status: CourseStatus;
  duration?: number;
  totalLessons?: number;
  requirements?: string;
  whatYouWillLearn?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CourseCreationAttributes extends Optional<CourseAttributes, 'id' | 'shortDescription' | 'thumbnail' | 'discountPrice' | 'categoryId' | 'duration' | 'totalLessons' | 'requirements' | 'whatYouWillLearn'> {}

class Course extends Model<CourseAttributes, CourseCreationAttributes> implements CourseAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public shortDescription?: string;
  public thumbnail?: string;
  public price!: number;
  public discountPrice?: number;
  public instructorId!: number;
  public categoryId?: number;
  public level!: CourseLevel;
  public status!: CourseStatus;
  public duration?: number;
  public totalLessons?: number;
  public requirements?: string;
  public whatYouWillLearn?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    shortDescription: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'short_description'
    },
    thumbnail: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    discountPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'discount_price'
    },
    instructorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'instructor_id',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'category_id',
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    level: {
      type: DataTypes.ENUM(...Object.values(CourseLevel)),
      allowNull: false,
      defaultValue: CourseLevel.BEGINNER
    },
    status: {
      type: DataTypes.ENUM(...Object.values(CourseStatus)),
      allowNull: false,
      defaultValue: CourseStatus.DRAFT
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Duration in minutes'
    },
    totalLessons: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'total_lessons'
    },
    requirements: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    whatYouWillLearn: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'what_you_will_learn'
    }
  },
  {
    sequelize,
    tableName: 'courses'
  }
);

export default Course;
