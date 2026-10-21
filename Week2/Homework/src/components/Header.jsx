import styled from "@emotion/styled";

const Head = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 56px;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fonts.md};
  font-weight: 700;
`;

const Nav = styled.nav`
  display: flex;
  gap: 8px;
`;

const MenuButton = styled.button`
  padding: 6px 14px;
  border: none;
  border-radius: ${({ theme }) => theme.radius};
  background-color: transparent;
  font-size: ${({ theme }) => theme.fonts.sm};
  cursor: pointer;

  &[aria-pressed="true"] {
    background-color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
  }
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;

const Select = styled.select`
  padding: 6px 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.radius};
  background-color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.xs};
`;

const Timer = styled.span`
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius};
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fonts.sm};
  font-weight: 700;
`;

const MENUS = [
  { id: "game", label: "게임" },
  { id: "ranking", label: "랭킹" },
];

const LEVELS = [1, 2, 3];

const Header = ({ menu, level, time, onMenuChange, onLevelChange }) => {
  return (
    <Head>
        <Title>숫자 클릭 게임</Title>
        <Nav>
            {MENUS.map((item) => (
            <MenuButton
                key={item.id} 
                type="button"
                aria-pressed={menu === item.id}
                onClick={() => onMenuChange(item.id)}>
                {item.label}
            </MenuButton>
            ))}
        </Nav>

        <Right>
            {menu === "game" && (
                <>
                <Select value={level} onChange={onLevelChange}>
                    {LEVELS.map((lv) => (
                    <option key={lv} value={lv}>
                        Level {lv} ({lv + 2}x{lv + 2})
                    </option>
                    ))}
                </Select>
                <Timer>{time.toFixed(2)}</Timer>
                </>
            )}
        </Right>
    </Head>
  );
};

export default Header;