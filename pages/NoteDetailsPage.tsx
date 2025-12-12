import { Link, useParams } from 'react-router-dom';
import { BookOpen, Star, FileText, Download, Eye, Award } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const noteData = {
  id: '1',
  title: 'Complete Smartphone Repair Manual',
  description: 'Comprehensive repair guide covering all major smartphone models and repair techniques. From basic screen replacement to advanced motherboard diagnostics, this manual is your complete reference for professional smartphone repair.',
  instructor: {
    name: 'Kevin (Kmaster)',
    avatar: 'KM',
    title: 'Master Technician',
    students: 2500,
    notes: 6
  },
  rating: 5.0,
  ratingCount: 450,
  pages: 200,
  price: 29.99,
  format: 'PDF',
  fileSize: '12.5 MB',
  lastUpdated: 'December 2025',
  language: 'English',
  downloads: 890,
  whatsIncluded: [
    'Detailed repair procedures for all models',
    'High-quality diagrams and photos',
    'Troubleshooting flowcharts',
    'Parts identification guide',
    'Common issues and solutions',
    'Quick reference sheets',
  ],
  tableOfContents: [
    'Safety and Tools Overview',
    'iPhone Repair Procedures',
    'Samsung Galaxy Repair Guide',
    'Screen Replacement Techniques',
    'Battery Replacement Methods',
    'Charging Port Repairs',
    'Camera Module Replacement',
    'Speaker and Microphone Repair',
    'Water Damage Recovery',
    'Motherboard Diagnostics',
  ],
};

const reviews = [
  {
    name: 'Sukhdeep Kaur',
    avatar: 'SK',
    rating: 5,
    date: '1 week ago',
    comment: 'This repair manual is incredibly detailed! Every procedure is explained clearly with great diagrams. Essential for any technician.'
  },
  {
    name: 'Michael Chen',
    avatar: 'MC',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Best repair guide I\'ve purchased. The troubleshooting section alone is worth the price. Highly recommend!'
  },
];

export function NoteDetailsPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Preview */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-slate-100">
              <div className="bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center mx-auto mb-6 border-2 border-cyan-100">
                    <FileText className="w-16 h-16 text-cyan-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">Preview Available</h3>
                  <p className="text-slate-600 mb-4">First 3 pages available for preview</p>
                  <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 flex items-center gap-2 mx-auto font-bold transition-all">
                    <Eye className="w-5 h-5" />
                    Preview Notes
                  </button>
                </div>
              </div>
            </div>

            {/* Title and Info */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-100">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-cyan-900 bg-clip-text text-transparent">{noteData.title}</h1>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-bold text-slate-900">{noteData.rating}</span>
                  <span className="text-slate-600">({noteData.ratingCount.toLocaleString()} ratings)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-cyan-600" />
                  <span className="text-slate-600 font-medium">{noteData.downloads.toLocaleString()} downloads</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {noteData.instructor.avatar}
                </div>
                <div>
                  <p className="text-slate-700">Created by <Link to={`/instructor/${noteData.id}`} className="text-cyan-600 hover:text-cyan-700 font-bold">{noteData.instructor.name}</Link></p>
                  <p className="text-sm text-slate-600 font-medium">{noteData.instructor.title}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border-2 border-slate-100">
                <div>
                  <p className="text-sm text-slate-600 mb-1 font-semibold">Pages</p>
                  <p className="font-bold text-slate-900">{noteData.pages}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1 font-semibold">Format</p>
                  <p className="font-bold text-slate-900">{noteData.format}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1 font-semibold">Size</p>
                  <p className="font-bold text-slate-900">{noteData.fileSize}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1 font-semibold">Language</p>
                  <p className="font-bold text-slate-900">{noteData.language}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-100">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">Description</h2>
              <p className="text-slate-700 leading-relaxed">{noteData.description}</p>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-100">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">What's Included</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {noteData.whatsIncluded.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Table of Contents */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-100">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">Table of Contents</h2>
              <div className="space-y-3">
                {noteData.tableOfContents.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 rounded-xl transition-all border-2 border-transparent hover:border-cyan-200">
                    <span className="text-sm text-slate-600 font-bold min-w-[2rem]">{index + 1}.</span>
                    <span className="text-sm text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-100">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">Reviews</h2>
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b-2 border-slate-100 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg">
                        {review.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-bold text-slate-900">{review.name}</p>
                          <span className="text-sm text-slate-500 font-medium">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-slate-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Purchase Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border-2 border-slate-100">
              <div className="text-4xl font-bold mb-6 text-slate-900">${noteData.price}</div>
              
              <Link
                to={`/checkout/note/${noteData.id}`}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 text-center block mb-3 font-bold transition-all"
              >
                Buy Now
              </Link>
              
              <button className="w-full py-3 border-2 border-cyan-600 text-cyan-600 rounded-xl hover:bg-cyan-50 mb-6 font-bold transition-all">
                Add to Cart
              </button>

              <div className="space-y-4 text-sm mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-semibold">Pages</span>
                  <span className="font-bold text-slate-900">{noteData.pages}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-semibold">Format</span>
                  <span className="font-bold text-slate-900">{noteData.format}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-semibold">File Size</span>
                  <span className="font-bold text-slate-900">{noteData.fileSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-semibold">Lifetime Access</span>
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-semibold">Downloadable</span>
                  <span className="text-green-600 font-bold">✓</span>
                </div>
              </div>

              <div className="border-t-2 border-slate-200 pt-6">
                <h3 className="mb-4 font-bold text-slate-900">Money-Back Guarantee</h3>
                <p className="text-sm text-slate-600">
                  If you're not satisfied with the content, request a refund within 30 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
