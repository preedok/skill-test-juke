import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, CircularProgress, Paper, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { usePostDetails } from '../hooks/usePostDetails';

const PostPage = () => {
  const { id } = useParams();
  const { post, comments, loading, error } = usePostDetails(id);
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState(comments);

  const handleAddComment = (e) => {
    e.preventDefault();
    const newCommentObj = {
      name: 'Iqbal',
      body: newComment
    };
    setCommentList([newCommentObj, ...commentList]);
    setNewComment('');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Typography variant="h6">Error loading post: {error.message}</Typography>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {post?.title}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          {post?.body}
        </Typography>
      </Paper>

      <Typography variant="h6" component="h2" gutterBottom>
        Comments
      </Typography>
      <List>
        {commentList.map((comment, index) => (
          <ListItem key={index}>
            <ListItemText primary={comment.name} secondary={comment.body} />
          </ListItem>
        ))}
      </List>

      <form onSubmit={handleAddComment} style={{ marginTop: '20px' }}>
        <TextField
          label="Add a comment"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
          Kirim Comment
        </Button>
      </form>
    </div>
  );
};

export default PostPage;
