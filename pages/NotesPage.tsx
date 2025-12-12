import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Smartphone, Filter, ChevronDown } from 'lucide-react';
import { NoteCard } from '../components/NoteCard';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

const notes = [
  { id: '1', title: 'Complete Smartphone Repair Manual', instructor: 'Kevin (Kmaster)', rating: 5.0, pages: 200, price: 29.99 },
  { id: '2', title: 'Advanced Micro Soldering Guide', instructor: 'Kevin (Kmaster)', rating: 5.0, pages: 150, price: 34.99 },
  { id: '3', title: 'Business Setup & Parts Supplier Directory', instructor: 'Kevin (Kmaster)', rating: 5.0, pages: 85, price: 19.99 },
  { id: '4', title: 'iPhone Repair Complete Guide', instructor: 'Kevin (Kmaster)', rating: 5.0, pages: 175, price: 27.99 },
  { id: '5', title: 'Android Device Repair Manual', instructor: 'Kevin (Kmaster)', rating: 5.0, pages: 180, price: 27.99 },
  { id: '6', title: 'IC Chip Level Repair Techniques', instructor: 'Kevin (Kmaster)', rating: 5.0, pages: 145, price: 32.99 },
];

export function NotesPage() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-cyan-900 bg-clip-text text-transparent">Repair Guides & Manuals</h1>
          <p className="text-xl text-slate-600 mb-8">Comprehensive documentation and study materials from Kmaster</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex gap-4 items-center">
            <div className="flex-1 bg-white rounded-2xl shadow-xl shadow-cyan-500/10 p-2 flex items-center border border-slate-200 hover:border-cyan-300 transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-3" />
              <input
                type="text"
                placeholder="Search smartphone repair guides, manuals..."
                className="flex-1 px-4 py-3 outline-none text-slate-700"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden px-6 py-4 bg-white rounded-xl shadow-xl flex items-center gap-2 border border-slate-200 hover:border-cyan-300 transition-all"
            >
              <Filter className="w-5 h-5 text-cyan-600" />
              <span className="font-medium text-slate-700">Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
            <div className="bg-white rounded-2xl shadow-xl shadow-cyan-500/10 p-6 sticky top-24 border border-slate-200 hover:border-cyan-200 transition-all">
              <h3 className="text-lg font-bold mb-4 flex items-center justify-between text-slate-900">
                Filters
                <button className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">Clear all</button>
              </h3>

              <div className="space-y-6">
                {/* Repair Topics */}
                <div>
                  <button className="w-full flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-slate-700">Repair Topics</span>
                    <ChevronDown className="w-4 h-4 text-slate-600" />
                  </button>
                  <div className="space-y-2">
                    {['Smartphone Repair', 'Micro Soldering', 'Business Setup', 'iPhone Repair', 'Android Repair'].map((topic) => (
                      <label key={topic} className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-cyan-600 rounded border-slate-300" />
                        <span className="text-sm text-slate-600">{topic}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Skill Level */}
                <div>
                  <button className="w-full flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-slate-700">Skill Level</span>
                    <ChevronDown className="w-4 h-4 text-slate-600" />
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

                {/* Price */}
                <div>
                  <button className="w-full flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-slate-700">Price</span>
                    <ChevronDown className="w-4 h-4 text-slate-600" />
                  </button>
                  <div className="space-y-2">
                    {['Free', 'Under $15', '$15 - $25', 'Above $25'].map((price) => (
                      <label key={price} className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                        <span className="text-sm">{price}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Format */}
                <div>
                  <button className="w-full flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-slate-700">Format</span>
                    <ChevronDown className="w-4 h-4 text-slate-600" />
                  </button>
                  <div className="space-y-2">
                    {['PDF', 'Text', 'Slides', 'Handwritten'].map((format) => (
                      <label key={format} className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                        <span className="text-sm">{format}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Guide Type */}
                <div>
                  <button className="w-full flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-slate-700">Guide Type</span>
                    <ChevronDown className="w-4 h-4 text-slate-600" />
                  </button>
                  <div className="space-y-2">
                    {['PDF', 'Video', 'Slides', 'Handwritten'].map((type) => (
                      <label key={type} className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Notes List */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-600 font-medium">{notes.length} guides found</p>
              <select className="px-4 py-2 border border-slate-300 rounded-xl outline-none text-slate-700 bg-white hover:border-cyan-300 transition-all">
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Highest Rated</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            <div className="space-y-4 mb-8">
              {notes.map((note) => (
                <NoteCard key={note.id} {...note} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <button className="px-6 py-2 border border-slate-300 rounded-xl hover:bg-cyan-50 hover:border-cyan-300 transition-all font-medium text-slate-700">
                Previous
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-xl font-medium transition-all ${
                    page === 1 ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' : 'border border-slate-300 hover:bg-cyan-50 hover:border-cyan-300 text-slate-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-6 py-2 border border-slate-300 rounded-xl hover:bg-cyan-50 hover:border-cyan-300 transition-all font-medium text-slate-700">
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
