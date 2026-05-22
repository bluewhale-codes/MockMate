import { Upload, Clock, Play, Shield, Check } from 'lucide-react';
import { useRef } from 'react';
import { useState } from 'react';
import { setMockTest } from '../Store/slice/mocktestSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Spinner from './Spinner';




export default function UploadTestCard() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [file,setFile] = useState(null);
  
  const [loading,setLoading] = useState(false);
  const [questionsReady,setQuestionsReady] = useState(false);
  const [error,setErrors] = useState();
  const [name,setName] = useState("Vishal shakya")

  const fileInputRef = useRef(null)

  const [questions,setQuestions] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [isDragging, setIsDragging] = useState(false);
  const [text,setText] = useState("")
  const durations = [15, 30, 45, 60, 90, 120];
  const answers = {}
  const currentQuestion =0

  const prompt = `
Convert this MCQ text into JSON array.
`;


  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleIconClick = () => {

    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {

    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const handlePDF = async (e) => {

       if (!file) {
      alert("Please select PDF");
      return;
    }

    const data = new FormData();
    data.append("pdf",file)

    console.log("start...");
    
    try {

           setLoading(true);
           setQuestionsReady(false);
            const url = "https://restapis-devfolio.onrender.com";
            const link = `${url}/mockmate/createQuestion`;
            const res = await axios.post(link,data,{withCredentials:true});

          
            if(res.data.success){
                setQuestionsReady(true);
                setQuestions(res.data.result.questions);
                const data = res.data.result.questions;
                dispatch(setMockTest({data,selectedDuration,name,currentQuestion,answers}))
            }else{
              setErrors("Failed to generate test")
            }
           
            
        }catch (error) {
                console.log(error);
                // setErrors(
                //   error.response?.data?.message ||
                //   "Something went wrong"
                // );
        }finally{
            setLoading(false);
        }
    
  };

  



  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-4">
      {
  error && (
            <div className="bg-red-100 text-red-600 p-3 rounded mt-4">
              {error}
            </div>
          )
        }

        {loading ? <Spinner/> : <>
          {/* Section 1: Upload PDF */}
      <div className="mb-6">
        {/* <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
            <Upload size={16} className="text-[#6C63FF]" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">1. Upload PDF</h3>
        </div> */}
         <div>
    

       <p>
    
       </p>
    </div>

        {/* Drag and drop area */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            isDragging
              ? 'border-[#6C63FF] bg-purple-50'
              : 'border-purple-200 bg-gradient-to-br from-purple-50/30 to-blue-50/30'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {loading ? "Preparing your Mock test" : <div className="flex flex-col items-center">
              <input onChange={handleFileChange} ref={fileInputRef} className='hidden' type="file" accept="application/pdf" onChange={(e)=>setFile(e.target.files[0])} />
      
     
            <div onClick={handleIconClick} className="cursor-pointer w-12 h-12 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#7B61FF] flex items-center justify-center mb-3 shadow-lg shadow-purple-200">
              <Upload size={20} className="text-white" />
            </div>

            <p className="text-base font-semibold text-gray-700 mb-1">
                {file ? file.name : "Choose Your File"}
            </p>

           

            <button onClick={handlePDF} className="cursor-pointer px-6 py-2 border-2 border-[#6C63FF] text-[#6C63FF] rounded-lg font-semibold hover:bg-purple-50 transition-all hover:shadow-md text-sm">
              Upload
            </button>
          </div>}
        </div>

        <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 4v5M8 11v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Only PDF files are supported
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>

      {/* Section 2: Choose Duration */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
            <Clock size={16} className="text-[#6C63FF]" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">2. Choose Duration</h3>
        </div>

        {/* Duration buttons */}
        <div className="flex flex-wrap gap-3 mb-3">
          {durations.map((duration) => (
            <button
              key={duration}
              onClick={() => setSelectedDuration(duration)}
              className={`relative px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                selectedDuration === duration
                  ? 'bg-gradient-to-r from-[#6C63FF] to-[#7B61FF] text-white shadow-lg shadow-purple-200'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {duration} min
              {selectedDuration === duration && (
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Check size={12} className="text-[#6C63FF]" />
                </div>
              )}
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Choose the time duration for your mock test.
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>

      {/* CTA Button */}
      <div>
        {questionsReady && <button onClick={()=>navigate("/mocktest")} className="w-full bg-gradient-to-r from-[#6C63FF] to-[#7B61FF] text-white py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2.5 shadow-xl shadow-purple-200 hover:shadow-2xl hover:shadow-purple-300 transition-all hover:scale-[1.02] active:scale-[0.98]">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <Play size={14} className="text-[#6C63FF] ml-0.5" fill="currentColor" />
          </div>
          Start Mock Test
        </button>}

        <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500">
          <Shield size={14} className="text-gray-400" />
          <span>Your test will begin in a secure environment</span>
        </div>
      </div>
        </>}
      
    </div>
  );
}
