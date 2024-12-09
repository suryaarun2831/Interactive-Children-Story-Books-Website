import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/Context';
import './Contact.css';

function Contact() {
  const theme=localStorage.getItem('theme');
  const navigate=useNavigate();
  const {userRole}=useContext(MyContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
    <div className='contact-page'>
        <h1 className='contact-h1'>WE WOULD LOVE TO HEAR FROM YOU!</h1>
    <section className="contact">
      <h2>Contact Us</h2>
      <p>If you have any questions, suggestions, or just want to say hello, please feel free to reach out to us!</p>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name"value={formData.name}onChange={handleChange}required/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email"id="email"name="email"value={formData.email}onChange={handleChange}required/>
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message"name="message"value={formData.message}onChange={handleChange}required></textarea>
        </div>
        <button type="submit" className='contact-btn'>Send Message</button>
      </form>
    </section>
    </div>
    </>
  );
}

export default Contact;
