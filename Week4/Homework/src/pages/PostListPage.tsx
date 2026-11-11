import { useState } from 'react';
import type { SubmitEvent, ChangeEvent } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { getPosts } from '../apis/post';
import PostCard from '../components/PostCard';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

const PostListPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [keyword, setKeyword] = useState('');

  const { data, isPending, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['posts', 'list', keyword],
      queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
        getPosts({ keyword, cursor: pageParam }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
    });

  const observerRef = useInfiniteScroll(fetchNextPage, hasNextPage && !isFetchingNextPage);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.trim() === '') setKeyword('');
  };

  const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(inputValue.trim());
  };

  const renderList = () => {
    if (isPending) return <Message>불러오는 중...</Message>;
    if (isError) return <Message>에러: {error.message}</Message>;

    const posts = data.pages.flatMap((page) => page.posts);
    if (posts.length === 0) return <Message>게시글이 없어요.</Message>;

    return (
      <>
        <List>
          {posts.map((post) => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </List>

        {isFetchingNextPage && <Message>불러오는 중...</Message>}
      </>
    );
  };

  return (
    <Wrapper>
      <SearchForm onSubmit={handleSearch}>
        <SearchInput
          type="search"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="제목으로 검색"
          maxLength={50}
          aria-label="게시글 제목 검색"
        />
        <SearchButton type="submit" disabled={inputValue.trim() === ''}>
          검색
        </SearchButton>
      </SearchForm>

      {renderList()}
      <div ref={observerRef} />
    </Wrapper>
  );
};

export default PostListPage;

const Wrapper = styled.section`
  width: 100%;
  max-width: 640px;
  margin: 24px auto;
  padding: 0 16px;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.surface};
`;

const SearchButton = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.primaryDark};
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
`;

const Message = styled.p`
  margin-top: 40px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSub};
`;