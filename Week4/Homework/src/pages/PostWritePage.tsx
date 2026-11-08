import { useState } from 'react';
import type { ChangeEvent, SubmitEvent } from 'react';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { createPost } from '../apis/post';
import type { CreatePostRequest } from '../types/post';

const INITIAL_FORM: CreatePostRequest = { title: '', content: '', author: '' };

const PostWritePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<CreatePostRequest>(INITIAL_FORM);

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['posts', 'list'] });
      alert(`${variables.author}님, 게시글이 작성되었어요!`);
      navigate('/posts');
    },
    onError: () => {
      alert('게시글 작성에 실패했어요. 다시 시도해 주세요.');
    },
  });

  const handleChange =
    (key: keyof CreatePostRequest) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const isFormValid =
    form.title.trim() !== '' && form.content.trim() !== '' && form.author.trim() !== '';

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    mutate({
      title: form.title.trim(),
      content: form.content.trim(),
      author: form.author.trim(),
    });
  };

  return (
    <Wrapper>
      <Title>글쓰기</Title>

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            value={form.title}
            onChange={handleChange('title')}
            placeholder="제목을 입력하세요"
          />
        </Field>

        <Field>
          <Label htmlFor="content">본문</Label>
          <Textarea
            id="content"
            value={form.content}
            onChange={handleChange('content')}
            placeholder="본문을 입력하세요"
          />
        </Field>

        <Field>
          <Label htmlFor="author">작성자</Label>
          <Input
            id="author"
            value={form.author}
            onChange={handleChange('author')}
            placeholder="작성자 닉네임을 입력하세요"
          />
        </Field>

        <ButtonRow>
          <SubButton type="button" onClick={() => navigate('/posts')}>
            목록으로
          </SubButton>
          <MainButton type="submit" disabled={!isFormValid || isPending}>
            {isPending ? '작성 중...' : '작성'}
          </MainButton>
        </ButtonRow>
      </Form>
    </Wrapper>
  );
};

export default PostWritePage;

const Wrapper = styled.section`
  width: 100%;
  max-width: 640px;
  margin: 24px auto;
  padding: 0 16px;
`;

const Title = styled.h1`
  margin-bottom: 24px;
  font-size: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const SubButton = styled.button`
  padding: 10px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: transparent;
`;

const MainButton = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 700;
  transition: opacity 0.2s ease;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;