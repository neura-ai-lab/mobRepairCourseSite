import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface VideoAttributes {
  id: number;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnail?: string;
  duration?: number;
  courseId: number;
  order: number;
  isFree: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface VideoCreationAttributes extends Optional<VideoAttributes, 'id' | 'description' | 'thumbnail' | 'duration' | 'isFree'> {}

class Video extends Model<VideoAttributes, VideoCreationAttributes> implements VideoAttributes {
  public id!: number;
  public title!: string;
  public description?: string;
  public videoUrl!: string;
  public thumbnail?: string;
  public duration?: number;
  public courseId!: number;
  public order!: number;
  public isFree!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Video.init(
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
      allowNull: true
    },
    videoUrl: {
      type: DataTypes.STRING(500),
      allowNull: false,
      field: 'video_url'
    },
    thumbnail: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Duration in seconds'
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
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isFree: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_free'
    }
  },
  {
    sequelize,
    tableName: 'videos'
  }
);

export default Video;
