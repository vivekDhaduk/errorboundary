export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface PostDetail {
  meta: any;
  data: Post;
}
