import { Link, useParams } from 'react-router-dom';
import { Smartphone, Star, Users, Clock, Award, PlayCircle, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useUnsplashImage } from '../hooks/useUnsplashImage';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const courseData = {
  id: '1',
  title: 'Complete iPhone Repair Mastery Course',
  subtitle: 'Master Professional iPhone Repair Techniques from Screen to Logic Board',
  instructor: {
    name: 'Carlos Martinez',
    avatar: 'CM',
    title: 'Certified Master Technician',
    students: 3420,
    courses: 8
  },
  rating: 4.9,
  ratingCount: 1240,
  students: 3420,
  price: 89.99,
  image: 'iphone repair course',
  duration: '42 hours',
  lectures: 156,
  level: 'All Levels',
  lastUpdated: 'November 2025',
  whatYouWillLearn: [
    'Disassemble and reassemble all iPhone models safely',
    'Master screen replacement and digitizer repair techniques',
    'Diagnose and fix battery and charging port issues',
    'Repair logic board components using microsoldering',
    'Troubleshoot water damage and corrosion problems',
    'Use professional repair tools and equipment effectively',
  ],
  requirements: [
    'No prior repair experience needed',
    'Basic hand-eye coordination and patience',
    'Access to basic repair tools (recommended list provided)',
  ],
  description: 'Welcome to the Complete iPhone Repair Mastery Course, the most comprehensive training program for aspiring mobile repair technicians. With 1,240+ ratings and a 4.9 average, this course has helped thousands of students launch successful repair careers. Learn from a certified master technician with 15+ years of experience.',
};

const curriculum = [
  {
    title: 'Introduction to iPhone Repair',
    lectures: 8,
    duration: '45min',
    lessons: [
      { title: 'Welcome to the Course', duration: '5:30', type: 'video' },
      { title: 'Essential Tools & Equipment', duration: '12:15', type: 'video' },
      { title: 'Safety Guidelines & ESD Protection', duration: '8:45', type: 'video' },
    ]
  },
  {
    title: 'Screen Replacement Techniques',
    lectures: 18,
    duration: '3h 20min',
    lessons: [
      { title: 'Screen Assembly Overview', duration: '15:20', type: 'video' },
      { title: 'Removing Damaged Screens', duration: '22:45', type: 'video' },
      { title: 'Installing New Digitizers', duration: '18:30', type: 'video' },
    ]
  },
  {
    title: 'Battery & Charging Port Repair',
    lectures: 15,
    duration: '2h 45min',
    lessons: []
  },
  {
    title: 'Logic Board Troubleshooting',
    lectures: 22,
    duration: '5h 30min',
    lessons: []
  },
];

const reviews = [
  {
    name: 'Michael Chen',
    avatar: 'MC',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Absolutely amazing course! Carlos explains every repair step clearly. I\'m now confidently repairing iPhones in my shop.'
  },
  {
    name: 'Lisa Rodriguez',
    avatar: 'LR',
    rating: 5,
    date: '1 month ago',
    comment: 'Best investment I\'ve made in my career. Went from zero knowledge to opening my own successful repair business!'
  },
  {
    name: 'Ahmed Hassan',
    avatar: 'AH',
    rating: 5,
    date: '3 weeks ago',
    comment: 'The microsoldering section alone was worth the price. Highly detailed and practical techniques that work!'
  },
];

export function CourseDetailsPage() {
  const { id } = useParams();
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);
  const imageUrl = useUnsplashImage(courseData.image);

  const toggleSection = (index: number) => {
    setExpandedSections(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      {/* Course Header */}
      <div className="bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">{courseData.title}</h1>
            <p className="text-xl text-cyan-100 mb-6">{courseData.subtitle}</p>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-bold">{courseData.rating}</span>
                <span className="text-cyan-200">({courseData.ratingCount.toLocaleString()} ratings)</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                <span className="font-semibold">{courseData.students.toLocaleString()} students</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center font-bold shadow-lg">
                {courseData.instructor.avatar}
              </div>
              <div>
                <p>Created by <Link to={`/instructor/${courseData.id}`} className="text-cyan-300 hover:text-cyan-200 font-semibold">{courseData.instructor.name}</Link></p>
                <p className="text-sm text-cyan-200">{courseData.instructor.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-cyan-200">
              <span>Last updated {courseData.lastUpdated}</span>
              <span>{courseData.level}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Preview */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
                <ImageWithFallback
                  src={imageUrl}
                  alt={courseData.title}
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <PlayCircle className="w-12 h-12 text-blue-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">What you'll learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {courseData.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Course Content</h2>
              <p className="text-slate-600 mb-6 font-semibold">
                {curriculum.length} sections • {curriculum.reduce((acc, s) => acc + s.lectures, 0)} lectures • {courseData.duration} total length
              </p>
              <div className="space-y-3">
                {curriculum.map((section, index) => (
                  <div key={index} className="border-2 border-slate-200 rounded-xl overflow-hidden hover:border-cyan-300 transition-all">
                    <button
                      onClick={() => toggleSection(index)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-cyan-50 transition-all font-semibold"
                    >
                      <div className="flex items-center gap-3">
                        {expandedSections.includes(index) ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                        <span>{section.title}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {section.lectures} lectures • {section.duration}
                      </span>
                    </button>
                    {expandedSections.includes(index) && section.lessons.length > 0 && (
                      <div className="border-t border-gray-200">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                              {lesson.type === 'video' ? (
                                <PlayCircle className="w-5 h-5 text-gray-400" />
                              ) : (
                                <FileText className="w-5 h-5 text-gray-400" />
                              )}
                              <span className="text-sm">{lesson.title}</span>
                            </div>
                            <span className="text-sm text-gray-600">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Requirements</h2>
              <ul className="space-y-2">
                {courseData.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                    <span className="text-sm">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Description</h2>
              <p className="text-slate-700 leading-relaxed text-lg">{courseData.description}</p>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Student Reviews</h2>
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b-2 border-slate-100 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white flex-shrink-0 font-bold shadow-lg">
                        {review.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p>{review.name}</p>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Purchase Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-2xl p-8 sticky top-24 border border-slate-100">
              <div className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">${courseData.price}</div>
              
              <Link
                to={`/checkout/course/${courseData.id}`}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all text-center block mb-3 font-bold"
              >
                Buy Now
              </Link>
              
              <button className="w-full py-4 border-2 border-cyan-600 text-cyan-600 rounded-xl hover:bg-cyan-50 transition-all font-bold mb-6">
                Add to Cart
              </button>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600 font-semibold">Duration</span>
                  <span className="font-bold text-slate-900">{courseData.duration}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600 font-semibold">Lectures</span>
                  <span className="font-bold text-slate-900">{courseData.lectures}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600 font-semibold">Level</span>
                  <span className="font-bold text-slate-900">{courseData.level}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600 font-semibold">Lifetime Access</span>
                  <span className="text-green-600 font-bold text-xl">✓</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-slate-600 font-semibold">Certificate</span>
                  <span className="text-green-600 font-bold text-xl">✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
