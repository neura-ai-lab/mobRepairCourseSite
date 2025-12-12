import User from './User';
import Course from './Course';
import Video from './Video';
import Note from './Note';
import Category from './Category';
import Enrollment from './Enrollment';
import Purchase from './Purchase';

// Re-export enums and types for easier imports
export { UserRole } from './User';
export { CourseLevel, CourseStatus } from './Course';
export { NoteStatus } from './Note';
export { EnrollmentStatus } from './Enrollment';

// User - Course associations (Instructor creates courses)
User.hasMany(Course, { foreignKey: 'instructorId', as: 'courses' });
Course.belongsTo(User, { foreignKey: 'instructorId', as: 'instructor' });

// User - Note associations (Instructor creates notes)
User.hasMany(Note, { foreignKey: 'instructorId', as: 'notes' });
Note.belongsTo(User, { foreignKey: 'instructorId', as: 'instructor' });

// Course - Video associations
Course.hasMany(Video, { foreignKey: 'courseId', as: 'videos' });
Video.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

// Category associations
Category.hasMany(Course, { foreignKey: 'categoryId', as: 'courses' });
Course.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

Category.hasMany(Note, { foreignKey: 'categoryId', as: 'notes' });
Note.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// Self-referencing for subcategories
Category.hasMany(Category, { foreignKey: 'parentId', as: 'subcategories' });
Category.belongsTo(Category, { foreignKey: 'parentId', as: 'parent' });

// Enrollment associations (Many-to-Many through Enrollment)
User.hasMany(Enrollment, { foreignKey: 'userId', as: 'enrollments' });
Enrollment.belongsTo(User, { foreignKey: 'userId', as: 'student' });

Course.hasMany(Enrollment, { foreignKey: 'courseId', as: 'enrollments' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

// Purchase associations
User.hasMany(Purchase, { foreignKey: 'userId', as: 'purchases' });
Purchase.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export {
  User,
  Course,
  Video,
  Note,
  Category,
  Enrollment,
  Purchase
};

export default {
  User,
  Course,
  Video,
  Note,
  Category,
  Enrollment,
  Purchase
};
