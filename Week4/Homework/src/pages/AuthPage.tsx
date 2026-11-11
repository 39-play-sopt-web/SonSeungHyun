import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { postAuthCode } from '../apis/member';
import { AUTH_CODE_KEY, PART_KEY } from '../constants/storage';
import type { Part } from '../types/member';
import { AUTH_REQUIRED_MESSAGE, hasAuthCode } from '../utils/auth';

const PART_OPTIONS: { value: Part; label: string }[] = [
  { value: 'WEB', label: 'WEB' },
  { value: 'IOS', label: 'iOS' },
  { value: 'ANDROID', label: 'ANDROID' },
];

const AuthPage = () => {
  const navigate = useNavigate();
  const [part, setPart] = useState<Part | ''>('');

  const { mutate, isPending, isError } = useMutation({
    mutationFn: postAuthCode,
    onSuccess: (data, variables) => {
      localStorage.setItem(AUTH_CODE_KEY, data.authorizationCode);
      localStorage.setItem(PART_KEY, variables.part);
      navigate('/posts');
    },
  });

  const handlePartChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = PART_OPTIONS.find((option) => option.value === e.target.value);
    setPart(selected ? selected.value : '');
  };

  const handleIssue = () => {
    if (!part) return;
    mutate({ part });
  };

  const handleGoToList = () => {
    if (!hasAuthCode()) {
      alert(AUTH_REQUIRED_MESSAGE);
      return;
    }
    navigate('/posts');
  };

  return (
    <Wrapper>
      <Title>PLAY SOPT 게시판</Title>
      <Description>파트를 선택하면 코드가 발급됩니다.</Description>

      <Row>
        <Select value={part} onChange={handlePartChange}>
          <option value="">파트를 선택하세요</option>
          {PART_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <IssueButton onClick={handleIssue} disabled={!part || isPending}>
          {isPending ? '발급 중...' : '코드 발급받기'}
        </IssueButton>
      </Row>

      {isError && <ErrorText>코드 발급에 실패했어요. 다시 시도해 주세요.</ErrorText>}

     <ListButton onClick={handleGoToList}>게시판 목록 보기</ListButton>
    </Wrapper>
  );
};

export default AuthPage;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  width: 320px;
  min-height: 100vh;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #aaa;
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
`;

const Select = styled.select`
  flex: 1;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.surface};
`;

const IssueButton = styled.button`
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  background-color: #3f6f62;
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: #4fd1a5;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ListButton = styled.button`
  padding: 10px;
  border: 1px solid #555;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
`;

const ErrorText = styled.p`
  font-size: 13px;
  color: #ff6b6b;
`;