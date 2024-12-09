import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteStories, editStories, GetStories, getStoriesForAbove15, getStoriesForChildren3to8, getStoriesForChildren8to15, PostStories } from '../API/Api';
import './Books.css';

const Books = () => {
  const theme=localStorage.getItem('theme');
  const [AllStories,setAllStories]=useState([]);
  const [story_3to8, setStory_3to8] = useState([]);
  const [story_8to15, setStory_8to15] = useState([]);
  const [story_above15, setStory_above15] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStory, setNewStory] = useState({ title: '', description: '', img: '', age: '' });
  const [editMode, setEditMode] = useState(false);
  const [editStoryId, setEditStoryId] = useState(null);
  const userId = localStorage.getItem('loginId');
  const [cart, setCart] = useState([]);

  // Filtering
  const [filterAge,setfilterAge]=useState('');
  const [filterDescription,setfilterDescription]=useState('');

  const filterStories = (stories) => {
    if (!Array.isArray(stories)) {
      return [];
    }
  
    return stories.filter((story) => {
      const matchAge = filterAge ? story.age === parseInt(filterAge) : true;
      const matchDesc = filterDescription
        ? story.description.toLowerCase().includes(filterDescription.toLowerCase())
        : true;
      return matchAge && matchDesc;
    });
  };
  

  const navigate = useNavigate();
  const handleAddToCart = async (story) => {
    try {
      // await postStoriesToCart(userId, story);
      console.log(`Story with ID: ${story.storyId} added to cart`);
    } catch (error) {
      console.error('Error adding story to cart:', error);
    }
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);
  

  const fetchData = useCallback(async () => {
    try {
      const all_stories=await GetStories();
      const res_3to8 = await getStoriesForChildren3to8();
      const res_8to15 = await getStoriesForChildren8to15();
      const res_above15 = await getStoriesForAbove15();
      if(all_stories && all_stories.data){
        setAllStories(all_stories.data);
      }else{
        console.error('Invalid response from AllStories:', res_3to8);
      }
      if (res_3to8 && res_3to8.data) {
        setStory_3to8(res_3to8.data);
      } else {
        console.error('Invalid response from GetStories (3-8):', res_3to8);
      }

      if (res_8to15 && res_8to15.data) {
        setStory_8to15(res_8to15.data);
      } else {
        console.error('Invalid response from GetStories (8-15):', res_8to15);
      }

      if (res_above15 && res_above15.data) {
        setStory_above15(res_above15.data);
      } else {
        console.error('Invalid response from GetStories (Above 15):', res_above15);
      }

    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStory({ ...newStory, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    try {
        if (editMode) {
            const updatedStory = { ...newStory, id: editStoryId };
            const response = await editStories(updatedStory, editStoryId); // Ensure this line executes

            if (newStory.age <= 8) {
                setStory_3to8(story_3to8.map(story => story.id === editStoryId ? updatedStory : story));
            } else if (newStory.age <= 15) {
                setStory_8to15(story_8to15.map(story => story.id === editStoryId ? updatedStory : story));
            } else if (newStory.age > 15) {
                setStory_above15(story_above15.map(story => story.id === editStoryId ? updatedStory : story));
            }

            setEditMode(false);
            setEditStoryId(null);
            await fetchData(); // This should refresh your data after the edit
        } else {
            // Adding a new story
            const response = await PostStories(newStory);
            const addedStory = { ...newStory, id: response.data.id };

            if (newStory.age <= 8) {
                setStory_3to8([...story_3to8, addedStory]);
            } else if (newStory.age <= 15) {
                setStory_8to15([...story_8to15, addedStory]);
            } else if (newStory.age > 15) {
                setStory_above15([...story_above15, addedStory]);
            }
            window.reload();
        }

        setShowModal(false);
        await fetchData();  // This will refresh data after adding or editing
        setNewStory({ title: '', description: '', img: '', age: '' });
    } catch (error) {
        console.error('Error posting or updating story:', error.response ? error.response.data : error.message);
        setShowModal(false);
    }
};


  const handleEditClick = (story) => {
    setEditMode(true);
    setEditStoryId(story.storyId);
    setNewStory({ title: story.title, description: story.description, img: story.img, age: story.age });
    setShowModal(true);
};


  const DeleteStoryFunction = async (id, age) => {
    try {
      await DeleteStories(id);
      if (age <= 8) {
        setStory_3to8(story_3to8.filter(story => story.id !== id));
      } else if (age <= 15) {
        setStory_8to15(story_8to15.filter(story => story.id !== id));
      } else if (age > 15) {
        setStory_above15(story_above15.filter(story => story.id !== id));
      }
      await fetchData();
    } catch (error) {
      console.error('Error deleting story:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <div className="book-container">
        <h1 className={`book-h1 ${theme}`}>Children's Popular (Age 3-8)</h1>
        <div className='story-explore-content'>
          {story_3to8.map((user, index) => (
            <div className='story-explore-card' key={index}>
              <p>
                <img className='story-img' src={`${user.img}`} height={'300px'} width={'220px'} alt='Image_Not_Loaded'></img>
              </p>
              <p className={`tit ${theme}`}>{user.title}</p>
                <button className='book-edit-btn' onClick={() => handleEditClick(user)}>Edit</button>
                <button className='book-del-btn' onClick={() => DeleteStoryFunction(user.storyId, user.age)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      <div className="book-container">
        <h1 className={`book-h1 ${theme}`}>Children's Classics (Age 8-15)</h1>
        <div className='story-explore-content'>
          {story_8to15.map((user, index) => (
            <div className='story-explore-card' key={index}>
              <p><img className='story-img' src={`${user.img}`} height={'300px'} width={'220px'} alt='Image_Not_Loaded'></img></p>
              <p className={`tit ${theme}`}>{user.title}</p>
                <button className='book-edit-btn' onClick={() => handleEditClick(user)}>Edit</button>
                <button className='book-del-btn' onClick={() => DeleteStoryFunction(user.storyId, user.age)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      <div className="book-container">
        <h1 className={`book-h1 ${theme}`}>Popular Hits (Age Above 15)</h1>
        <div className='story-explore-content'>
          {story_above15.map((user, index) => (
            <div className='story-explore-card' key={index}>
              <p><img className='story-img' src={`${user.img}`} height={'300px'} width={'220px'} alt='Image_Not_Loaded'></img></p>
              <p className={`tit ${theme}`}>{user.title}</p>
                <button className='book-edit-btn' onClick={() => handleEditClick(user)}>Edit</button>
                <button className='book-del-btn' onClick={() => DeleteStoryFunction(user.storyId, user.age)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
        <button className={`add-story-btn ${theme}`} onClick={() => setShowModal(true)}>Add Story</button>
      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <h2>{editMode ? "Edit Story" : "Add New Story"}</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                Title:
                <input
                  type='text'
                  name='title'
                  value={newStory.title}
                  onChange={handleInputChange}
                  required
                  style={{ width: '180px', marginLeft: '45px'}}
                />
              </label>
              <label>
                Desc:
                <input
                  type='text'
                  name='description'
                  value={newStory.description}
                  onChange={handleInputChange}
                  required
                  style={{ width: '180px', marginLeft: '38px' }}
                />
              </label>
              <label>
                Img URL:
                <input
                  type='text'
                  name='img'
                  value={newStory.img}
                  onChange={handleInputChange}
                  required
                  style={{ width: '180px', marginLeft: '12px' }}
                />
              </label>
              <label>
                Age:
                <input
                  type='number'
                  name='age'
                  value={newStory.age}
                  onChange={handleInputChange}
                  required
                  style={{ width: '180px', marginLeft: '47px' }}
                />
              </label>
              <button type='submit' className='save-btn' style={{width:'100px'}}>{editMode ? "Update Story" : "Add Story"}</button>
              <button type='submit' className='cancel-btn' style={{margin:'1% 5%',width:'100px'}} onClick={() => setShowModal(false)}>Close</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Books;
