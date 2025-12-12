import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Upload, Plus, X, ChevronRight } from 'lucide-react';
import { Header } from '../components/Header';

const steps = ['Basic Info', 'Content', 'Pricing', 'Review'];

export function UploadCoursePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [lessons, setLessons] = useState<{ title: string; video: string }[]>([]);
  const [files, setFiles] = useState<{ name: string; size: string }[]>([]);

  const addLesson = () => {
    setLessons([...lessons, { title: '', video: '' }]);
  };

  const removeLesson = (index: number) => {
    setLessons(lessons.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12">
          <Link to="/instructor/dashboard" className="text-cyan-600 hover:text-cyan-700 font-semibold mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-cyan-900 bg-clip-text text-transparent">Create Repair Course</h1>
          <p className="text-slate-600 text-lg">Share your mobile repair expertise with aspiring technicians</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold shadow-lg transition-all ${
                      index <= currentStep
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white scale-110'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className={`text-sm mt-2 font-semibold ${index <= currentStep ? 'text-slate-900' : 'text-slate-500'}`}>{step}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1.5 mx-4 rounded-full ${
                      index < currentStep ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-slate-200'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-bold text-slate-900">Course Title</label>
                <input
                  type="text"
                  placeholder="e.g., Complete iPhone 15 Repair Mastery"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                />
              </div>

              <div>
                <label className="block mb-2 font-bold text-slate-900">Subtitle</label>
                <input
                  type="text"
                  placeholder="Learn advanced repair techniques from certified technicians"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                />
              </div>

              <div>
                <label className="block mb-2 font-bold text-slate-900">Description</label>
                <textarea
                  rows={6}
                  placeholder="Detailed description of repair techniques, tools needed, and skills students will master"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none transition-all"
                ></textarea>
              </div>

              <div>
                <label className="block mb-2 font-bold text-slate-900">Repair Category</label>
                <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all">
                  <option>Select a category</option>
                  <option>Screen Repair</option>
                  <option>Battery Replacement</option>
                  <option>Motherboard Repair</option>
                  <option>Microsoldering</option>
                  <option>Water Damage</option>
                  <option>Hardware Components</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-bold text-slate-900">Skill Level</label>
                <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>All Levels</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">Course Thumbnail</label>
                <div className="border-2 border-dashed border-cyan-300 rounded-xl p-8 text-center bg-cyan-50/30 hover:border-cyan-500 transition-all">
                  <Upload className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <p className="text-slate-700 font-semibold mb-2">Upload course thumbnail</p>
                  <p className="text-sm text-slate-500">PNG, JPG up to 5MB (1280x720 recommended)</p>
                  <button className="mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 font-bold transition-all">
                    Choose File
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Course Content</h3>
                <p className="text-slate-600 mb-6">Add video lessons demonstrating repair techniques</p>
                
                <div className="space-y-4 mb-6">
                  {lessons.map((lesson, index) => (
                    <div key={index} className="border-2 border-slate-200 rounded-xl p-4 hover:border-cyan-300 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="flex-1 space-y-4">
                          <input
                            type="text"
                            placeholder="e.g., Screen Removal Technique"
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all font-semibold"
                          />
                          <div className="border-2 border-dashed border-cyan-300 rounded-xl p-6 text-center bg-cyan-50/30 hover:border-cyan-500 transition-all">
                            <Upload className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                            <p className="text-sm text-slate-700 font-semibold">Upload video</p>
                            <button className="mt-2 px-4 py-2 text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-md font-bold">
                              Choose File
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeLesson(index)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addLesson}
                  className="w-full py-4 border-2 border-dashed border-cyan-300 rounded-xl hover:border-cyan-500 hover:bg-cyan-50 flex items-center justify-center gap-2 text-cyan-600 hover:text-cyan-700 font-bold transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Add Lesson
                </button>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Repair Guides & Resources</h3>
                <p className="text-slate-600 mb-6">Add downloadable repair diagrams, schematics, and documentation</p>
                
                <div className="border-2 border-dashed border-cyan-300 rounded-xl p-8 text-center bg-cyan-50/30 hover:border-cyan-500 transition-all">
                  <Upload className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <p className="text-slate-700 font-semibold mb-2">Upload repair materials</p>
                  <p className="text-sm text-slate-500">PDF, DOC, ZIP up to 50MB</p>
                  <button className="mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 font-bold transition-all">
                    Choose Files
                  </button>
                </div>

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm">{file.name}</span>
                        <span className="text-sm text-gray-500">{file.size}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-bold text-slate-900">Course Price</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-bold">$</span>
                  <input
                    type="number"
                    placeholder="89.99"
                    className="w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-lg font-bold transition-all"
                  />
                </div>
                <p className="text-sm text-slate-500 mt-2">Platform takes 20% commission</p>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Pricing Recommendations</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                    <span className="text-slate-700">Beginner courses: $29.99 - $59.99</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                    <span className="text-slate-700">Intermediate courses: $59.99 - $99.99</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                    <span className="text-slate-700">Advanced/Microsoldering: $99.99 - $249.99</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-3">Review Your Course</h3>
                <p className="text-slate-600 text-lg">Make sure everything looks good before publishing</p>
              </div>

              <div className="border-2 border-slate-200 rounded-2xl p-6 space-y-4 bg-gradient-to-br from-slate-50 to-blue-50">
                <div>
                  <p className="text-sm text-slate-600 mb-1 font-semibold">Title</p>
                  <p className="text-lg font-bold text-slate-900">Complete iPhone 15 Repair Mastery</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1 font-semibold">Category</p>
                  <p className="text-slate-800">Screen Repair</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1 font-semibold">Price</p>
                  <p className="text-lg font-bold text-green-600">$89.99</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1 font-semibold">Lessons</p>
                  <p className="text-slate-800">{lessons.length} lessons</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-slate-200">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-8 py-3 border-2 border-slate-300 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-all"
            >
              Previous
            </button>
            
            <div className="flex gap-3">
              <button className="px-8 py-3 border-2 border-slate-300 rounded-xl hover:bg-slate-50 font-bold transition-all">
                Save as Draft
              </button>
              
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 font-bold transition-all"
                >
                  Next Step
                </button>
              ) : (
                <Link
                  to="/instructor/dashboard"
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/30 font-bold transition-all"
                >
                  Publish Course
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
