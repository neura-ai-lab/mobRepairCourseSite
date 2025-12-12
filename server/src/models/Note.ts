import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export enum NoteStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

interface NoteAttributes {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  thumbnail?: string;
  price: number;
  discountPrice?: number;
  instructorId: number;
  categoryId?: number;
  status: NoteStatus;
  pages?: number;
  fileSize?: number;
  downloads: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface NoteCreationAttributes extends Optional<NoteAttributes, 'id' | 'thumbnail' | 'discountPrice' | 'categoryId' | 'pages' | 'fileSize' | 'downloads'> {}

class Note extends Model<NoteAttributes, NoteCreationAttributes> implements NoteAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public fileUrl!: string;
  public thumbnail?: string;
  public price!: number;
  public discountPrice?: number;
  public instructorId!: number;
  public categoryId?: number;
  public status!: NoteStatus;
  public pages?: number;
  public fileSize?: number;
  public downloads!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Note.init(
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
    fileUrl: {
      type: DataTypes.STRING(500),
      allowNull: false,
      field: 'file_url'
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
    status: {
      type: DataTypes.ENUM(...Object.values(NoteStatus)),
      allowNull: false,
      defaultValue: NoteStatus.DRAFT
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'file_size',
      comment: 'File size in bytes'
    },
    downloads: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    sequelize,
    tableName: 'notes'
  }
);

export default Note;
