import { useParams, Link } from 'react-router-dom';
import { Smartphone, CreditCard, Lock, FileText, ShieldCheck } from 'lucide-react';
import { Header } from '../components/Header';

export function CheckoutPage() {
  const { type, id } = useParams();

  const itemData = {
    title: type === 'course' ? 'Complete iPhone Repair Mastery Course' : 'iPhone Repair Guide - All Models',
    price: type === 'course' ? 89.99 : 24.99,
  };

  const tax = itemData.price * 0.1;
  const total = itemData.price + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-slate-900 to-cyan-900 bg-clip-text text-transparent">Checkout</h1>
          <p className="text-slate-600 text-lg">Complete your purchase securely</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">Billing Details</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-semibold text-slate-700">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-slate-700">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Email</label>
                  <input
                    type="email"
                    placeholder="john.doe@email.com"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Country</label>
                  <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                </div>
              </form>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">Payment Method</h2>
              
              <div className="space-y-4 mb-6">
                <label className="flex items-center gap-3 p-4 border-2 border-cyan-600 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl cursor-pointer shadow-md">
                  <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-cyan-600" />
                  <CreditCard className="w-6 h-6 text-cyan-600" />
                  <span className="font-semibold text-slate-900">Credit / Debit Card</span>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 border-slate-300 rounded-xl cursor-pointer hover:border-slate-400 hover:bg-slate-50 transition-all">
                  <input type="radio" name="payment" className="w-5 h-5" />
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#00457C" d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.19a.641.641 0 0 1 .633-.54h4.607a.641.641 0 0 1 .633.74L7.71 20.797a.641.641 0 0 1-.633.54z"/>
                    <path fill="#0079C1" d="M10.502 2.19L7.395 21.337h4.607a.641.641 0 0 0 .633-.54l3.106-18.607a.641.641 0 0 0-.633-.74h-4.607z"/>
                    <path fill="#00457C" d="M14.746 21.337h4.607a.641.641 0 0 0 .633-.74l-3.106-18.607a.641.641 0 0 0-.633-.54h-4.607a.641.641 0 0 0-.633.74l3.106 18.607a.641.641 0 0 0 .633.54z"/>
                  </svg>
                  <span>PayPal</span>
                </label>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-semibold text-slate-700">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-slate-700">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-2xl p-8 sticky top-24 border border-slate-100">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border-2 border-cyan-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    {type === 'course' ? (
                      <Smartphone className="w-8 h-8 text-white" />
                    ) : (
                      <FileText className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 line-clamp-2 font-bold text-slate-900">{itemData.title}</h3>
                    <p className="text-sm text-cyan-700 font-semibold">{type === 'course' ? 'Repair Course' : 'Repair Guide'}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-semibold text-slate-700">Coupon Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                  />
                  <button className="px-6 py-3 border-2 border-cyan-600 text-cyan-600 rounded-xl hover:bg-cyan-50 font-bold transition-all">
                    Apply
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b-2 border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-semibold">Subtotal</span>
                  <span className="font-bold text-slate-900">${itemData.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-semibold">Tax</span>
                  <span className="font-bold text-slate-900">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-8 p-4 bg-gradient-to-br from-slate-50 to-cyan-50 rounded-xl">
                <span className="text-xl font-bold text-slate-900">Total</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">${total.toFixed(2)}</span>
              </div>

              <Link
                to="/order-success"
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all text-center block mb-6 font-bold text-lg"
              >
                Complete Payment
              </Link>

              <div className="flex items-center justify-center gap-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span className="font-semibold">256-bit Secure Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
