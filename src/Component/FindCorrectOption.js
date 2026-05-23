

export const FindCorrectOption = (userAnswers,correctAnswers ) =>{

        let correctCount = 0;
        let wrongCount = 0;

        for (let questionIndex in userAnswers) {

        // user selected option index
        const userAnswer = userAnswers[questionIndex];

        // correct option index
        const correctAnswer = correctAnswers[questionIndex];

        if (userAnswer === correctAnswer) {
            correctCount++;
        } else {
            wrongCount++;
        }
        }

        const score = {
            correctCount,
            wrongCount
        }

        return score;


}