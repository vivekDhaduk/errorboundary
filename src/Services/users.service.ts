import axios, { AxiosResponse } from 'axios';
import { Post, PostDetail } from './../Models/Response/PostResponse';
import { UserListing } from '../Models/Response/UserResponse';

const BASE_URL = 'https://gorest.co.in';

export const getAllUsers = async (
  page: number,
): Promise<AxiosResponse<UserListing>> => {
  return await axios.get<UserListing>(
    `${BASE_URL}/public/v1/users?page=${page}`,
  );
};

export const getUserPost = async (
  userid: number,
): Promise<AxiosResponse<Post[]>> => {
  return await axios.get<Post[]>(`${BASE_URL}/public/v2/users/${userid}/posts`);
};

export const getPost = async (
  postid: number,
): Promise<AxiosResponse<PostDetail>> => {
  return await axios.get<PostDetail>(`${BASE_URL}/public/v1/posts/${postid}`);
};
