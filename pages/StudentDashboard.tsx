import { Link } from 'react-router-dom';
import { Smartphone, PlayCircle, FileText, Clock, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Header } from '../components/Header';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

type CourseCard = {
  id: string;
  title: string;
  instructor: string;
  progress: number;
};

type NoteCard = {
  id: string;
  title: string;
  pages?: number;
  downloadDate?: string;
};

export function StudentDashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<CourseCard[]>([]);
  const [notes, setNotes] = useState<NoteCard[]>([]);
  const [progressData, setProgressData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('token');
      const headers: any = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

      try {
        // enrollments -> courses
        const enrollRes = await fetch(`${apiBase}/api/users/${user.id}/enrollments`, { headers });
        const enrollJson = await enrollRes.json().catch(() => ({}));
        const enrollments = enrollJson?.data || [];

        const parsedCourses: CourseCard[] = enrollments.map((en: any) => ({
          id: String(en.course?.id || en.courseId),
          title: en.course?.title || en.courseTitle || 'Untitled',
          instructor: en.course?.instructor ? `${en.course.instructor.firstName || ''} ${en.course.instructor.lastName || ''}`.trim() : 'Instructor',
          progress: en.progress ?? 0
        }));

        setCourses(parsedCourses);

        // purchases -> notes
        const purchaseRes = await fetch(`${apiBase}/api/users/${user.id}/purchases`, { headers });
        const purchaseJson = await purchaseRes.json().catch(() => ({}));
        const purchases = purchaseJson?.data || [];

        const notePurchases = purchases.filter((p: any) => p.itemType === 'note');

        // fetch note details for each purchased note
        const noteDetailsPromises = notePurchases.map((p: any) => fetch(`${apiBase}/api/notes/${p.itemId}`, { headers }).then(r => r.json().then(j => j?.data).catch(() => null)).catch(() => null));
        const noteDetails = await Promise.all(noteDetailsPromises);

        const parsedNotes: NoteCard[] = noteDetails.filter(Boolean).map((n: any) => ({
          id: String(n.id),
          title: n.title,
          pages: n.pages,
          downloadDate: n.createdAt ? new Date(n.createdAt).toLocaleDateString() : undefined
        }));

        setNotes(parsedNotes);

        // build simple progress data from course progresses
        const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
        const base = parsedCourses.length ? Math.max(...parsedCourses.map(c => c.progress)) : 0;
        setProgressData(days.map((d, i) => ({ name: d, hours: Math.round((base / 7) * (i + 1) * 10) / 10 })));
      } catch (err) {
        console.error('Failed loading dashboard data', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">Loading...</div>
      </div>
    );
  }

  const enrolledCount = courses.length;
  const completedCount = courses.filter(c => c.progress >= 100).length;
  const notesCount = notes.length;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-cyan-900 bg-clip-text text-transparent">Welcome back, {user?.firstName || user?.name || 'Student'}!</h1>
          <p className="text-slate-600 text-lg">Continue your mobile repair training journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg shadow-cyan-500/10 hover:shadow-xl hover:shadow-cyan-500/20 transition-all p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1 text-slate-900">{enrolledCount}</p>
            <p className="text-sm text-slate-600">Enrolled Courses</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg shadow-green-500/10 hover:shadow-xl hover:shadow-green-500/20 transition-all p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1 text-slate-900">{completedCount}</p>
            <p className="text-sm text-slate-600">Completed Courses</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 transition-all p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1 text-slate-900">{notesCount}</p>
            <p className="text-sm text-slate-600">Repair Guides</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg shadow-indigo-500/10 hover:shadow-xl hover:shadow-indigo-500/20 transition-all p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1 text-slate-900">{progressData.reduce((s, p) => s + (p.hours || 0), 0)}h</p>
            <p className="text-sm text-slate-600">This Week</p>
          </div>
        </div>

        {/* Learning Progress Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-slate-100">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Weekly Training Progress</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="hours" stroke="#0ea5e9" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* My Courses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-slate-900">My Repair Courses</h2>
            <Link to="/courses" className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all font-bold">Browse All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all overflow-hidden border border-slate-100">
                <div className="aspect-video bg-gradient-to-br from-cyan-100 to-blue-200 flex items-center justify-center">
                  <PlayCircle className="w-20 h-20 text-cyan-600" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 text-slate-900">{course.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{course.instructor}</p>
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-600 font-semibold">Progress</span>
                      <span className="text-cyan-600 font-bold">{course.progress}%</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <Link
                    to={`/learn/${course.id}`}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 font-bold text-center block transition-all"
                  >
                    Continue Learning
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Notes */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl">My Notes</h2>
            <Link to="/notes" className="text-blue-600 hover:text-blue-700">Browse All</Link>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {notes.map((note, index) => (
              <div
                key={note.id}
                  className={`p-6 flex items-center justify-between hover:bg-gray-50 ${
                    index !== notes.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="mb-1">{note.title}</h3>
                    <p className="text-sm text-gray-600">
                      {note.pages ?? '-'} pages{note.downloadDate ? ` • Downloaded ${note.downloadDate}` : ''}
                    </p>
                  </div>
                </div>
                <Link to={`/note/${note.id}`} className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
