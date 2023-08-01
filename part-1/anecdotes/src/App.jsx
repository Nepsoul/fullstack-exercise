import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });
  // const randomShow=()=>{
  //  const randomIdx= Math.floor(Math.random()*anecdotes.length)
  //  setSelected(randomIdx)
  // }

  const randomShow = () => {
    const random = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    const randomIdx = random(0, 7);
    setSelected(randomIdx);
  };
  const copy = () => {
    let points = { ...votes };
    points[selected] += 1;
    setVote(points);
  };

  let changeObj = Object.keys(votes).map((key) => votes[key]); //object change into array, to show max vote
  const maxVote = Math.max(...changeObj);
  const indexOfAnec = changeObj.indexOf(maxVote);
  const highVoteAnec = anecdotes[indexOfAnec];
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>{`has ${votes[selected]} votes`}</p>
      <button onClick={copy}>vote</button>
      <button onClick={randomShow}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{highVoteAnec}</p>
      <p>{`has ${maxVote} votes`}</p>
    </div>
  );
};

export default App;
