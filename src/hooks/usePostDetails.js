import { useState, useEffect } from 'react';
import { getPostById, getCommentsByPostId } from '../services/apiService';

export const usePostDetails = (id) => {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const postData = await getPostById(id);
                const commentsData = await getCommentsByPostId(id);
                setPost(postData);
                setComments(commentsData);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchPostDetails();
    }, [id]);

    return { post, comments, loading, error };
};
