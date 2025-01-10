import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
    const response = await fetch(
      "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
    );
    const data = await response.json();
    setQuestions(data.results);
    setLoading(false);
  }

  function handleAnswerSelection(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function handleTryAgain() {
    window.location.reload();
  }

  if (loading)
    return (
      <div>
        <Navigation />
        <div className="loading">Loading...</div>
      </div>
    );

  if (currentQuestionIndex === 5) {
    return (
      <div className="result-container">
        <Navigation />
        <p className="result-text">QUESTIONS COMPLETE</p>
        <div className="result-card">
          <h2>You Scored {score} Out Of 5</h2>
          <button className="try-again-button" onClick={handleTryAgain}>
            Try Again ↻
          </button>
        </div>
      </div>
    );
  }

  if (!questions?.[currentQuestionIndex])
    return (
      <div>
        <Navigation />
        <div className="loading">Reload</div>
      </div>
    );

  return (
    <div className="App">
      <Navigation />
      <p className="question-counter">
        QUESTION {currentQuestionIndex + 1} OF 5
      </p>
      <div className="question-container">
        <h1 className="question-card">
          {" "}
          {questions[currentQuestionIndex].question}
        </h1>
        {[
          questions[currentQuestionIndex].correct_answer,
          ...questions[currentQuestionIndex].incorrect_answers,
        ]?.map((answer) => (
          <button
            className="answer-button"
            onClick={() => handleAnswerSelection(answer)}
            key={answer}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
