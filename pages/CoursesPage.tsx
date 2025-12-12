import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Smartphone, Filter, ChevronDown } from 'lucide-react';
import { CourseCard } from '../components/CourseCard';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

const courses = [
  { id: '1', title: 'Complete iPhone Repair Mastery Course', instructor: 'Mark Thompson', rating: 4.9, students: 3420, price: 89.99, image: 'iphone repair' },
  { id: '2', title: 'Android Device Repair & Troubleshooting', instructor: 'Jessica Liu', rating: 4.8, students: 2890, price: 79.99, image: 'android repair' },
  { id: '3', title: 'Microsoldering for Mobile Devices', instructor: 'David Martinez', rating: 4.9, students: 1750, price: 149.99, image: 'microsoldering' },
  { id: '4', title: 'Screen Replacement & Glass Repair', instructor: 'Sarah Chen', rating: 4.7, students: 4230, price: 49.99, image: 'screen repair' },
  { id: '5', title: 'Battery Repair & Replacement', instructor: 'Carlos Rivera', rating: 4.8, students: 2640, price: 59.99, image: 'battery repair' },
  { id: '6', title: 'Water Damage Repair Techniques', instructor: 'Lisa Park', rating: 4.7, students: 1870, price: 69.99, image: 'water damage' },
  { id: '7', title: 'Board Level Component Repair', instructor: 'Ahmed Hassan', rating: 4.9, students: 1320, price: 129.99, image: 'board repair' },
  { id: '8', title: 'Mobile Device Diagnostics', instructor: 'Maria Garcia', rating: 4.6, students: 2890, price: 54.99, image: 'diagnostics' },
];

export function CoursesPage() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-cyan-900 bg-clip-text text-transparent">Repair Courses</h1>
          <p className="text-xl text-slate-600 mb-8">Master mobile repair with expert-led courses</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex gap-4 items-center">
            <div className="flex-1 bg-white rounded-2xl shadow-lg shadow-cyan-500/10 p-2 flex items-center border border-slate-200 hover:border-cyan-300 transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-3" />
              <input
                type="text"
                placeholder="Search repair courses..."
                className="flex-1 px-4 py-3 outline-none text-slate-700"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden px-6 py-4 bg-white rounded-xl shadow-lg flex items-center gap-2 border border-slate-200 hover:border-cyan-300 transition-all"
            >
              <Filter className="w-5 h-5 text-cyan-600" />
              <span className="font-medium">Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
            <div className="bg-white rounded-2xl shadow-lg shadow-cyan-500/10 p-6 sticky top-24 border border-slate-200">
              <h3 className="text-lg font-bold mb-4 flex items-center justify-between text-slate-900">
                Filters
                <button className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">Clear all</button>
              </h3>

              <div className="space-y-6">
                {/* Repair Topics */}
                <div>
                  <button className="w-full flex items-center justify-between mb-3">
                    <span className="text-sm">Repair Topics</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="space-y-2">
                    {['Screen Repair', 'Battery Replacement', 'Water Damage', 'Board Repair', 'Diagnostics'].map((topic) => (
                      <label key={topic} className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                        <span className="text-sm">{topic}</span>
                      </label>
                    ))}
                  </div>
                </div>
              

                {/* Price */}
                <div>
                  <button className="w-full flex items-center justify-between mb-3">
                    <span className="text-sm">Price</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="space-y-2">
                    {['Free', 'Paid', 'Under $50', '$50 - $100', 'Above $100'].map((price) => (
                      <label key={price} className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                        <span className="text-sm">{price}</span>
                      </label>
                    ))}
                  </div>
                </div>

                

                {/* Skill Level */}
                <div>
                  <button className="w-full flex items-center justify-between mb-3">
                    <span className="text-sm">Skill Level</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="space-y-2">
                    {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                      <label key={level} className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                        <span className="text-sm">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Student Feedback */}
                <div>
                  <button className="w-full flex items-center justify-between mb-3">
                    <span className="text-sm">Student Feedback</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="space-y-2">
                    {['Excellent', 'Very Good', 'Good', 'Average'].map((feedback) => (
                      <label key={feedback} className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                        <span className="text-sm">{feedback}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <button className="w-full flex items-center justify-between mb-3">
                    <span className="text-sm">Rating</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="space-y-2">
                    {['4.5 & up', '4.0 & up', '3.5 & up', '3.0 & up'].map((rating) => (
                      <label key={rating} className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                        <span className="text-sm">{rating}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Course Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">{courses.length} courses found</p>
              <select className="px-4 py-2 border border-gray-300 rounded-lg outline-none">
                <option>Most Popular</option>
                <option>Highest Rated</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {courses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Previous
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-lg ${
                    page === 1 ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
