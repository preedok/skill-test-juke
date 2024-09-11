import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  CircularProgress,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { usePostDetails } from '../hooks/usePostDetails'; 

const PostPage = () => {
  const { id } = useParams(); 
  const { post, comments, loading, error } = usePostDetails(id); 
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    setCommentList(comments);
  }, [comments]);

  const handleAddComment = (e) => {
    e.preventDefault();
    const newCommentObj = {
      name: 'Anonymous',
      body: newComment,
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card style={{ backgroundColor: '#f9f9f9', padding: '20px' }}>
            <CardContent>
              <Typography variant="h5" component="h1" gutterBottom>
                {post?.title}
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {post?.body}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" component="h2" gutterBottom>
            Comments
          </Typography>
          <List style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {commentList.map((comment, index) => (
              <ListItem key={index} style={{ backgroundColor: '#f1f1f1', marginBottom: '10px', borderRadius: '8px' }}>
                <ListItemText
                  primary={<Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>{comment.name}</Typography>}
                  secondary={comment.body}
                />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item xs={12}>
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
              style={{ marginBottom: '15px' }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                display: 'block',
                width: '100%',
                backgroundColor: '#1976d2',
                color: '#fff',
                padding: '10px 0',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1565c0'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1976d2'}
            >
              Submit Comment
              <SendIcon />
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default PostPage;
