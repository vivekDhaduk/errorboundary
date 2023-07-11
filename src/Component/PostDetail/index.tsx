import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AxiosError } from 'axios';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { getPost } from '../../Services/users.service';
import ErrorBoundry from '../Common/ErrorBoundry';
import '../../Style/index.css';

interface Iposts {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

const Post = (): JSX.Element => {
  const { postId } = useParams();
  const [posts, setPosts] = useState<Iposts>();
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isNaN(Number(postId))) {
      setError('Post ID must be a number value');
      setLoader(false);
    } else {
      loadPost(Number(postId));
    }
  }, []);

  const loadPost = async (postId: number) => {
    try {
      const { data } = await getPost(postId);
      if (data) {
        setPosts(data.data);
      }
    } catch (error) {
      setError((error as AxiosError)?.message);
    } finally {
      setLoader(false);
    }
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
      <p className="page-title">Post Detail</p>
      {posts && Object.keys(posts).length > 0 ? (
        <div className="user-list-wrapper">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {posts?.id}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {posts?.title}
              </Typography>
              <Typography variant="body2">{posts?.body}</Typography>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="cutome-loader-wrapper">
          <p> Post Details not found!</p>
        </div>
      )}
    </ErrorBoundry>
  );
};

export default Post;
