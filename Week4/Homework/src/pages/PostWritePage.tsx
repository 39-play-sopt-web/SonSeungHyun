import { useState } from 'react';
import type { ChangeEvent, SubmitEvent } from 'react';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { createPost } from '../apis/post';
import type { CreatePostRequest } from '../types/post';

type Step = {
  key: keyof CreatePostRequest;
  label: string;
  placeholder: string;
  maxLength: number;
  errorMessage: string;
  multiline: boolean;
};

const STEPS: Step[] = [
  {
    key: 'title',
    label: '제목',
    placeholder: '제목을 입력하세요',
    maxLength: 50,
    errorMessage: '제목은 50자가 넘어가면 안됩니다!!',
    multiline: false,
  },
  {
    key: 'content',
    label: '본문',
    placeholder: '본문을 입력하세요',
    maxLength: 1000,
    errorMessage: '본문은 1000자가 넘어가면 안됩니다!!',
    multiline: true,
  },
  {
    key: 'author',
    label: '작성자',
    placeholder: '작성자 닉네임을 입력하세요',
    maxLength: 20,
    errorMessage: '작성자 닉네임은 20자를 넘어가면 안됩니다!!',
    multiline: false,
  },
];

const INITIAL_FORM: CreatePostRequest = { title: '', content: '', author: '' };

const PostWritePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<CreatePostRequest>(INITIAL_FORM);
  const [stepIndex, setStepIndex] = useState(0);

  const currentStep = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;
  const value = form[currentStep.key];
  const isOverLimit = value.length > currentStep.maxLength;
  const canProceed = value.trim() !== '' && !isOverLimit;

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [currentStep.key]: e.target.value }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canProceed) return;

    if (!isLastStep) {
      setStepIndex((prev) => prev + 1);
      return;
    }

    mutate({
      title: form.title.trim(),
      content: form.content.trim(),
      author: form.author.trim(),
    });
  };

  const fieldProps = {
    id: currentStep.key,
    value,
    onChange: handleChange,
    placeholder: currentStep.placeholder,
    autoFocus: true,
    'aria-invalid': isOverLimit,
  };

  return (
    <Wrapper>
      <Title>글쓰기</Title>

      <Form onSubmit={handleSubmit} key={currentStep.key}>
        <Field>
          <Label htmlFor={currentStep.key}>{currentStep.label}</Label>
          {currentStep.multiline ? (
            <Textarea {...fieldProps} $isError={isOverLimit} />
          ) : (
            <Input {...fieldProps} $isError={isOverLimit} />
          )}
          <FieldFooter>
            {isOverLimit && <ErrorText>{currentStep.errorMessage}</ErrorText>}
            <Counter $isError={isOverLimit}>
              {value.length} / {currentStep.maxLength}
            </Counter>
          </FieldFooter>
        </Field>

        <ButtonRow>
          <SubButton type="button" onClick={() => navigate('/posts')}>
            목록으로
          </SubButton>
          <MainButton type="submit" disabled={!canProceed || isPending}>
            {isLastStep ? (isPending ? '작성 중...' : '작성') : '다음'}
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

const Input = styled.input<{ $isError: boolean }>`
  padding: 10px 12px;
  border: 1px solid
    ${({ theme, $isError }) => ($isError ? theme.colors.error : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.surface};

  &:focus {
    outline: none;
    border-color: ${({ theme, $isError }) =>
      $isError ? theme.colors.error : theme.colors.primary};
  }
`;

const Textarea = styled.textarea<{ $isError: boolean }>`
  min-height: 160px;
  padding: 10px 12px;
  border: 1px solid
    ${({ theme, $isError }) => ($isError ? theme.colors.error : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.surface};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme, $isError }) =>
      $isError ? theme.colors.error : theme.colors.primary};
  }
`;

const FieldFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ErrorText = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
`;

const Counter = styled.span<{ $isError: boolean }>`
  margin-left: auto;
  font-size: 12px;
  color: ${({ theme, $isError }) => ($isError ? theme.colors.error : theme.colors.textSub)};
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