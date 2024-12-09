import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import { MyContext } from '../context/Context';
import './Quiz.css';
const Quiz = () => {
  const {userRole}=useContext(MyContext);
  useEffect(()=>{
    ScrollReveal().reveal('.quiz-div .quiz-section .quiz-section1 .quiz-section2',{
        origin: 'bottom',
        distance: '20px',
        duration: 600,
        easing: 'ease-in-out',
        interval: 200,
    });
  },[]);
    const navigate=useNavigate();
  return (
    <>
    <div className='quiz-container'>
    <div className='quiz-div'>
        <div className='quiz-section' onClick={()=>{navigate('/Question')}}></div>
    </div>
        {userRole==='admin' && <><button className='quiz-edit'>Edit</button><button className='quiz-del'>Delete</button></>}
        {userRole==="admin" && <button className='add_quiz'>Add Quiz</button>}
    </div>
    </>
  )
}

export default Quiz