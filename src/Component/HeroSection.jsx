export default function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 mb-4">
      <div className="flex items-center justify-between">
        {/* Left side: Welcome text */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back,
            <br />
            <span className="bg-gradient-to-r from-[#6C63FF] to-[#7B61FF] bg-clip-text text-transparent">
              Rahul Sharma
            </span>{' '}
            <span className="inline-block animate-wave">👋</span>
          </h2>
          <p className="text-sm text-gray-600">
            Upload your PDF, choose duration and start your mock test now.
          </p>
        </div>

        {/* Right side: Illustration */}
        <div className="relative">
          {/* Background blob */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-200/40 to-blue-200/40 rounded-full blur-3xl transform scale-110"></div>

          {/* Illustration SVG */}
          <svg width="200" height="200" viewBox="0 0 280 280" fill="none" className="relative z-10">
            {/* Clipboard */}
            <rect x="80" y="40" width="120" height="160" rx="8" fill="#E9E7FC" stroke="#6C63FF" strokeWidth="3"/>
            <rect x="90" y="30" width="100" height="20" rx="6" fill="#6C63FF"/>
            <circle cx="140" cy="40" r="4" fill="white"/>

            {/* Checklist items */}
            <g>
              <circle cx="100" cy="70" r="6" fill="#6C63FF"/>
              <path d="M97 70l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="115" y1="70" x2="170" y2="70" stroke="#6C63FF" strokeWidth="3" strokeLinecap="round"/>
            </g>

            <g>
              <circle cx="100" cy="95" r="6" fill="#6C63FF"/>
              <path d="M97 95l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="115" y1="95" x2="160" y2="95" stroke="#6C63FF" strokeWidth="3" strokeLinecap="round"/>
            </g>

            <g>
              <circle cx="100" cy="120" r="6" fill="#D1CFFA"/>
              <line x1="115" y1="120" x2="175" y2="120" stroke="#D1CFFA" strokeWidth="3" strokeLinecap="round"/>
            </g>

            <g>
              <circle cx="100" cy="145" r="6" fill="#D1CFFA"/>
              <line x1="115" y1="145" x2="165" y2="145" stroke="#D1CFFA" strokeWidth="3" strokeLinecap="round"/>
            </g>

            {/* Stopwatch */}
            <g transform="translate(190, 80)">
              <circle cx="30" cy="35" r="28" fill="white" stroke="#6C63FF" strokeWidth="3"/>
              <rect x="26" y="10" width="8" height="8" rx="2" fill="#6C63FF"/>
              <line x1="30" y1="35" x2="30" y2="20" stroke="#6C63FF" strokeWidth="3" strokeLinecap="round"/>
              <line x1="30" y1="35" x2="40" y2="35" stroke="#7B61FF" strokeWidth="3" strokeLinecap="round"/>
            </g>

            {/* Plant pot */}
            <g transform="translate(30, 150)">
              <path d="M20 50 L10 70 L50 70 L40 50 Z" fill="#E9E7FC" stroke="#6C63FF" strokeWidth="2"/>
              <ellipse cx="30" cy="50" rx="15" ry="5" fill="#6C63FF"/>

              {/* Leaves */}
              <path d="M30 50 Q20 35, 18 25 Q20 30, 30 40" fill="#7B61FF"/>
              <path d="M30 50 Q40 30, 42 20 Q40 25, 30 38" fill="#6C63FF"/>
              <path d="M30 50 Q25 35, 28 22 Q28 30, 30 42" fill="#8B7FFF"/>
            </g>

            {/* Decorative elements */}
            <circle cx="50" cy="50" r="4" fill="#6C63FF" opacity="0.3"/>
            <circle cx="230" cy="190" r="6" fill="#7B61FF" opacity="0.3"/>
            <circle cx="60" cy="220" r="3" fill="#6C63FF" opacity="0.4"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
