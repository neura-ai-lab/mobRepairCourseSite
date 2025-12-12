import { Link } from 'react-router-dom';
import { Upload, FileText } from 'lucide-react';
import { Header } from '../components/Header';

export function UploadNotesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-slate-900 to-cyan-900 bg-clip-text text-transparent">Upload Repair Guides</h1>
        <p className="text-slate-600 mb-8 text-lg">Share your repair guides and help technicians learn better</p>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <form className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-slate-700">Guide Title</label>
              <input
                type="text"
                placeholder="e.g., Complete iPhone Screen Replacement Guide"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-700">Description</label>
              <textarea
                rows={5}
                placeholder="Describe what your repair guide covers and who it's for"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none transition-all"
              ></textarea>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium text-slate-700">Device Type</label>
                <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all">
                  <option>Select device type</option>
                  <option>iPhone</option>
                  <option>Samsung Galaxy</option>
                  <option>iPad</option>
                  <option>Android Tablets</option>
                  <option>Laptops</option>
                  <option>Other Devices</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium text-slate-700">Difficulty Level</label>
                <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Professional</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-700">Language</label>
              <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Chinese</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-700">Upload PDF</label>
              <div className="border-2 border-dashed border-cyan-300 rounded-xl p-8 text-center bg-gradient-to-br from-cyan-50 to-blue-50">
                <FileText className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
                <p className="text-slate-700 font-medium mb-2">Upload your repair guide in PDF format</p>
                <p className="text-sm text-slate-500 mb-4">Maximum file size: 50MB</p>
                <button
                  type="button"
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-bold"
                >
                  Choose PDF File
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-700">Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-semibold">$</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="24.99"
                  className="w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                />
              </div>
              <p className="text-sm text-slate-500 mt-2">Platform takes 20% commission</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
              <h3 className="font-bold text-slate-900 mb-3">Preview Information</h3>
              <div className="flex items-center gap-2 mb-2">
                <input type="checkbox" className="w-4 h-4 text-cyan-600 rounded" />
                <label className="text-sm font-medium text-slate-700">Allow first 3 pages as preview</label>
              </div>
              <p className="text-sm text-slate-600">
                Letting students preview your guides can increase purchases
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
              <h3 className="font-bold text-slate-900 mb-3">Guidelines</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Ensure your repair guides are original or you have rights to share them</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Content must be clear, well-organized, and easy to follow</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>No plagiarized or copyrighted material</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Include step-by-step instructions with diagrams for complex repairs</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-4 pt-6 border-t-2 border-slate-200">
              <Link
                to="/instructor/dashboard"
                className="flex-1 py-3 border-2 border-slate-300 rounded-xl hover:bg-slate-50 text-center font-semibold text-slate-700 transition-all"
              >
                Cancel
              </Link>
              <button className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 font-semibold transition-all">
                Save as Draft
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all font-bold"
              >
                Publish Guide
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
