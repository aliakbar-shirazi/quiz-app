const formatData = (questionData) => {
  const result = questionData.map((data) => {
    const questionObject = { question: data.question };
    const answers = [...data.incorrect_answers];
    const correctAnswerIndex = Math.floor(Math.random() * 4);
    answers.splice(correctAnswerIndex, 0, data.correct_answer);
    questionObject.answers = answers;
    questionObject.correctAnswerIndex = correctAnswerIndex;
    return questionObject;
  });
  return result;
};

export default formatData;
