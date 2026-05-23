import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FindCorrectOption } from "./FindCorrectOption";
import { useDispatch ,useSelector} from "react-redux";
import { FormattedQuestions } from "./FormattedQuestion";
import { getMocktest } from "../Store/slice/mocktestSlice";
import {
  Trophy,
  ArrowLeft,
  Lightbulb,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Target,
  Eye,
  RotateCcw,
  Award,
  BookOpen,
  BarChart3,
  Timer,
  Star,
  AlertCircle,
  ArrowRight,
  Minimize2,
  Maximize2,
} from "lucide-react";



  

const ScoreCard = () => {
  const heroRef = useRef(null);
  const cardsRef = useRef([]);
  const tableRef = useRef(null);
  const ctaRef = useRef(null);
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [isCompact, setIsCompact] = useState(false);

  const [correctCount,setCorrectCount] = useState(0);
  const [wrongCount,setWrongCount] = useState(0);
  const [totalMarks,setTotalMarks] = useState(0);
  const [attempted,setAttempted] = useState(0);
  const [formattedQuestions , setFormattedQuestion] = useState([]);
  
  const dispatch = useDispatch();
  
  console.log(1);
 

  console.log(2)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 20, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.4)",
          delay: 0.2,
        }
      );
      gsap.fromTo(
        tableRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.5 }
      );
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.7 }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(()=>{
      const savedTest = localStorage.getItem("mocktestState");
      const cAnswers = localStorage.getItem("mocktest")
      if (savedTest && cAnswers) {
        const parsed = JSON.parse(savedTest);
        const questions = parsed.questions;

        const correctAnswers = JSON.parse(cAnswers).correctAnswer;
        const userAnswers = parsed.answers;
        
        const score = FindCorrectOption(userAnswers,correctAnswers);

        const total = score.correctCount * 1;
        const Qattempted = score.correctCount + score.wrongCount;
        const myquestions = FormattedQuestions(questions,correctAnswers,userAnswers);
        setFormattedQuestion(myquestions);
        setCorrectCount(score.correctCount);
        setWrongCount(score.wrongCount);
        setTotalMarks(total);
        setAttempted(Qattempted);
        

      }
  },[])

  const stats = [
    { title: "Total Questions", value:formattedQuestions.length, color: "cyan", icon: BookOpen },
    { title: "Attempted", value: attempted, color: "purple", icon: Target },
    { title: "Marked Review", value: "3", color: "yellow", icon: Star },
    { title: "Correct", value: correctCount, color: "green", icon: CheckCircle2 },
    { title: "Wrong", value: wrongCount, color: "red", icon: XCircle },
    { title: "Total Marks", value: totalMarks, color: "gold", icon: Award },
    { title: "Time Taken", value: "00:59:58", color: "blue", icon: Timer },
  ];


   

