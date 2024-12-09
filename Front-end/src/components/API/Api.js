import axios from 'axios';
const API_URL='http://localhost:8080';

export const getUsersData = async() => {
    try
    {
        return await axios.get(`${API_URL}/users`);
    }
    catch(error)
    {
        console.log(error);
    }
}
export const postUserData = async(userData) => {
    try {
        return await axios.post(`${API_URL}/users/post`, userData);
    } catch (error) {
        console.error("Error during user registration:", error);
        throw error;
    }
}

export const updateUserData = async (userId, userData) => {
    try {
        return await axios.put(`${API_URL}/users/edit/${userId}`, userData);
    } catch (error) {
        console.error("Error updating user data:", error);
        throw error;
    }
};



export const DeleteUser = async(id)=>{
    try
    {
        axios.delete(`${API_URL}/users/delete/${id}`);
    }
    catch(error)
    {console.log("Error");}
}
export const GetStories = async()=>{
    try
    {
        return axios.get(`${API_URL}/api/stories`);
    }
    catch(error)
    {console.log("error");}
}
export const PostStories = async(stories)=>{
    try
    {
        axios.post(`${API_URL}/api/stories`,stories);
    }
    catch(error)
    {console.log("error")}
}
export const editStories = async (story, id) => {
    try {
        const response = await axios.put(`${API_URL}/api/stories/${id}`, story);
        console.log("Story updated:", response.data); // Log the response to check
        return response.data; // Ensure you return the updated story data
    } catch (error) {
        console.error("Error updating story:", error);
    }
};

  
export const DeleteStories = async(id)=>{
    try{
        await axios.delete(`${API_URL}/api/stories/${id}`);
    }
    catch(error)
    {console.log("error");}
}
export const getStoriesForChildren3to8 = async () => {
    try {
        return await axios.get(`${API_URL}/api/stories/age/3-8`);
    } catch (error) {
        console.log("Error fetching stories for ages 3-8:", error);
    }
}

export const getStoriesForChildren8to15 = async () => {
    try {
        return await axios.get(`${API_URL}/api/stories/age/8-15`);
    } catch (error) {
        console.log("Error fetching stories for ages 8-15:", error);
    }
}

export const getStoriesForAbove15 = async () => {
    try {
        return await axios.get(`${API_URL}/api/stories/age/15+`);
    } catch (error) {
        console.log("Error fetching stories for ages 15+:", error);
    }
}
export const addFavoriteStory = async (userId, storyId) => {
    try {
        const response = await axios.post(`${API_URL}/users/${userId}/favorites/${storyId}`);
        return response.data;
    } catch (error) {
        console.error("Error adding story to favorites:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export const removeFavoriteStory = async (userId, storyId) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${userId}/favorites/${storyId}`);
        return response.data;
    } catch (error) {
        console.error("Error removing story from favorites:", error.response ? error.response.data : error.message);
        throw error;
    }
}

