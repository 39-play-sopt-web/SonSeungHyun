import { instance } from './instance';
import type { ApiResponse } from '../types/api';
import type { PostListParams, PostListResponse } from '../types/post';

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