//   const questions = [
//     {
//       no: 1,
//       yourAns: "A",
//       correctAns: "A",
//       status: "Correct",
//       marks: "+1.00",
//       marked: false,
//       question: "What is the primary function of the mitochondria in a cell?",
//       options: [
//         { label: "A", text: "Energy production through cellular respiration", correct: true },
//         { label: "B", text: "Protein synthesis and folding", correct: false },
//         { label: "C", text: "Storage of genetic information", correct: false },
//         { label: "D", text: "Cell division and replication", correct: false },
//       ],
//       explanation: "Mitochondria are known as the 'powerhouse of the cell' because they generate ATP through cellular respiration, which is the cell's main energy currency.",
//     },
//     {
//       no: 2,
//       yourAns: "B",
//       correctAns: "C",
//       status: "Wrong",
//       marks: "-0.25",
//       marked: false,
//       question: "Which gas is most abundant in Earth's atmosphere?",
//       options: [
//         { label: "A", text: "Oxygen", correct: false },
//         { label: "B", text: "Carbon Dioxide", correct: false },
//         { label: "C", text: "Nitrogen", correct: true },
//         { label: "D", text: "Hydrogen", correct: false },
//       ],
//       explanation: "Nitrogen makes up approximately 78% of Earth's atmosphere, while oxygen is about 21%. Carbon dioxide and other gases make up the remaining 1%.",
//     },
//     {
//       no: 3,
//       yourAns: "C",
//       correctAns: "C",
//       status: "Correct",
//       marks: "+1.00",
//       marked: false,
//       question: "In which year did India gain independence from British rule?",
//       options: [
//         { label: "A", text: "1945", correct: false },
//         { label: "B", text: "1946", correct: false },
//         { label: "C", text: "1947", correct: true },
//         { label: "D", text: "1950", correct: false },
//       ],
//       explanation: "India gained independence on August 15, 1947, after a long freedom struggle led by figures like Mahatma Gandhi, Jawaharlal Nehru, and Sardar Patel.",
//     },
//     {
//       no: 4,
//       yourAns: "D",
//       correctAns: "D",
//       status: "Correct",
//       marks: "+1.00",
//       marked: true,
//       question: "What is the chemical formula for water?",
//       options: [
//         { label: "A", text: "CO₂", correct: false },
//         { label: "B", text: "NaCl", correct: false },
//         { label: "C", text: "H₂O₂", correct: false },
//         { label: "D", text: "H₂O", correct: true },
//       ],
//       explanation: "Water consists of two hydrogen atoms bonded to one oxygen atom, giving it the chemical formula H₂O. It is essential for all known forms of life.",
//     },
//     {
//       no: 5,
//       yourAns: null,
//       correctAns: "B",
//       status: "Unanswered",
//       marks: "0.00",
//       marked: false,
//       question: "Who wrote the Indian national anthem 'Jana Gana Mana'?",
//       options: [
//         { label: "A", text: "Bankim Chandra Chattopadhyay", correct: false },
//         { label: "B", text: "Rabindranath Tagore", correct: true },
//         { label: "C", text: "Sarojini Naidu", correct: false },
//         { label: "D", text: "Muhammad Iqbal", correct: false },
//       ],
//       explanation: "Rabindranath Tagore wrote 'Jana Gana Mana' in 1911. It was adopted as the national anthem of India on January 24, 1950. Tagore was the first non-European to win the Nobel Prize in Literature.",
//     },
//     {
//       no: 6,
//       yourAns: "A",
//       correctAns: "A",
//       status: "Correct",
//       marks: "+1.00",
//       marked: false,
//       question: "What is the speed of light in vacuum?",
//       options: [
//         { label: "A", text: "3 × 10⁸ m/s", correct: true },
//         { label: "B", text: "3 × 10⁶ m/s", correct: false },
//         { label: "C", text: "3 × 10¹⁰ m/s", correct: false },
//         { label: "D", text: "3 × 10⁴ m/s", correct: false },
//       ],
//       explanation: "The speed of light in vacuum is approximately 299,792,458 meters per second, commonly rounded to 3 × 10⁸ m/s. This is a fundamental constant in physics.",
//     },
//     {
//       no: 7,
//       yourAns: "C",
//       correctAns: "D",
//       status: "Wrong",
//       marks: "-0.25",
//       marked: true,
//       question: "Which planet is known as the Red Planet?",
//       options: [
//         { label: "A", text: "Venus", correct: false },
//         { label: "B", text: "Jupiter", correct: false },
//         { label: "C", text: "Saturn", correct: false },
//         { label: "D", text: "Mars", correct: true },
//       ],
//       explanation: "Mars is called the Red Planet due to iron oxide (rust) on its surface, which gives it a reddish appearance. It is the fourth planet from the Sun.",
//     },
//     {
//       no: 8,
//       yourAns: "B",
//       correctAns: "B",
//       status: "Correct",
//       marks: "+1.00",
//       marked: false,
//       question: "What is the largest organ in the human body?",
//       options: [
//         { label: "A", text: "Liver", correct: false },
//         { label: "B", text: "Skin", correct: true },
//         { label: "C", text: "Heart", correct: false },
//         { label: "D", text: "Brain", correct: false },
//       ],
//       explanation: "The skin is the largest organ of the human body, covering approximately 2 square meters in adults. It protects the body, regulates temperature, and provides sensation.",
//     },
//     {
//       no: 9,
//       yourAns: "C",
//       correctAns: "C",
//       status: "Correct",
//       marks: "+1.00",
//       marked: false,
//       question: "Which element has the atomic number 1?",
//       options: [
//         { label: "A", text: "Helium", correct: false },
//         { label: "B", text: "Lithium", correct: false },
//         { label: "C", text: "Hydrogen", correct: true },
//         { label: "D", text: "Carbon", correct: false },
//       ],
//       explanation: "Hydrogen is the lightest and most abundant element in the universe. It has an atomic number of 1, meaning it has one proton in its nucleus.",
//     },
//     {
//       no: 10,
//       yourAns: "A",
//       correctAns: "D",
//       status: "Wrong",
//       marks: "-0.25",
//       marked: false,
//       question: "What is the capital of Australia?",
//       options: [
//         { label: "A", text: "Sydney", correct: false },
//         { label: "B", text: "Melbourne", correct: false },
//         { label: "C", text: "Brisbane", correct: false },
//         { label: "D", text: "Canberra", correct: true },
//       ],
//       explanation: "Canberra is the capital city of Australia, chosen as a compromise between rivals Sydney and Melbourne in 1908. It is located in the Australian Capital Territory.",
//     },
//   ];



  const getColorClass = (color) => {
    const colors = {
      cyan: "text-cyan-400 border-cyan-400/30 shadow-cyan-400/20 hover:shadow-cyan-400/40",
      purple: "text-purple-400 border-purple-400/30 shadow-purple-400/20 hover:shadow-purple-400/40",
      yellow: "text-yellow-400 border-yellow-400/30 shadow-yellow-400/20 hover:shadow-yellow-400/40",
      green: "text-green-400 border-green-400/30 shadow-green-400/20 hover:shadow-green-400/40",
      red: "text-red-400 border-red-400/30 shadow-red-400/20 hover:shadow-red-400/40",
      gold: "text-amber-400 border-amber-400/30 shadow-amber-400/20 hover:shadow-amber-400/40",
      blue: "text-blue-400 border-blue-400/30 shadow-blue-400/20 hover:shadow-blue-400/40",
    };
    return colors[color] || colors.cyan;
  };

  const getGlowColor = (color) => {
    const glows = {
      cyan: "shadow-[0_0_15px_rgba(34,211,238,0.12)]",
      purple: "shadow-[0_0_15px_rgba(192,132,252,0.12)]",
      yellow: "shadow-[0_0_15px_rgba(250,204,21,0.12)]",
      green: "shadow-[0_0_15px_rgba(74,222,128,0.12)]",
      red: "shadow-[0_0_15px_rgba(248,113,113,0.12)]",
      gold: "shadow-[0_0_15px_rgba(251,191,36,0.12)]",
      blue: "shadow-[0_0_15px_rgba(96,165,250,0.12)]",
    };
    return glows[color] || glows.cyan;
  };

  const getStatusColor = (status) => {
    if (status === "Correct") return "text-green-400";
    if (status === "Wrong") return "text-red-400";
    return "text-gray-400";
  };

  const getStatusBg = (status) => {
    if (status === "Correct") return "bg-green-400/10 border-green-400/20";
    if (status === "Wrong") return "bg-red-400/10 border-red-400/20";
    return "bg-gray-400/10 border-gray-400/20";
  };

  const getStatusDot = (status) => {
    if (status === "Correct") return "bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.5)]";
    if (status === "Wrong") return "bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.5)]";
    return "bg-gray-500";
  };

  const getStatusBadge = (status) => {
    if (status === "Correct")
      return "bg-green-500/15 text-green-400 border-green-400/20";
    if (status === "Wrong")
      return "bg-red-500/15 text-red-400 border-red-400/20";
    return "bg-gray-500/15 text-gray-400 border-gray-400/20";
  };

  const toggleExpand = (qNo) => {
    setExpandedQuestion(expandedQuestion === qNo ? null : qNo);
  };

  const displayedQuestions = showAllQuestions ? formattedQuestions : formattedQuestions.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-['Inter',sans-serif] overflow-x-hidden">
      {/* Background Grid */}
      <div
        className="fixed inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(34,211,238,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.15) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Ambient Glow */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 gap-3 sm:gap-0 border-b border-white/5 bg-[#0a0e1a]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_12px_rgba(34,211,238,0.3)] shrink-0">
            <span className="text-white font-bold text-xs sm:text-sm">PM</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-wide text-white leading-tight">PrepMaster</span>
            <span className="text-[10px] sm:text-xs text-cyan-400/80">MLT Mock Test - 01</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all duration-300 text-xs sm:text-sm font-medium w-full sm:w-auto justify-center">
          <ArrowLeft size={14} />
          <span>Back to Dashboard</span>
        </button>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8">
        
        {/* Hero Card */}
        <div
          ref={heroRef}
          className="relative rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.9) 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-8">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.25)] shrink-0">
                <Trophy size={28} className="text-white sm:hidden" />
                <Trophy size={36} className="text-white hidden sm:block lg:hidden" />
                <Trophy size={44} className="text-white hidden lg:block" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-0.5 sm:mb-1">Test Completed!</h1>
                <p className="text-sm sm:text-base text-gray-300">
                  Great job, <span className="text-cyan-400 font-semibold">vishal shakya</span>! 🎉
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">You have completed the test.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 w-full lg:w-auto justify-between lg:justify-end">
              <div className="text-left lg:text-right">
                <p className="text-xs sm:text-sm text-gray-400 mb-0.5">Your Score</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  {correctCount} <span className="text-sm sm:text-lg text-gray-500">/ {formattedQuestions.length}</span>
                </p>
              </div>
              <div className="hidden sm:block h-12 lg:h-16 w-px bg-white/10" />
              <div className="text-center">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
                  70.00%
                </p>
                <span className="inline-block mt-1.5 sm:mt-2 px-3 py-0.5 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-semibold bg-green-500/20 text-green-400 border border-green-400/30 shadow-[0_0_8px_rgba(74,222,128,0.15)]">
                  Good Performance
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-0.5 sm:w-1 h-5 sm:h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
              Performance Summary
            </h2>
            <button
              onClick={() => setIsCompact(!isCompact)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all text-xs"
            >
              {isCompact ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
              <span className="hidden sm:inline">{isCompact ? "Expand" : "Compact"}</span>
            </button>
          </div>

          <div className={`grid gap-2 sm:gap-3 lg:gap-4 ${isCompact ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-7' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7'}`}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.title}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className={`relative rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/5 bg-white/[0.03] backdrop-blur-sm
                    hover:scale-[1.02] hover:bg-white/[0.05] transition-all duration-300 cursor-pointer
                    ${getGlowColor(stat.color)}`}
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center mb-2 sm:mb-3 ${getColorClass(stat.color)}`}>
                    <Icon size={isCompact ? 14 : 16} className={getColorClass(stat.color).split(" ")[0]} />
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-400 mb-0.5 sm:mb-1 leading-tight">{stat.title}</p>
                  <p className={`text-base sm:text-lg lg:text-xl font-bold ${getColorClass(stat.color).split(" ")[0]}`}>
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Question Review */}
        <div ref={tableRef}>
          <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
            <span className="w-0.5 sm:w-1 h-5 sm:h-6 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full" />
            Question Review
          </h2>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 mb-3 sm:mb-4 px-1">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.5)]" />
              <span className="text-xs text-gray-400">Correct</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.5)]" />
              <span className="text-xs text-gray-400">Wrong</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(192,132,252,0.5)]" />
              <span className="text-xs text-gray-400">Marked</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-400" />
              <span className="text-xs text-gray-400">Unanswered</span>
            </div>
          </div>

          {/* Question Cards */}
          <div className="space-y-2 sm:space-y-3">
            {displayedQuestions.map((q) => (
              <div
                key={q.no}
                className={`rounded-lg sm:rounded-xl border overflow-hidden transition-all duration-300 ${getStatusBg(q.status)}`}
              >
                {/* Question Header */}
                <div
                  className="p-3 sm:p-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  onClick={() => toggleExpand(q.no)}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 mt-0.5">
                      <span className="text-xs sm:text-sm font-bold text-gray-400">Q{q.no}</span>
                      <div className={`w-2 h-2 rounded-full ${getStatusDot(q.status)}`} />
                      {q.marked && <Bookmark size={12} className="text-purple-400 fill-purple-400/30" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base text-white font-medium leading-snug">{q.question}</p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold border ${getStatusBadge(q.status)}`}>
                        {q.status}
                      </span>
                      <span className={`text-xs sm:text-sm font-semibold ${q.marks.startsWith("+") ? "text-green-400" : q.marks.startsWith("-") ? "text-red-400" : "text-gray-400"}`}>
                        {q.marks}
                      </span>
                      {expandedQuestion === q.no ? (
                        <ChevronUp size={16} className="text-gray-500" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Question Details */}
                {expandedQuestion === q.no && (
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-1 border-t border-white/5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {q.options.map((opt) => {
                        const isYourAnswer = q.yourAns === opt.label;
                        const isCorrect = opt.correct;
                        const isWrong = isYourAnswer && !isCorrect;
                        
                        return (
                          <div
                            key={opt.label}
                            className={`flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg border text-sm transition-all ${
                              isCorrect
                                ? "border-green-400/30 bg-green-400/5"
                                : isWrong
                                ? "border-red-400/30 bg-red-400/5"
                                : isYourAnswer && q.status !== "Unanswered"
                                ? "border-cyan-400/20 bg-cyan-400/5"
                                : "border-white/5 bg-white/[0.02]"
                            }`}
                          >
                            <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 ${
                              isCorrect
                                ? "bg-green-400/20 text-green-400"
                                : isWrong
                                ? "bg-red-400/20 text-red-400"
                                : isYourAnswer && q.status !== "Unanswered"
                                ? "bg-cyan-400/20 text-cyan-400"
                                : "bg-white/5 text-gray-400"
                            }`}>
                              {opt.label}
                            </span>
                            <span className={`text-xs sm:text-sm ${
                              isCorrect ? "text-green-300" : isWrong ? "text-red-300" : "text-gray-300"
                            }`}>
                              {opt.text}
                            </span>
                            {isCorrect && (
                              <CheckCircle2 size={14} className="text-green-400 ml-auto shrink-0" />
                            )}
                            {isWrong && (
                              <XCircle size={14} className="text-red-400 ml-auto shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 rounded-lg bg-amber-400/5 border border-amber-400/10">
                      <div className="flex items-start gap-2">
                        <Lightbulb size={14} className="text-amber-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-amber-400 mb-1">Explanation</p>
                          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{q.explanation}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 sm:mt-3 flex items-center gap-3 sm:gap-4 text-xs text-gray-500">
                      <span>Your Answer: <span className={q.status === "Correct" ? "text-green-400" : q.status === "Wrong" ? "text-red-400" : "text-gray-400"}>{q.yourAns || "—"}</span></span>
                      <span>Correct: <span className="text-green-400">{q.correctAns}</span></span>
                      <span>Marks: <span className={q.marks.startsWith("+") ? "text-green-400" : q.marks.startsWith("-") ? "text-red-400" : "text-gray-400"}>{q.marks}</span></span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* View More Button */}
          {!showAllQuestions && formattedQuestions.length > 4 && (
            <div className="mt-4 sm:mt-6 flex justify-center">
              <button
                onClick={() => setShowAllQuestions(true)}
                className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 text-xs sm:text-sm font-medium"
              >
                <Eye size={14} />
                View More Questions
                <span className="text-[10px] bg-cyan-400/10 px-1.5 py-0.5 rounded text-cyan-400/70">+{formattedQuestions.length - 4}</span>
              </button>
            </div>
          )}

          {showAllQuestions && (
            <div className="mt-4 sm:mt-6 flex justify-center">
              <button
                onClick={() => {
                  setShowAllQuestions(false);
                  setExpandedQuestion(null);
                }}
                className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-300 text-xs sm:text-sm font-medium"
              >
                <Minimize2 size={14} />
                Show Less
              </button>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-xl p-4 sm:p-6 border border-white/5 gap-4 sm:gap-0"
          style={{
            background: "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,41,59,0.7) 100%)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
          }}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.2)] shrink-0">
              <Lightbulb size={20} className="text-white sm:hidden" />
              <Lightbulb size={24} className="text-white hidden sm:block" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-bold text-white">Keep it up!</p>
              <p className="text-xs sm:text-sm text-gray-400">Analyze your mistakes and try again to improve your score.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all duration-300 font-medium text-xs sm:text-sm">
              <Eye size={14} />
              View Solutions
            </button>
            <button
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(236,72,153,0.35)] hover:scale-105"
              style={{ background: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)" }}
            >
              <RotateCcw size={14} />
              Retake Test
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScoreCard