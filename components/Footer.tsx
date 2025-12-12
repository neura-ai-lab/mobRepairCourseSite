import { Link } from 'react-router-dom';
import { Smartphone, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 text-white mb-4">
              <img src="/image.webp" alt="Kmaster Electronics College Of Technology" className="h-10 w-auto" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Kmaster Electronics College Of Technology</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Professional mobile repair training provider serving students from all over Canada with hands-on, practical courses.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-cyan-400 transition-colors">📞 647-849-9722</li>
              <li className="hover:text-cyan-400 transition-colors">📞 416-831-5257</li>
              <li className="hover:text-cyan-400 transition-colors">📱 905-781-1209 (WhatsApp)</li>
              <li className="hover:text-cyan-400 transition-colors">📍 Mississauga Location</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 text-lg">Course Locations</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-cyan-400 transition-colors">Toronto & Mississauga</li>
              <li className="hover:text-cyan-400 transition-colors">Ottawa & Montreal</li>
              <li className="hover:text-cyan-400 transition-colors">Calgary & Edmonton</li>
              <li className="hover:text-cyan-400 transition-colors">Vancouver & Other Cities</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 text-lg">Follow Us</h3>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/kmasterelectronics" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-600 transition-all hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/kmastercollege" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-600 transition-all hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/kmastercollege" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-600 transition-all hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/kmaster-electronics-college" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-600 transition-all hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@kmasterelectronics" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-600 transition-all hover:scale-110">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm">
          <p className="text-slate-400">&copy; 2025 <span className="text-cyan-400 font-semibold">Kmaster Electronics College Of Technology</span>. All rights reserved. | Professional Mobile Repair Training Platform</p>
        </div>
      </div>
    </footer>
  );
}
