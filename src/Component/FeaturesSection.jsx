import { Target, BarChart3, Award, ShieldCheck } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Target,
      title: 'Exam-like Experience',
      description: 'Real-time mock tests just like the real exam.'
    },
    {
      icon: BarChart3,
      title: 'Instant Results',
      description: 'Get detailed analysis as soon as you finish.'
    },
    {
      icon: Award,
      title: 'Improve Performance',
      description: 'Identify weak areas and get better daily.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure & Reliable',
      description: 'Your data and tests are always safe.'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50/50 to-blue-50/50 rounded-2xl p-5 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 ${
                index < features.length - 1 ? 'lg:border-r border-purple-100' : ''
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#7B61FF] flex items-center justify-center mb-3 shadow-lg shadow-purple-200">
                <Icon size={20} className="text-white" />
              </div>

              <h4 className="text-base font-bold text-gray-900 mb-1.5">
                {feature.title}
              </h4>

              <p className="text-xs text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
