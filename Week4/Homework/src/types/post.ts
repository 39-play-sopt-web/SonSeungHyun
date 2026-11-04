// 게시글 하나의 데이터
export type Post = {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updateAt: string;
}

// 목록 조회 응답
export type PostListResponse = {
  posts: Post[];
  nextCursor: number | null;
  hasNext: boolean;
};

// POST /posts 요청 body
export type CreatePostRequest = {
    title: string;
    content: string;
    author: string;
};

// PUT /posts/{postId} 요청 body
export type UpdatePostRequest = {
    title: string;
    content: string;
};