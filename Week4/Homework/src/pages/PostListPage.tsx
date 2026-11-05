import { useState } from 'react';
import type { SubmitEvent, ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { getPosts } from '../apis/post';
import PostCard from '../components/PostCard';

const PostListPage = () => {
  const [inputValue, setInputValue] = useState(''); // 입력창에 보이는 값
  const [keyword, setKeyword] = useState('');       // 실제로 검색한 값

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['posts', 'list', keyword], // keyword가 바뀌면 새 쿼리로 인식
    queryFn: () => getPosts({ keyword }),
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // 입력을 다 지우면 버튼이 비활성화되므로, 여기서 전체 목록으로 되돌림
    if (e.target.value.trim() === '') setKeyword('');
  };

  // form의 submit이라 버튼 클릭과 Enter 모두 동작
  const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지
    setKeyword(inputValue.trim());
  };

  // 목록 영역만 상태에 따라 바꿈 (검색창은 항상 유지)
  const renderList = () => {
    if (isPending) return <Message>불러오는 중...</Message>;
    if (isError) return <Message>에러: {error.message}</Message>;
    if (data.posts.length === 0) return <Message>게시글이 없어요.</Message>;

    return (
      <List>
        {data.posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </List>
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
          maxLength={50} // 서버 제한: 2~50자
          aria-label="게시글 제목 검색"
        />
        <SearchButton type="submit" disabled={inputValue.trim() === ''}>
          검색
        </SearchButton>
      </SearchForm>

      {renderList()}
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