import { instance } from './instance';
import type { ApiResponse } from '../types/api';
import type { PostListParams, PostListResponse } from '../types/post';
import type { CreatePostRequest, Post, UpdatePostRequest } from '../types/post';

// GET /posts (목록 조회 / 제목 검색)
export const getPosts = async (params: PostListParams = {}) => {
  const response = await instance.get<ApiResponse<PostListResponse>>('/posts', {
    params: {
      ...params,
      keyword: params.keyword || undefined,
    },
  });
  return response.data.data;
};

// POST /posts (게시글 작성)
export const createPost = async (body: CreatePostRequest) => {
  const response = await instance.post<ApiResponse<Post>>('/posts', body);
  return response.data.data;
};

// GET /posts/{postId} (게시글 상세 조회)
export const getPost = async (postId: number) => {
  const response = await instance.get<ApiResponse<Post>>(`/posts/${postId}`);
  return response.data.data;
};

// PUT /posts{postId} (게시글 수정)
export const updatePost = async ({
  postId,
  body
}: {
  postId: number;
  body: UpdatePostRequest;
}) => {
  const response = await instance.put<ApiResponse<Post>>(`/posts/${postId}`, body);
  return response.data.data;
};

// DELETE /posts/{postId} (게시글 삭제)
export const deletePost = async (postId: number) => {
  const response = await instance.delete<ApiResponse<null>>(`/posts/${postId}`);
  return response.data.data;
};