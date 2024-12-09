import { Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { GetStories, getUsersData, removeFavoriteStory } from '../API/Api';
import './Favorite.css';

const Favorites = () => {
  const [favoriteStories, setFavoriteStories] = useState([]);
  const loginId = localStorage.getItem('loginId');
  const [allStories, setAllStories] = useState([]);
  const [open, setOpen] = useState(false);

  const removeFavorite = async (storyId) => {
    try {
      await removeFavoriteStory(loginId, storyId); // Call API to remove favorite
      setFavoriteStories(prevFavorites => prevFavorites.filter(id => id !== storyId));
      setOpen(true); // Show snackbar notification
    } catch (error) {
      console.error("Error removing favorite story:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUsersData();
        if (res && res.data) {
          const user = res.data.find(user => parseInt(user.id) === parseInt(loginId));
          if (user && user.favorites) {
            setFavoriteStories(user.favorites);
          } else {
            console.log("User has no favorite stories or user not found.");
          }
        } else {
          console.error("No data returned from the API");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [loginId]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await GetStories();
        if (res && res.data) {
          setAllStories(res.data);
        } else {
          console.error("No stories data returned from the API");
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, []);

  const filteredStories = allStories.filter(story =>
    favoriteStories.includes(story.storyId)
  );

  return (
    <div className="favorites-container">
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Removed From Favorites!"
        action={
          <button color="inherit" onClick={handleClose}>
            Close
          </button>
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      />
      <h1 className='fav-h'>Your Favorite Stories</h1>
      {filteredStories.length > 0 ? (
        <div className="favorites-list">
          {filteredStories.map(story => (
            <div key={story.storyId} className="favorite-item">
              <img className='fav-img' src={story.img} alt={story.title} width={200} height={300} />
              <h2 className='fav-title'>{story.title}</h2>
              <p className='fav-des'>{story.description}</p>
              <p className='fav-p'>Age Group: {story.age}</p>
              <button
                className='rem-btn'
                onClick={() => removeFavorite(story.storyId)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite stories found.</p>
      )}
    </div>
  );
};

export default Favorites;
