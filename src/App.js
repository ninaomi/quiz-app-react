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
  const handleTryAgain = () => {
    window.location.reload(); // Refreshes the page to restart
  };
  if (index === 5) return (<div style={{textAlign: 'center'}}>
    <Navigation />
    <p style={{  fontSize: '14px',color: '#888',marginBottom: '10px'}}>QUESTIONS COMPLETE</p>

    <div style={{ backgroundColor: '#4e42d4', color: 'white', padding: '30px', borderRadius: '12px', textAlign: 'center', maxWidth: '400px', margin: '20px auto', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', display:'flex',flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    
    <h2 style={{}}>You Scored {score} Out Of {index}</h2>

    <button style={{ padding: '10px 20px', backgroundColor: 'white', color: '#4e42d4', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={handleTryAgain}>
    Try Again <span style={{ transform: 'rotate(0deg)' }}>↻</span></button>

    </div>
  </div>);

  if (!questions?.[index]) return <div />;

  return (
    <div className="App">

      <Navigation />
      <p style={{  fontSize: '14px',color: '#888',marginBottom: '10px'}}>QUESTION {index+1} OF 5</p>
      
      <div
  style={{
    display: 'flex',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto'
  }}
>
  <h1 style={{ backgroundColor: '#4e42d4', color: 'white', padding: '20px', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' ,maxWidth: '500px',width: '100%',}}
      >
  {questions[index].question}
  </h1>

  {
      [questions[index].correct_answer, ...questions[index].incorrect_answers].sort().map((item)=>
        {

          return <button  style={{
            maxWidth: '550px',
            width: '100%',               // Full width for each button
            backgroundColor: '#f1f1f1',  // Light gray
            border: 'none',
            padding: '15px',
            margin: '10px 0',
            borderRadius: '8px',         // Rounded corners
            fontSize: '16px',
            transition: 'background-color 0.3s ease',  // Smooth hover transition
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#e0e0e0'; // Slightly darker gray on hover
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#f1f1f1'; // Revert to original color
          }}
          onMouseDown={(e) => {
            e.target.style.backgroundColor = '#d4d4d4'; // Even darker gray when clicked
          }}
          onMouseUp={(e) => {
            e.target.style.backgroundColor = '#e0e0e0'; // Revert after release
          }} onClick={() => shutup(item)} key={item}>{item}</button>

        })
      }

</div>

      
      
    
      
    </div>
  );
}

export default App;
