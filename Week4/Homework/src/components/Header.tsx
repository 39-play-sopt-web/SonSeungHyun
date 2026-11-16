import { NavLink, useNavigate } from 'react-router';
import styled from '@emotion/styled';
import { AUTH_CODE_KEY, PART_KEY } from '../constants/storage';
import { PART_OPTIONS } from '../constants/part';

const Header = () => {
  const navigate = useNavigate();

  const savedPart = localStorage.getItem(PART_KEY);
  const partLabel = PART_OPTIONS.find((option) => option.value === savedPart)?.label;

  const handleLogout = () => {
    localStorage.removeItem(AUTH_CODE_KEY);
    localStorage.removeItem(PART_KEY);
    navigate('/');
  };

  return (
    <Wrapper>
      <Left>
        <Logo to="/posts">
          PLAY SOPT <strong>BOARD</strong>
        </Logo>
        {partLabel && <Badge>{partLabel} 파트</Badge>}
      </Left>

      <Nav>
        <MenuLink to="/posts" end>
          게시글 목록
        </MenuLink>
        <MenuLink to="/posts/new">글쓰기</MenuLink>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </Nav>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Logo = styled(NavLink)`
  font-size: 20px;
  font-weight: 700;

  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Badge = styled.span`
  padding: 4px 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  font-size: 14px;
`;

const MenuLink = styled(NavLink)`
  transition: color 0.2s ease;
  &.active,
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LogoutButton = styled.button`
  border: none;
  background: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;