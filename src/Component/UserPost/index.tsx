import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AxiosError } from 'axios';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { getUserPost } from '../../Services/users.service';
import { Post } from '../../Models/Response/PostResponse';
import ErrorBoundry from '../Common/ErrorBoundry';
import '../../Style/index.css';

const UserPost = (): JSX.Element => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (isNaN(Number(userId))) {
      setError('User ID must be a number value');
      setLoader(false);
    } else {
      loadPost(Number(userId));
    }
  }, [userId]);

  const loadPost = async (userId: number) => {
    try {
      const { data } = await getUserPost(userId);
      if (data && data.length > 0) {
        setPosts(data);
      }
    } catch (error) {
      setError((error as AxiosError)?.message);
    } finally {
      setLoader(false);
    }
  };

  const gotoPost = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  if (loader) {
    return (
      <div className="cutome-loader-wrapper">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <ErrorBoundry showError={!!error} message={error}>
      <p className="page-title">User Post's</p>
      {posts && posts.length > 0 ? (
        <div className="user-list-wrapper">
          <div className="user-post-wrapper">
            {posts.map((post) => (
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {post.body}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      gotoPost(post.id);
                    }}
                  >
                    View Post
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="cutome-loader-wrapper">
          <p className="not-found">User Don't have any posts!</p>
        </div>
      )}
    </ErrorBoundry>
  );
};

export default UserPost;
