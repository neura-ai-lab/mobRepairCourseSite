import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, PlayCircle, FileText, MessageSquare, Download, ChevronLeft, Menu, X } from 'lucide-react';

const courseContent = [
  {
    section: 'Introduction',
    lessons: [
      { id: '1', title: 'Welcome to the Course', duration: '5:30', completed: true },
      { id: '2', title: 'Course Resources', duration: '2:15', completed: true },
      { id: '3', title: 'How the Web Works', duration: '12:45', completed: false },
    ]
  },
  {
    section: 'HTML Fundamentals',
    lessons: [
      { id: '4', title: 'HTML Basics', duration: '15:20', completed: false },
      { id: '5', title: 'HTML Elements', duration: '18:45', completed: false },
      { id: '6', title: 'Forms and Inputs', duration: '22:30', completed: false },
    ]
  },
  {
    section: 'CSS Styling',
    lessons: [
      { id: '7', title: 'CSS Basics', duration: '16:40', completed: false },
      { id: '8', title: 'Flexbox Layout', duration: '25:15', completed: false },
      { id: '9', title: 'Grid System', duration: '28:20', completed: false },
    ]
  },
];

const notes = [
  { id: '1', title: 'Course Overview.pdf', size: '2.3 MB' },
  { id: '2', title: 'HTML Cheat Sheet.pdf', size: '1.8 MB' },
  { id: '3', title: 'CSS Reference Guide.pdf', size: '3.1 MB' },
];

const comments = [
  {
    author: 'Sarah Wilson',
    avatar: 'SW',
    time: '2 hours ago',
    comment: 'Great explanation! This really helped me understand the concept better.'
  },
  {
    author: 'Mike Johnson',
    avatar: 'MJ',
    time: '5 hours ago',
    comment: 'Could you provide more examples of real-world applications?'
  },
];

export function VideoPlayerPage() {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState<'notes' | 'comments' | 'downloads'>('notes');
  const [showPlaylist, setShowPlaylist] = useState(true);

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Top Nav */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/student/dashboard" className="text-gray-400 hover:text-white">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-blue-500" />
            <h1 className="text-white">Complete Web Development Bootcamp</h1>
          </div>
        </div>
        <button
          onClick={() => setShowPlaylist(!showPlaylist)}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          {showPlaylist ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Playlist Sidebar */}
        <aside
          className={`${
            showPlaylist ? 'block' : 'hidden'
          } lg:block w-full lg:w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto`}
        >
          <div className="p-4">
            <h2 className="text-white mb-4">Course Content</h2>
            <div className="space-y-2">
              {courseContent.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-4">
                  <h3 className="text-gray-400 text-sm mb-2 px-3">{section.section}</h3>
                  <div className="space-y-1">
                    {section.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        className={`w-full text-left px-3 py-3 rounded-lg flex items-center gap-3 ${
                          lesson.id === '2'
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {lesson.completed ? (
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        ) : (
                          <PlayCircle className="w-5 h-5 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">{lesson.title}</p>
                          <p className="text-xs text-gray-400">{lesson.duration}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Video Player */}
          <div className="bg-black aspect-video flex items-center justify-center">
            <div className="text-center">
              <PlayCircle className="w-20 h-20 text-white mb-4 mx-auto" />
              <p className="text-white">Course Resources</p>
            </div>
          </div>

          {/* Tabs and Content */}
          <div className="flex-1 bg-gray-800 overflow-hidden flex flex-col">
            {/* Tabs */}
            <div className="border-b border-gray-700 flex px-6">
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-6 py-3 border-b-2 ${
                  activeTab === 'notes'
                    ? 'border-blue-500 text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Notes
              </button>
              <button
                onClick={() => setActiveTab('comments')}
                className={`px-6 py-3 border-b-2 ${
                  activeTab === 'comments'
                    ? 'border-blue-500 text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Comments
              </button>
              <button
                onClick={() => setActiveTab('downloads')}
                className={`px-6 py-3 border-b-2 ${
                  activeTab === 'downloads'
                    ? 'border-blue-500 text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Downloads
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'notes' && (
                <div className="max-w-3xl">
                  <h3 className="text-white text-xl mb-4">Lesson Notes</h3>
                  <div className="bg-gray-700 rounded-lg p-6 text-gray-300">
                    <p className="mb-4">
                      Welcome to the course! In this lesson, we'll introduce you to the fundamentals of web development.
                    </p>
                    <h4 className="text-white mb-2">Key Points:</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Understanding the web development landscape</li>
                      <li>Tools and technologies you'll learn</li>
                      <li>Course structure and learning path</li>
                      <li>How to make the most of this course</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'comments' && (
                <div className="max-w-3xl">
                  <div className="mb-6">
                    <textarea
                      placeholder="Add a comment..."
                      className="w-full bg-gray-700 text-white rounded-lg p-4 outline-none resize-none"
                      rows={3}
                    ></textarea>
                    <button className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Post Comment
                    </button>
                  </div>
                  <div className="space-y-4">
                    {comments.map((comment, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                            {comment.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <p className="text-white">{comment.author}</p>
                              <span className="text-sm text-gray-400">{comment.time}</span>
                            </div>
                            <p className="text-gray-300">{comment.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'downloads' && (
                <div className="max-w-3xl">
                  <h3 className="text-white text-xl mb-4">Downloadable Resources</h3>
                  <div className="space-y-3">
                    {notes.map((note) => (
                      <div
                        key={note.id}
                        className="bg-gray-700 rounded-lg p-4 flex items-center justify-between hover:bg-gray-600"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-blue-500" />
                          <div>
                            <p className="text-white">{note.title}</p>
                            <p className="text-sm text-gray-400">{note.size}</p>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
