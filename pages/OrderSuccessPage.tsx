import { Link } from 'react-router-dom';
import { CheckCircle, Download, PlayCircle, Smartphone, FileText, Award } from 'lucide-react';
import { Header } from '../components/Header';

export function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-slate-200">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-cyan-900 bg-clip-text text-transparent">Purchase Successful!</h1>
          <p className="text-slate-600 mb-8 text-lg">
            Thank you for your purchase. Your order has been confirmed and you now have access to your repair training content.
          </p>

          {/* Order Details */}
          <div className="bg-gradient-to-br from-slate-50 to-cyan-50 rounded-xl p-6 mb-8 text-left border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4">Order Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Order Number</span>
                <span className="font-semibold text-slate-900">#ORD-2025-1234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Date</span>
                <span className="font-semibold text-slate-900">December 3, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Payment Method</span>
                <span className="font-semibold text-slate-900">Credit Card •••• 3456</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-slate-300">
                <span className="font-bold text-slate-900">Total Paid</span>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">$89.99</span>
              </div>
            </div>
          </div>

          {/* Item Purchased */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 mb-8 border-2 border-cyan-200">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-slate-900 mb-1">Complete iPhone Repair Mastery Course</h3>
                <p className="text-sm text-slate-600">Access your repair training anytime, anywhere</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/learn/1"
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all font-bold flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              Start Learning Now
            </Link>

            <button className="w-full py-4 border-2 border-cyan-600 text-cyan-600 rounded-xl hover:bg-cyan-50 hover:border-cyan-700 transition-all font-semibold flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Receipt
            </button>

            <Link
              to="/student/dashboard"
              className="w-full py-4 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all font-semibold flex items-center justify-center gap-2"
            >
              Go to Dashboard
            </Link>
          </div>

          {/* Email Confirmation */}
          <p className="text-sm text-slate-600 mt-8">
            A confirmation email has been sent to <span className="text-cyan-600 font-semibold">john.doe@email.com</span>
          </p>
        </div>

        {/* What's Next */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <PlayCircle className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-900 mb-1">Access Your Training</h3>
                <p className="text-sm text-slate-600">
                  Start learning repair techniques immediately from your dashboard
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-900 mb-1">Download Repair Guides</h3>
                <p className="text-sm text-slate-600">
                  Get all repair manuals, diagrams, and reference materials
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-900 mb-1">Earn Your Certification</h3>
                <p className="text-sm text-slate-600">
                  Complete the course to receive your professional repair technician certificate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
