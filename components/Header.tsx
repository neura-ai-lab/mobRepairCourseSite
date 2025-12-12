import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Smartphone, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/image.webp" alt="Kmaster Electronics College Of Technology" className="h-12 w-auto group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Kmaster Electronics College Of Technology</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {(!user || user.userType === 'student') && (
              <>
                <Link to="/courses" className="text-slate-700 hover:text-cyan-600 font-medium transition-colors">
                  Repair Courses
                </Link>
                <Link to="/notes" className="text-slate-700 hover:text-cyan-600 font-medium transition-colors">
                  Guides & Manuals
                </Link>
              </>
            )}
            {user && user.userType === 'student' && (
              <Link to="/student/dashboard" className="text-slate-700 hover:text-cyan-600 font-medium transition-colors flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                My Learning
              </Link>
            )}
            {user && user.userType === 'instructor' && (
              <Link to="/instructor/dashboard" className="text-slate-700 hover:text-cyan-600 font-medium transition-colors flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Instructor Dashboard
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {user?.userType !== 'instructor' && (
              <button className="text-slate-700 hover:text-cyan-600 transition p-2 hover:bg-cyan-50 rounded-lg">
                <ShoppingCart className="w-5 h-5" />
              </button>
            )}
            {user ? (
              <>
                <Link to="/profile" className="text-slate-700 hover:text-cyan-600 transition p-2 hover:bg-cyan-50 rounded-lg">
                  <User className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="px-5 py-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-5 py-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition font-medium">
                  Login
                </Link>
                <Link to="/signup" className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
