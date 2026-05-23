import { useState, useEffect } from 'react';
import {
  Maximize2, ChevronDown, Bookmark, ChevronLeft, ChevronRight,
  Send, Clock, Moon, Sun, Menu, X
} from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useDispatch } from 'react-redux';
import { setMockTest } from '../Store/slice/mocktestSlice';
import { useNavigate } from 'react-router';
import { FindCorrectOption } from './FindCorrectOption';

export default function CompactMockTest({
  questions = [],
  duration,
  userName = "Arjun Sharma",
  CurrentQuestion,
  Answers,
  examTitle = "MLT Mock Test - 01"
}) {
  const { theme, toggleTheme } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showNavigator, setShowNavigator] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const dispatch = useDispatch();
 const navigate = useNavigate()
 console.log(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  

  useEffect(()=>{
    setTimeLeft(duration * 60)
    setCurrentQuestion(CurrentQuestion);
    setAnswers(Answers);
  },[duration,CurrentQuestion,Answers]);



  const endMockTest = () => {
  alert("Do you want to End this Mock test");
  navigate("/score");
};

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return {
      hours: String(hrs).padStart(2, '0'),
      minutes: String(mins).padStart(2, '0'),
      seconds: String(secs).padStart(2, '0')
    };
  };

  const handleAnswer = (questionIndex, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const toggleMarkForReview = () => {
    setMarkedForReview(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion)) {
        newSet.delete(currentQuestion);
      } else {
        newSet.add(currentQuestion);
      }
      return newSet;
    });
  };

  const handleSubmit = () => {
    console.log('Test submitted!', { answers, markedForReview });
    alert('Test submitted successfully!');
    navigate("/score");
  };

  const getQuestionStatus = (index) => {
    if (answers[index] !== undefined) return 'answered';
    if (markedForReview.has(index)) return 'marked';
    return 'unanswered';
  };

  const stats = {
    total: questions.length,
    attempted: Object.keys(answers).length,
    marked: markedForReview.size,
    notAnswered: questions.length - Object.keys(answers).length,
    negativeMark: -0.25,
    positiveMark: 1.0
  };

  const time = formatTime(timeLeft);
  const currentQ = questions[currentQuestion] || {
    question: "Sample question text",
    options: ["Option A", "Option B", "Option C", "Option D"],
    type: "Single Correct"
  };

  useEffect(() => {

  const handleBeforeUnload = (e) => {

    e.preventDefault();

    e.returnValue =
      "Your mock test is still running!";
  };

  window.addEventListener(
    "beforeunload",
    handleBeforeUnload
  );

  return () => {

    window.removeEventListener(
      "beforeunload",
      handleBeforeUnload
    );
  };

}, []);
useEffect(() => {

  window.history.pushState(
    null,
    "",
    window.location.href
  );

  const handlePopState = () => {

    window.history.pushState(
      null,
      "",
      window.location.href
    );

    alert(
      "You cannot leave the test before ending it."
    );
  };

  window.addEventListener(
    "popstate",
    handlePopState
  );

  return () => {

    window.removeEventListener(
      "popstate",
      handlePopState
    );
  };

}, []);

  useEffect(() => {

  const savedTest =
    localStorage.getItem("mocktestState");

  if (savedTest) {

    const parsed = JSON.parse(savedTest);
    const data = parsed.questions
    const currentQuestion = parsed.currentQuestion
    const answers = parsed.answers
    const name = parsed.userName
    const selectedDuration = parsed.timeLeft/60
    

    dispatch(setMockTest({data,selectedDuration,name,currentQuestion,answers}))
    
    
  }

}, []);



  useEffect(() => {

  localStorage.setItem(
    "mocktestState",
    JSON.stringify({
      currentQuestion,
      answers,
      questions,
      userName,
      timeLeft,
      
    })
  );

}, [currentQuestion, answers, timeLeft]);





  return (
    <div className="min-h-screen theme-bg">
      {/* Navbar */}
      <nav className="theme-card border-b theme-border px-3 py-2 sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow-primary flex-shrink-0">
              <span className="text-white font-bold text-[10px] md:text-xs">PM</span>
            </div>
            <span className="theme-text font-bold text-sm md:text-base hidden sm:inline">PrepMaster</span>
            <div className="w-px h-4 md:h-5 theme-border-color hidden sm:block"></div>
            <span className="theme-text-secondary text-[10px] md:text-xs truncate">{examTitle}</span>
          </div>

          {/* Center - Timer */}
          <div className="theme-card-elevated border-2 border-primary rounded-lg px-2 md:px-4 py-1.5 md:py-2 shadow-glow-primary mx-2 flex-shrink-0">
            <p className="theme-text-secondary text-[9px] md:text-[10px] text-center mb-0.5 hidden sm:block">Time Left</p>
            <div className="flex items-center gap-1 md:gap-1.5 text-primary font-mono font-bold text-sm md:text-lg">
              <span>{time.hours}</span>
              <span className="theme-text-muted">:</span>
              <span>{time.minutes}</span>
              <span className="theme-text-muted">:</span>
              <span>{time.seconds}</span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="w-7 h-7 md:w-8 md:h-8 rounded-lg theme-card-hover flex items-center justify-center theme-border transition-colors"
            >
              {theme === 'dark' ? <Sun size={14} className="text-primary" /> : <Moon size={14} className="text-primary" />}
            </button>
            <button className="w-7 h-7 md:w-8 md:h-8 rounded-lg theme-card-hover flex items-center justify-center theme-border transition-colors hidden sm:flex">
              <Maximize2 size={14} className="theme-text-secondary" />
            </button>
            <div className="hidden md:flex items-center gap-2 theme-card px-2 py-1 rounded-lg theme-border">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                alt="Student"
                className="w-6 h-6 rounded-full ring-2 ring-primary"
              />
              <span className="theme-text text-xs font-medium">{userName}</span>
              <ChevronDown size={12} className="theme-text-secondary" />
            </div>
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="w-7 h-7 md:hidden rounded-lg theme-card-hover flex items-center justify-center theme-border transition-colors"
            >
              {showMobileMenu ? <X size={16} className="theme-text" /> : <Menu size={16} className="theme-text" />}
            </button>
            <button className="w-full cursor-pointer py-2.5 md:py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-red-500/50 transition-all text-xs md:text-sm mb-2" onClick={()=>endMockTest()}>
              End Test
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-2 pb-2 border-t theme-border pt-2">
            <div className="flex items-center gap-2 theme-card px-3 py-2 rounded-lg theme-border">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                alt="Student"
                className="w-8 h-8 rounded-full ring-2 ring-primary"
              />
              <div>
                <p className="theme-text text-sm font-medium">{userName}</p>
                <p className="theme-text-secondary text-xs">Student</p>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Stats Strip */}
      <div className="theme-border-color border-b px-2 md:px-3 py-2">
        <div className="max-w-[1400px] mx-auto grid grid-cols-3 sm:grid-cols-6 gap-1.5 md:gap-2 text-center">
          <div className="theme-card rounded-lg px-1.5 md:px-2 py-1.5 theme-border">
            <div className="theme-text-secondary text-[9px] md:text-[10px] leading-tight">Total</div>
            <div className="theme-text font-bold text-xs md:text-sm">{stats.total}</div>
          </div>
          <div className="theme-card rounded-lg px-1.5 md:px-2 py-1.5 border border-primary/30">
            <div className="theme-text-secondary text-[9px] md:text-[10px] leading-tight">Attempted</div>
            <div className="text-primary font-bold text-xs md:text-sm">{stats.attempted}</div>
          </div>
          <div className="theme-card rounded-lg px-1.5 md:px-2 py-1.5 border border-accent/30">
            <div className="theme-text-secondary text-[9px] md:text-[10px] leading-tight">Marked</div>
            <div className="text-accent font-bold text-xs md:text-sm">{stats.marked}</div>
          </div>
          <div className="theme-card rounded-lg px-1.5 md:px-2 py-1.5 theme-border">
            <div className="theme-text-secondary text-[9px] md:text-[10px] leading-tight">Unanswered</div>
            <div className="theme-text-secondary font-bold text-xs md:text-sm">{stats.notAnswered}</div>
          </div>
          <div className="theme-card rounded-lg px-1.5 md:px-2 py-1.5 border border-red-500/30">
            <div className="theme-text-secondary text-[9px] md:text-[10px] leading-tight">Negative</div>
            <div className="text-red-400 font-bold text-xs md:text-sm">{stats.negativeMark}</div>
          </div>
          <div className="theme-card rounded-lg px-1.5 md:px-2 py-1.5 border border-green-500/30">
            <div className="theme-text-secondary text-[9px] md:text-[10px] leading-tight">Positive</div>
            <div className="text-green-400 font-bold text-xs md:text-sm">+{stats.positiveMark}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto p-2 md:p-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Left Panel - Question */}
          <div className="lg:col-span-8">
            <div className="theme-card theme-border rounded-xl p-3 md:p-4">
              {/* Question Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 md:mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="theme-text font-bold text-xs md:text-sm">
                    Question {currentQuestion + 1} / {stats.total}
                  </span>
                  <span className="px-2 py-0.5 bg-accent/20 border border-accent text-accent rounded-full text-[9px] md:text-[10px] font-medium">
                    {currentQ.type}
                  </span>
                </div>
                <button
                  onClick={toggleMarkForReview}
                  className={`flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 rounded-lg border transition-all text-[10px] md:text-xs ${
                    markedForReview.has(currentQuestion)
                      ? 'bg-accent/20 border-accent text-accent'
                      : 'theme-card-hover theme-border theme-text-secondary'
                  }`}
                >
                  <Bookmark size={12} fill={markedForReview.has(currentQuestion) ? "#A78BFA" : "none"} />
                  <span>Mark for Review</span>
                </button>
              </div>

              {/* Question Text */}
              <div className="mb-4 md:mb-5">
                <p className="theme-text text-xs md:text-sm leading-relaxed">
                  {currentQ.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2 mb-4 md:mb-5">
                {currentQ.options.map((option, index) => {
                  const isSelected = answers[currentQuestion] === index;
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(currentQuestion, index)}
                      className={`w-full text-left p-2.5 md:p-3 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'bg-primary/10 border-primary shadow-glow-primary'
                          : 'theme-card-hover theme-border'
                      }`}
                    >
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'border-primary' : 'theme-border-color'
                        }`}>
                          {isSelected && <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-primary"></div>}
                        </div>
                        <span className={`font-medium text-[10px] md:text-xs flex-shrink-0 ${isSelected ? 'text-primary' : 'theme-text-secondary'}`}>
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <span className={`flex-1 text-xs md:text-sm ${isSelected ? 'theme-text' : 'theme-text-secondary'}`}>
                          {option}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-1 md:gap-1.5 px-3 md:px-4 py-2 theme-card-hover theme-border theme-text rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs md:text-sm"
                >
                  <ChevronLeft size={14} className="md:w-4 md:h-4" />
                  <span>Previous</span>
                </button>

                {/* Mobile Navigator Toggle */}
                <button
                  onClick={() => setShowNavigator(!showNavigator)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 theme-card-hover theme-border theme-text rounded-lg transition-all text-xs"
                >
                  <Menu size={14} />
                  <span>Questions</span>
                </button>

                <button
                  onClick={() => setCurrentQuestion(prev => Math.min(stats.total - 1, prev + 1))}
                  disabled={currentQuestion === stats.total - 1}
                  className="flex items-center gap-1 md:gap-1.5 px-3 md:px-4 py-2 bg-primary text-black font-bold rounded-lg hover:shadow-glow-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs md:text-sm"
                >
                  <span>Next</span>
                  <ChevronRight size={14} className="md:w-4 md:h-4" />
                </button>
              </div>
            </div>

            {/* Warning Panel */}
            <div className="mt-3 theme-card-elevated theme-border rounded-xl p-2.5 md:p-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                    <Clock size={14} className="text-primary flex-shrink-0" />
                    <p className="theme-text font-semibold text-[10px] md:text-xs">
                      Heads up! If your time runs out, your test will be auto-submitted.
                    </p>
                  </div>
                  <p className="theme-text-secondary text-[9px] md:text-[10px]">
                    Make sure to review your answers before time expires.
                  </p>
                </div>

                {/* Clock Illustration */}
                <svg width="50" height="50" viewBox="0 0 80 80" fill="none" className="ml-2 md:ml-3 hidden sm:block md:w-[60px] md:h-[60px]">
                  <circle cx="40" cy="40" r="20" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-primary"/>
                  <line x1="40" y1="40" x2="40" y2="27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary"/>
                  <line x1="40" y1="40" x2="50" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-accent"/>
                  <circle cx="40" cy="40" r="2.5" fill="currentColor" className="text-primary"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Question Navigator */}
          <div className={`lg:col-span-4 ${showNavigator ? 'fixed inset-0 z-50 lg:relative p-4 theme-bg' : 'hidden lg:block'}`}>
            <div className="theme-card theme-border rounded-xl p-3 md:p-4 lg:sticky lg:top-20 max-h-screen lg:max-h-[calc(100vh-5rem)] overflow-y-auto custom-scrollbar">
              {/* Mobile Close Button */}
              <button
                onClick={() => setShowNavigator(false)}
                className="lg:hidden absolute top-3 right-3 w-8 h-8 rounded-lg theme-card-hover flex items-center justify-center theme-border"
              >
                <X size={16} className="theme-text" />
              </button>
              <h3 className="theme-text font-bold mb-3 text-xs md:text-sm">Question Navigator</h3>

              {/* Legend */}
              <div className="grid grid-cols-3 gap-1.5 mb-3 text-[9px] md:text-[10px]">
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded bg-primary flex-shrink-0"></div>
                  <span className="theme-text-secondary truncate">Answered</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded bg-accent flex-shrink-0"></div>
                  <span className="theme-text-secondary truncate">Marked</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded theme-border flex-shrink-0"></div>
                  <span className="theme-text-secondary truncate">Unanswered</span>
                </div>
              </div>

              {/* Question Grid */}
              <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-5 gap-1.5 mb-3 max-h-[350px] lg:max-h-[300px] overflow-y-auto custom-scrollbar">
                {questions.map((_, index) => {
                  const status = getQuestionStatus(index);
                  const isCurrent = index === currentQuestion;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentQuestion(index);
                        setShowNavigator(false);
                      }}
                      className={`aspect-square rounded-lg font-bold text-[10px] md:text-xs transition-all min-h-[40px] ${
                        isCurrent
                          ? 'ring-2 ring-primary ring-offset-2 theme-ring-offset'
                          : ''
                      } ${
                        status === 'answered'
                          ? 'bg-primary text-black hover:shadow-glow-primary'
                          : status === 'marked'
                          ? 'bg-accent text-white hover:shadow-glow-accent'
                          : 'theme-card-hover theme-border theme-text-secondary'
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              {/* Review Button */}
              <button className="w-full py-2 theme-card-hover border-2 border-accent text-accent rounded-lg font-bold hover:bg-accent/10 transition-all text-[10px] md:text-xs mb-3">
                Review Marked ({stats.marked})
              </button>

              {/* Submit Section */}
              <div className="theme-card-elevated border-2 border-red-500/50 rounded-lg p-2.5 md:p-3">
                <button
                  onClick={() => {
                    setShowSubmitModal(true);
                    setShowNavigator(false);
                  }}
                  className="w-full py-2.5 md:py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-red-500/50 transition-all text-xs md:text-sm mb-2"
                >
                  <Send size={14} />
                  Submit Test
                </button>
                <p className="theme-text-secondary text-[9px] md:text-[10px] text-center">
                  Auto-submit in {time.hours}:{time.minutes}:{time.seconds}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="theme-card theme-border rounded-xl p-4 md:p-6 max-w-md w-full shadow-2xl">
            <h3 className="theme-text font-bold text-lg md:text-xl mb-2 md:mb-3">Submit Test?</h3>
            <p className="theme-text-secondary mb-4 md:mb-5 text-xs md:text-sm">
              Are you sure you want to submit your test? You cannot change your answers after submission.
            </p>
            <div className="flex gap-2 md:gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2 md:py-2.5 theme-card-hover theme-border theme-text rounded-lg transition-all text-xs md:text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-2 md:py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all text-xs md:text-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
