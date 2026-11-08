import { useState } from 'react';
import type { SubmitEvent } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { getPost, updatePost, deletePost } from '../apis/post';

const PostDetailPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const id = Number(postId);
  const isValidId = Number.isInteger(id);

  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['posts', 'detail', id],
    queryFn: () => getPost(id),
    enabled: isValidId,
  });

  const { mutate, isPending: isUpdating } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      alert('게시글이 수정되었어요!');
      setIsEditing(false);
    },
    onError: () => {
      alert('게시글 수정에 실패했어요. 다시 시도해 주세요.');
    },
  });

  const { mutate: removePost, isPending: isDeleting } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['posts', 'detail', id] });
      queryClient.invalidateQueries({ queryKey: ['posts', 'list'] });
      navigate('/posts', { replace: true });
    },
    onError: () => {
      alert('게시글 삭제에 실패했어요. 다시 시도해 주세요.');
    },
  });

  const handleEditStart = () => {
    if (!data) return;
    setTitle(data.title);
    setContent(data.content);
    setIsEditing(true);
  };

  const isFormValid = title.trim() !== '' && content.trim() !== '';

  const handleUpdate = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    mutate({ postId: id, body: { title: title.trim(), content: content.trim() } });
  };

  const renderContent = () => {
    if (!isValidId) return <Message>잘못된 게시글 주소예요.</Message>;
    if (isPending) return <Message>불러오는 중...</Message>;
    if (isError) return <Message>에러: {error.message}</Message>;

    if (isEditing) {
      return (
        <Form onSubmit={handleUpdate}>
          <PageTitle>게시글 수정</PageTitle>

          <Field>
            <Label htmlFor="title">제목</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>

          <Field>
            <Label htmlFor="content">본문</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Field>

          <ButtonRow>
            <SubButton type="button" onClick={() => setIsEditing(false)}>
              취소
            </SubButton>
            <MainButton type="submit" disabled={!isFormValid || isUpdating}>
              {isUpdating ? '수정 중...' : '수정 완료'}
            </MainButton>
          </ButtonRow>
        </Form>
      );
    }

    return (
      <Card>
        <Title>{data.title}</Title>
        <Meta>
          <Author>{data.author}</Author>
          <time dateTime={data.createdAt}>{data.createdAt}</time>
        </Meta>
        <Content>{data.content}</Content>

        <ButtonRow>
          <SubButton type="button" onClick={handleEditStart}>수정</SubButton>
          <MainButton type="button" onClick={() => removePost(id)} disabled={isDeleting}>
            {isDeleting ? '삭제 중...' : '삭제'}
          </MainButton>
        </ButtonRow>
      </Card>
    );
  };

  return (
    <Wrapper>
      <BackButton type="button" onClick={() => navigate('/posts')}>
        ← 목록으로
      </BackButton>
      {renderContent()}
    </Wrapper>
  );
};

export default PostDetailPage;

const Wrapper = styled.section`
  width: 100%;
  max-width: 640px;
  margin: 24px auto;
  padding: 0 16px;
`;

const BackButton = styled.button`
  margin-bottom: 16px;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: transparent;
  font-size: 13px;
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme }) => theme.colors.surface};
`;

const Title = styled.h1`
  font-size: 22px;
`;

const Meta = styled.div`
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSub};
`;

const Author = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const Content = styled.p`
  padding: 12px 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const SubButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: transparent;
`;

const MainButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 700;
`;

const Message = styled.p`
  margin-top: 40px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSub};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.surface};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Textarea = styled.textarea`
  min-height: 160px;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.surface};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;