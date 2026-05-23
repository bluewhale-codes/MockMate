
export const FormattedQuestions = (questions,correctAnswers,userAnswers) => {


const formattedQuestions = questions.map((q, index) => {

  // option labels
  const labels = ["A", "B", "C", "D"];

  // correct option index
  const correctIndex = correctAnswers[index];

  // user selected option index
  const userIndex = userAnswers[index];

  // create formatted options
  const formattedOptions = q.options.map((option, i) => ({
    label: labels[i],
    text: option,
    correct: i === correctIndex
  }));

  // convert index to option label
  const yourAns =
    userIndex !== undefined ? labels[userIndex] : "";

  const correctAns =
    correctIndex !== undefined ? labels[correctIndex] : "";

  // status
  let status = "Unanswered";

  if (userIndex !== undefined) {
    status =
      userIndex === correctIndex ? "Correct" : "Wrong";
  }

  return {
    no: index + 1,
    yourAns,
    correctAns,
    status,
    marks:
      status === "Correct"
        ? "+1.00"
        : status === "Wrong"
        ? "-0.25"
        : "0",
    marked: false,
    question: q.question,
    options: formattedOptions
  };
});






  return formattedQuestions;
  
}

