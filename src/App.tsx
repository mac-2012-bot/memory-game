import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import { Player, Theme } from './types';
import './App.css';

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: 'Jogador 1', score: 0 },
    { id: 2, name: 'Jogador 2', score: 0 },
  ]);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);
  const [theme, setTheme] = useState<Theme>({
    name: 'Emojis',
    cards: ['🍎', '🍌', '🍒', '🍓', '🍊', '🍋', '🍉', '🍇'],
  });

  const themes: Theme[] = [
    {
      name: 'Emojis',
      cards: ['🍎', '🍌', '🍒', '🍓', '🍊', '🍋', '🍉', '🍇'],
    },
    {
      name: 'Animais',
      cards: ['🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🐨'],
    },
    {
      name: 'Símbolos',
      cards: ['★', '☆', '♠', '♣', '♥', '♦', '✿', '❀'],
    },
  ];

  const handleStartGame = () => {
    setGameStarted(true);
    setWinner(null);
  };

  const handleGameOver = (winningPlayer: Player) => {
    setWinner(winningPlayer);
  };

  const handleAddPlayer = () => {
    const newId = players.length + 1;
    setPlayers([...players, { id: newId, name: `Jogador ${newId}`, score: 0 }]);
  };

  const handleRemovePlayer = () => {
    if (players.length > 1) {
      setPlayers(players.slice(0, -1));
    }
  };

  const handleResetGame = () => {
    setGameStarted(false);
    setPlayers(
      players.map((player) => ({ ...player, score: 0 }))
    );
  };

  return (
    <div className="app">
      <h1>Jogo da Memória</h1>

      {!gameStarted ? (
        <div className="setup">
          <h2>Configuração</h2>

          <div className="players-config">
            <h3>Jogadores ({players.length})</h3>
            <div className="player-buttons">
              <button onClick={handleAddPlayer}>Adicionar Jogador</button>
              <button onClick={handleRemovePlayer}>Remover Jogador</button>
            </div>
            <div className="player-list">
              {players.map((player) => (
                <div key={player.id}>{player.name}</div>
              ))}
            </div>
          </div>

          <div className="theme-config">
            <h3>Tema</h3>
            <select
              value={theme.name}
              onChange={(e) => {
                const selectedTheme = themes.find((t) => t.name === e.target.value);
                if (selectedTheme) setTheme(selectedTheme);
              }}
            >
              {themes.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <button className="start-button" onClick={handleStartGame}>
            Iniciar Jogo
          </button>
        </div>
      ) : winner ? (
        <div className="game-over">
          <h2>🎉 {winner.name} venceu com {winner.score} pontos! 🎉</h2>
          <button onClick={handleResetGame}>Jogar Novamente</button>
        </div>
      ) : (
        <GameBoard
          players={players}
          theme={theme}
          onGameOver={handleGameOver}
        />
      )}
    </div>
  );
};

export default App;