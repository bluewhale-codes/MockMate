import { Home, FileText, History, ChevronDown } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-2.5 mb-4">
      <div className="flex items-center justify-between">
        {/* Left: Logo and tagline */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {/* Logo icon - book shape with gradient */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C63FF] to-[#7B61FF] flex items-center justify-center shadow-md">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 6v8M9 9l3 3 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
              </svg>
            </div>

            <div>
              <h1 className="text-base font-bold text-gray-900">MockMate</h1>
              <p className="text-[10px] text-gray-500">Practice Smarter, Perform Better</p>
            </div>
          </div>
        </div>

        {/* Center: Navigation items */}
        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-1.5 text-[#6C63FF] font-medium relative pb-0.5 text-sm">
            <Home size={16} />
            <span>Home</span>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6C63FF] to-[#7B61FF] rounded-full"></div>
          </a>

          <a href="#" className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm">
            <FileText size={16} />
            <span>My Tests</span>
          </a>

          <a href="#" className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm">
            <History size={16} />
            <span>History</span>
          </a>
        </div>

        {/* Right: User profile */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1.5 rounded-lg transition-colors">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
            alt="User profile"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-100"
          />
          <div className="text-right">
            <p className="text-xs font-semibold text-gray-900">Rahul Sharma</p>
            <p className="text-[10px] text-gray-500">Student</p>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </div>
    </nav>
  );
}
