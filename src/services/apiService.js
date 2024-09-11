import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const getPostById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching post with id ${id}:`, error);
        throw error;
    }
};

export const getCommentsByPostId = async (postId) => {
    try {
        const response = await axios.get(`${API_URL}/comments?postId=${postId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching comments for postId ${postId}:`, error);
        throw error;
    }
};
