import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/Context';
import './About.css';

const About=()=> {
  const navigate=useNavigate();
  const {userRole}=useContext(MyContext);
  return (
    <>
    <section className="about">
      <h2 className='about-h2'>About Us</h2>
      <p>Welcome to <strong>WonderBooks</strong>, where imagination meets education! Our mission is to create a magical space where children can explore the wonders of storytelling while learning valuable lessons.</p>
      <h3>Our Vision</h3>
      <p>At WonderBooks, we believe that every story is a journey that can inspire, educate, and entertain. Our goal is to ignite children's creativity and curiosity by offering a diverse range of interactive stories and educational activities.</p>
    </section>
    </>
  );
}

export default About;
