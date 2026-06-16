import React, { useState, useEffect } from 'react';
import '../styles/Splash.css';

interface SplashProps {
  onFinish: () => void;
}

const Splash: React.FC<SplashProps> = ({ onFinish }) => {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    // Fade out 400ms antes do fim
    const hideTimer = setTimeout(() => setHiding(true), 1400);
    return () => clearTimeout(hideTimer);
  }, []);

  return (
    <div className={`splash ${hiding ? 'hiding' : ''}`} onTransitionEnd={onFinish}>
      <div className="splash-content">
        <div className="splash-icon">🧠</div>
        <h1 className="splash-title">Jogo da Memória</h1>
        <p className="splash-subtitle">A carregar...</p>
        <div className="splash-loader">
          <div className="splash-loader-bar" />
        </div>
      </div>
    </div>
  );
};

export default Splash;
