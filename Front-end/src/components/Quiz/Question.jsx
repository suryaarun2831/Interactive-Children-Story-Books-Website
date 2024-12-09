import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Question.css';
const Question = () => {
  const navigate=useNavigate();
    const [question,setquestion]=useState([]);
    const [index,setindex]=useState(0);
    const [selectedindex,setselectedindex]=useState(null);
    const [score,setscore]=useState(0);
    useEffect(()=>{
        const fetch=async()=>
        {
          try
          {

            const res=await axios.get('http://localhost:3001/questions');
            setquestion(res.data);
            console.log(question);
          }
          catch(err)
          {
            console.log('error: '+err)
          }
        }
          fetch();
    });
    const handleoptionClick = (optionIndex) => {
      setselectedindex(optionIndex);
      if (question[index].options[optionIndex] === question[index].correctAnswer) {
        setscore(prev => prev + 1);
      }
  }
  
    const handlenext=()=>{
      if (index >= question.length - 1) {
        navigate('/result',{state:{score,total:question.length}});
      }
        else
        {
          setindex(prev=> prev+1);
          setselectedindex(null);
        }
    }
    const ans=question[index];
    if (question.length=== 0) return <p>Loading...</p>;
  return (
    <>
        <div className='question-div'>
                <h2 className='question'>{ans.question}</h2>
                {ans.options.map((option,i)=>(
                    <p key={i} className={`${selectedindex === i?'selected':''}`} onClick={()=>handleoptionClick(i)}>{option}</p>
                ))}
                <button className='next-btn' onClick={handlenext}>Next</button>
        </div>
    </>
  )
}

export default Question;