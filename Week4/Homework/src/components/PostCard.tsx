import { useNavigate } from 'react-router';
import styled from '@emotion/styled';
import type { Post } from '../types/post';
import {formatDate} from '../utils/date';

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/posts/${post.id}`)}>
      <Title>{post.title}</Title>
      <Content>{post.content}</Content>
      <Meta>
        <Author>{post.author}</Author>
        <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
      </Meta>
    </Card>
  );
};

export default PostCard;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 12px rgba(79, 209, 165, 0.3);
  }
`;

const Title = styled.h2`
  font-size: 16px;
`;

const Content = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSub};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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