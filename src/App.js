import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';

function App() {

  /*
    This is the main app function, we can write our logic here - for our quiz app we need to:

    1. Fetch the questions from the API url then store them in react useState (API url: https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple)

    2. Create a useState to store the current question number and another useState to store the users score.

    3. In the html display the current question and all of its answers.

    4. When an answer is clicked, run a function to check if the answer is correct, if its correct increment the score + also increment the current question number.

    5. Once the current question number is equal to the amount of questions (the user has answered them all), we should display the score.
  */

  const [questions, setQuestions] = useState([]);
 
  // questionNumber
  const [index, y] = useState(0);

  // score
  const [score, changescore] = useState(0);

  async function fetchQuestions()
  {
    const response = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple");
    const data = await response.json();
    setQuestions(data.results);
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  function shutup(lewis){
       if (lewis===questions[index].correct_answer) changescore(score + 1);

       y(index + 1);
  }

  if (index === 5) return (<div>
    <Navigation />
    <h1>Score: {score}</h1>
  </div>);

  if (!questions?.[index]) return <div />;

  return (
    <div className="App">

      <Navigation />

      <h1>
        {questions[index].question}
      </h1>

      {
      [questions[index].correct_answer, ...questions[index].incorrect_answers].sort().map((item)=>
        {

          return <button onClick={() => shutup(item)} key={item}>{item}</button>

        })
      }
      
    
      
    </div>
  );
}

export default App;
