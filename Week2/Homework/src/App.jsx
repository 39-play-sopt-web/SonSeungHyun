import { useState } from 'react'
import Header from "./components/Header";
import Game from './components/Game';
import Ranking from './components/Ranking';

function App() {
  const [menu, setMenu] = useState("game");
  const [level, setLevel] = useState(1);
  const [time, setTime] = useState(0);

  const handleMenuChange = (nextMenu) => {
    setMenu(nextMenu);
  };

  const handleLevelChange = (e) => {
    setLevel(Number(e.target.value));
  };

  return (
    <>
      <Header
        menu={menu}
        level={level}
        time={time}
        onMenuChange={handleMenuChange}
        onLevelChange={handleLevelChange}
      />
      <main>
        {menu === "game" ? <Game /> : <Ranking />}
      </main>
    </>
  );
}

export default App;
