import { Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import audiofile1 from '../../assets/stories/story.mp3';
import videofile1 from '../../assets/stories/story.mp4';
import { addFavoriteStory, GetStories } from '../API/Api';
import './Stories.css';
const Stories = () => {
  const navigate = useNavigate();
  const theme=localStorage.getItem('theme');
  const [stories, setStory] = useState([]);
  const [isAdded,setisAdded]=useState(false);
  const [play,setPlay]=useState(false);
  const storyname = localStorage.getItem('storyTitle');
  const storyimg = localStorage.getItem('storyimg');
  const storyId = localStorage.getItem('$toryId');
  const storedLoginId = localStorage.getItem('loginId');
  const AddFavorite=()=>{
      addFavoriteStory(storedLoginId,storyId);
      setisAdded(true);
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setisAdded(false);
};
useEffect(() => {
  const get = async () => {
    const res = await GetStories();
    setStory(res.data);
  }
  get();
}, []);
  return (
    <>
    <div className='story-container'>
      <Snackbar open={isAdded} autoHideDuration={6000} onClose={handleClose} 
      message="Successfully Added to Favorites!"
      action={
        <button color="inherit" onClick={handleClose}>
            Close
        </button>
      } anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}/>
      <div className='story-content'>
          <img src={storyimg} height={'400px'} width={'300px'} style={{margin:'3% 5%',borderRadius:'10px'}}/>
          <div className='story-heading'>
            <h1 className='story-title'>{storyname}</h1>
            <button className='favorite-btn' onClick={AddFavorite}>Add to Favorites⭐</button>
            <button className='audio-btn' onClick={()=>{setPlay(prev => !prev)}}>Audio ▶</button>
            <p>Theme : Adventure/Fantasy</p>
            <div className='audio-container'>
            {play && <audio controls>
              <source src={audiofile1} type="audio/ogg"></source>
              Your browser does not support the audio tag.
            </audio>}
            </div>
          </div>
            <div className='video-con'>
            <video controls width="320" height="240">
                <source src={videofile1} type="video/mp4"/>
                Your browser does not support the video tag.
              </video>
            </div>
      </div>

        <div className='story-words'>
        The Rabbit and the Tortoise is a well-known fable that teaches us an important lesson about patience and perseverance. Once upon a time, in a lush green forest, a rabbit and a tortoise were good friends. The rabbit was very fast and could run like the wind, while the tortoise moved slowly, step by step. The rabbit often bragged about how fast he was and teased the tortoise for being so slow.

One day, the rabbit decided to challenge the tortoise to a race. "Do you really think you can win against me, the fastest animal in the forest?" the rabbit laughed. The tortoise, though slow, was determined and calmly accepted the challenge. "I may be slow," said the tortoise, "but I’ll give it my best. Let’s see what happens."

All the animals in the forest gathered to watch the race. The starting line was set, and the race began. The rabbit took off quickly, speeding down the path and leaving the tortoise far behind. The tortoise, on the other hand, kept moving at his steady, slow pace, one step at a time. He didn’t hurry; he just kept going steadily.

Soon, the rabbit was so far ahead that he couldn’t even see the tortoise behind him. He felt very confident that he would win the race easily, so he decided to take a short rest. "The tortoise is so slow. I have plenty of time to relax," he thought. The rabbit found a shady spot under a tree, lay down, and quickly fell asleep.

Meanwhile, the tortoise kept moving, slowly and steadily. He didn’t stop or take a break; he simply continued on his way. Step by step, he got closer and closer to the finish line. The other animals watched in amazement as the tortoise kept moving forward, while the rabbit was still asleep under the tree.

Eventually, the tortoise came very close to the finish line. Just then, the rabbit woke up and realized the tortoise was almost at the end. He jumped up and dashed towards the finish line as fast as he could. But it was too late – by the time he reached the line, the tortoise had already crossed it. The tortoise had won the race!

The rabbit was shocked and embarrassed. He couldn’t believe that the slow tortoise had beaten him. The tortoise looked at him calmly and said, "You may be fast, but I won because I didn’t give up. Slow and steady wins the race."

The story of The Rabbit and the Tortoise teaches us that it doesn’t matter if we are fast or slow, as long as we keep moving forward with determination and don’t give up. The rabbit learned an important lesson: being overconfident and lazy can lead to failure, while patience and hard work can lead to success. This simple tale reminds us that taking our time and staying focused can help us reach our goals, even if it takes a while.
        </div>
    </div>
    <div className='home-div3'>
        <div className='similar-section'>
          <h1>Similar Stories</h1>
          <div className='similar-cotent' >
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
    </>
  );
};

export default Stories;
