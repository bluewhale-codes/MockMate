import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      
      questions:[],
      duration:60,
      username:"vishal shakya",
      currentQuestion: 0,
      answers:{}


}

const saveMocktest = (
   questions,duration,username,currentQuestion,answers
) => {
    
    console.log("Enter save mock test");
    const mocktest = {
        questions:questions,
        duration:duration,
        name:username,
        currentQuestion:currentQuestion,
        answers:answers
    }
 
  // Save again
  localStorage.setItem(
    "mocktest",
    JSON.stringify(mocktest)
  );
};

const reloadMocktest = ()=>{
    try {
    const serializedState =
      localStorage.getItem("mocktest");

    if (!serializedState) return undefined;

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}



const mocktestSlice = createSlice({
     name:"MockTest",
     initialState,
     reducers:{
          setMockTest:(state,action)=>{
               const questions = action.payload.data
               const duration = action.payload.selectedDuration
               const name = action.payload.name
               const currentQuestion = action.payload.currentQuestion
               const answers = action.payload.answers
                state.questions = questions

                
                state.duration =  duration
                state.username = name
                state.currentQuestion = currentQuestion
                state.answers  = answers
               saveMocktest(questions,duration,name,currentQuestion,answers);
          },
          getMocktest:(state,action)=>{
                const data = reloadMocktest();
                state.questions = data.questions
                state.duration = data.duration
                state.username = data.name
                state.currentQuestion = data.currentQuestion
                state.answers = data.answers
          }
     }

})

export const {setMockTest,getMocktest} = mocktestSlice.actions
export default mocktestSlice.reducer