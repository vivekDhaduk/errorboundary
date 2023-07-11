import React from 'react';
import UserList from './Component/UserList';
import { Route, Routes } from 'react-router-dom';
import UserPost from './Component/UserPost';
import PostDetail from './Component/PostDetail';

const App = (): JSX.Element => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/posts/:userId" element={<UserPost />} />
        <Route path="/post/:postId" element={<PostDetail />} />
      </Routes>
    </div>
  );
};

export default App;
