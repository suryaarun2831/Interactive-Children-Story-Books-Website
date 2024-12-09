import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import home_image1 from '../../assets/animation/home-img1.png';
import home_image2 from '../../assets/animation/home-img2.png';
import home_image3 from '../../assets/animation/home-img3.png';
import home_image4 from '../../assets/animation/home-img4 (1).png';
import home_image5 from '../../assets/animation/home-img5.png';
import logo from '../../assets/animation/rascal-youre-welcome.gif';
import videoFile from '../../assets/Home-images/videoplayback (1).webm';
import { GetStories } from '../API/Api';
import { MyContext } from '../context/Context';
import './Home.css';

const Home = () => {
  const theme=localStorage.getItem('theme');
  useEffect(() => {
    if (theme === 'dark') {
      document.body.style.backgroundColor = 'black';
    } else {
      document.body.style.backgroundColor = 'white';
    }
  }, [theme]);
  const [stories, setStory] = useState([]);
  const { setStoryname } = useContext(MyContext);
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const images = [
    home_image1,
    home_image2,
    home_image3,
    home_image4,
    home_image5
  ];

  useEffect(() => {
    const get = async () => {
      const res = await GetStories();
      setStory(res.data);
    }
    get();
  }, []);

  useEffect(() => {
    const imageIntervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(imageIntervalId);
  }, [images.length]);

  const videos = [
    videoFile,

  ];

  const navigateDoodle=()=>{
    navigate('/doodle');
  }
  const handlePrevVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const messages = [
    'Learning for Everyone!',
    'Discover the Magic of Stories!',
    'Inspire Your Imagination!',
    'Adventure Awaits!',
    'Unleash Your Creativity!',
    'Where Stories Come Alive!',
    'Explore, Learn, and Grow!',
    'Find Your Next Favorite Tale!',
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const messageIntervalId = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000); 
    return () => clearInterval(messageIntervalId);
  }, [messages.length]);

  const navigateStory = (title) => {
    setStoryname(title);
    navigate('/story-page');
  }

  return (
    <>
      <div className={`home_div1`}>
        <div className="Home1">
          <img src={logo} alt='404'/>
          <h1 className={`title ${theme==='dark'?'dark':''}`}>Hi, we're WonderBooks.</h1>
          <h1 className={`home-h1 ${theme==='dark'?'dark':''}`}>{messages[currentMessageIndex]}</h1>
        </div>
        <div className='Home2'>
          <div className="Home-img" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}></div>
        </div>
      </div>

      <div className='home-div4'>
        <div className='anime'></div>
        <div className='home-div4-content'>
          <h1>Unleash the Power of Imagination with WonderBooks!</h1>
          <p className={`${theme==='dark'?'dark':''}`}>At WonderBooks, we're dedicated to discovering talented children's authors who can inspire young minds.
           Our platform provides the best entertaining story to engage children in educational activities with interactive website.</p>
           <button className='doddle-btn' onClick={navigateDoodle}>Doogle</button>
        </div>
      </div>
      <div className='home-div2'>
        <div className='home-div2-content'>
          <h1>Explore the Future of Storytelling with WonderBooks!</h1>
          <p className={`${theme==='dark'?'dark':''}`}>At WonderBooks, we're passionate about showcasing visionary children's authors who captivate young imaginations.
          Our platform connects groundbreaking stories with the latest in visual storytelling and global trends in children's literature.</p>
        </div>
        <div className='video-container'>
           <video src={videos[currentVideoIndex]} height={'100%'} width={'100%'} loop autoPlay muted playsInline/>
        </div>
      </div>
      <div className='home-div3'>
        <div className='Explore-Home'>
          <h1>Explore More</h1>
          <p className={`${theme==='dark'?'dark':''}`}>Looking for more magical tales and exciting adventures? There's so much more to explore!</p>
            <div className='story-explore-content' >
            {stories.map((user, index) => (
              <div className='story-explore-card' key={index}>
                <p>
                  <img className='story-img' src={`${user.img}`} height={'300px'} width={'220px'} alt='Image_Not_Loaded'
                  onClick={()=>{
                    localStorage.setItem('storyTitle',user.title);
                    localStorage.setItem('storyimg',user.img);
                    navigate('/story-page');
                  }}/>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="impact-section">
        <div className="overlay">
          <div className="impact-content">
            <h1>Our Impact Last Year</h1>
            <div className="impact-stats">
              <div className="stat">
                <h2 style={{color:'white'}}>10,000+</h2>
                <p>People attended</p>
              </div>
              <div className="stat">
                <h2 style={{color:'white'}}>300+</h2>
                <p>Story Hours</p>
              </div>
              <div className="stat">
                <h2 style={{color:'white'}}>46</h2>
                <p>States participated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
