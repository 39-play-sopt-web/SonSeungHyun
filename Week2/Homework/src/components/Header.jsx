const MENUS = [
  { id: "game", label: "게임" },
  { id: "ranking", label: "랭킹" },
];

const LEVELS = [1, 2, 3];

const Header = ({ menu, level, time, onMenuChange, onLevelChange }) => {
  return (
    <header>

      <nav>
        {MENUS.map((item) => (
          <button 
            key={item.id} 
            type="button" 
            onClick={() => onMenuChange(item.id)}>
            {item.label}
          </button>
        ))}
      </nav>

      {menu === "game" && (
        <div>
          <select value={level} onChange={onLevelChange}>
            {LEVELS.map((lv) => (
              <option key={lv} value={lv}>
                Level {lv}
              </option>
            ))}
          </select>
          <span>{time.toFixed(2)}</span>
        </div>
      )}
    </header>
  );
};

export default Header;