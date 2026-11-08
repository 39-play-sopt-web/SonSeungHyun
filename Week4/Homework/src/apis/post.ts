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