const skyThemeStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Fredoka+One:wght@400&family=Nunito:wght@300;400;600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    .sky-container {
      height: 100vh;
      background: linear-gradient(135deg, 
        #87CEEB 0%, 
        #98D8E8 25%, 
        #B8E6B8 50%, 
        #FFE5B4 75%, 
        #FFB6C1 100%
      );
      position: relative;
      font-family: 'Nunito', sans-serif;
      animation: skyGradient 20s ease-in-out infinite;
      overflow-x: hidden;
    }
    
    @keyframes skyGradient {
      0%, 100% {
        background: linear-gradient(135deg, 
          #87CEEB 0%, 
          #98D8E8 25%, 
          #B8E6B8 50%, 
          #FFE5B4 75%, 
          #FFB6C1 100%
        );
      }
      50% {
        background: linear-gradient(135deg, 
          #4A90E2 0%, 
          #87CEEB 25%, 
          #98D8E8 50%, 
          #B8E6B8 75%, 
          #FFE5B4 100%
        );
      }
    }
    
    .sky-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        radial-gradient(circle at 20% 20%, rgba(255,255,255,0.8) 2px, transparent 2px),
        radial-gradient(circle at 80% 40%, rgba(255,255,255,0.6) 1px, transparent 1px),
        radial-gradient(circle at 40% 80%, rgba(255,255,255,0.4) 1px, transparent 1px),
        radial-gradient(circle at 90% 10%, rgba(255,255,255,0.7) 1.5px, transparent 1.5px),
        radial-gradient(circle at 10% 90%, rgba(255,255,255,0.5) 1px, transparent 1px);
      animation: twinkle 3s ease-in-out infinite alternate;
      pointer-events: none;
    }
    
    @keyframes twinkle {
      0% { opacity: 0.5; }
      100% { opacity: 1; }
    }
    
    .clouds {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      overflow: hidden;
    }
    
    .cloud {
      position: absolute;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 50px;
      opacity: 0.7;
      animation: float 20s infinite linear;
    }
    
    .cloud::before,
    .cloud::after {
      content: '';
      position: absolute;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 50px;
    }
    
    .cloud-1 {
      width: 80px;
      height: 30px;
      top: 20%;
      left: -100px;
      animation-duration: 25s;
    }
    
    .cloud-1::before {
      width: 40px;
      height: 40px;
      top: -20px;
      left: 10px;
    }
    
    .cloud-1::after {
      width: 60px;
      height: 35px;
      top: -15px;
      right: 10px;
    }
    
    .cloud-2 {
      width: 60px;
      height: 25px;
      top: 40%;
      left: -80px;
      animation-duration: 30s;
      animation-delay: -10s;
    }
    
    .cloud-2::before {
      width: 35px;
      height: 35px;
      top: -15px;
      left: 5px;
    }
    
    .cloud-2::after {
      width: 45px;
      height: 30px;
      top: -10px;
      right: 5px;
    }
    
    .cloud-3 {
      width: 100px;
      height: 35px;
      top: 60%;
      left: -120px;
      animation-duration: 35s;
      animation-delay: -20s;
    }
    
    .cloud-3::before {
      width: 50px;
      height: 50px;
      top: -25px;
      left: 15px;
    }
    
    .cloud-3::after {
      width: 70px;
      height: 40px;
      top: -20px;
      right: 15px;
    }
    
    @keyframes float {
      0% { transform: translateX(-100px); }
      100% { transform: translateX(calc(100vw + 100px)); }
    }
    
    .game-title {
      font-family: 'Fredoka One', cursive;
      font-size: 3rem;
      color: #2c5282;
      text-align: center;
      margin-bottom: 2rem;
      text-shadow: 2px 2px 4px rgba(255,255,255,0.8);
      animation: bounce 2s ease-in-out infinite;
      position: relative;
      z-index: 10;
    }
    
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    }
    
    .main-content {
        display: flex;
        min-height: 100vh;
        gap: 2rem;
        padding: 2rem;
        position: relative;
        z-index: 5;
        overflow-y: auto;
    }


    .character-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .character-card {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 25px;
      padding: 2rem;
      box-shadow: 0 15px 35px rgba(0,0,0,0.1);
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255,255,255,0.2);
      width: 100%;
      max-width: 500px;
      text-align: center;
      animation: cardFloat 6s ease-in-out infinite;
    }
    
    @keyframes cardFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    .character-display {
      width: 100%;
      height: 400px;
      border-radius: 15px;
      background: linear-gradient(135deg, #e3f2fd, #bbdefb);
      margin: 1rem 0;
      border: 3px solid #64b5f6;
      box-shadow: inset 0 4px 8px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    
    .character-emoji {
      font-size: 8rem;
      animation: characterBounce 2s ease-in-out infinite;
      text-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    
    @keyframes characterBounce {
      0%, 100% { transform: scale(1) translateY(0); }
      50% { transform: scale(1.1) translateY(-10px); }
    }
    
    .character-glow {
      position: absolute;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
      animation: glow 3s ease-in-out infinite alternate;
      pointer-events: none;
    }
    
    @keyframes glow {
      0% { opacity: 0.5; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1.2); }
    }
    
    .character-info h3 {
      color: #1565c0;
      font-family: 'Fredoka One', cursive;
      margin: 1rem 0;
      font-size: 1.8rem;
    }
    
    .character-description {
      color: #424242;
      font-size: 1.1rem;
      line-height: 1.6;
      background: rgba(255,255,255,0.8);
      padding: 1rem;
      border-radius: 15px;
      margin-top: 1rem;
    }
    
    .form-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .form-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 25px;
      padding: 2.5rem;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      backdrop-filter: blur(15px);
      border: 2px solid rgba(255,255,255,0.3);
      max-width: 600px;
      width: 100%;
      margin: 0 auto;
    }
    
    .form-title {
      font-family: 'Fredoka One', cursive;
      font-size: 2rem;
      color: #1565c0;
      text-align: center;
      margin-bottom: 2rem;
      text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
    }
    
    .form-row {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .form-group {
      flex: 1;
      margin-bottom: 1.5rem;
    }
    
    .form-label {
      display: block;
      color: #2c5282;
      font-weight: 600;
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }
    
    .form-input, .form-select {
      width: 100%;
      padding: 0.875rem 1rem;
      border: 2px solid #e3f2fd;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: rgba(255,255,255,0.9);
      color: #333;
    }
    
    .form-input:focus, .form-select:focus {
      outline: none;
      border-color: #42a5f5;
      box-shadow: 0 0 0 3px rgba(66, 165, 245, 0.2);
      transform: translateY(-2px);
    }
    
    .form-input:hover, .form-select:hover {
      border-color: #90caf9;
      transform: translateY(-1px);
    }
    
    .error-message {
      color: #e53e3e;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      font-weight: 500;
    }
    
    .submit-button {
      width: 100%;
      padding: 1rem 2rem;
      background: linear-gradient(135deg, #42a5f5, #1e88e5);
      color: white;
      border: none;
      border-radius: 15px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 1rem;
      box-shadow: 0 8px 15px rgba(66, 165, 245, 0.3);
      font-family: 'Nunito', sans-serif;
    }
    
    .submit-button:hover {
      background: linear-gradient(135deg, #1e88e5, #1565c0);
      transform: translateY(-2px);
      box-shadow: 0 12px 20px rgba(66, 165, 245, 0.4);
    }
    
    .submit-button:active {
      transform: translateY(0);
    }
    
    .submit-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
    
    .loading-spinner {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
      margin-right: 0.5rem;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .toast {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255, 255, 255, 0.95);
      color: #333;
      padding: 1rem 2rem;
      border-radius: 15px;
      box-shadow: 0 8px 15px rgba(0,0,0,0.1);
      z-index: 1000;
      font-weight: 600;
      transition: all 0.3s ease;
      opacity: 1;
      transform: translateX(-50%) translateY(0);
      pointer-events: 'auto';
    }
    
    @media (max-width: 768px) {
      .main-content {
        flex-direction: column;
        padding: 1rem;
      }
      
      .game-title {
        font-size: 2rem;
      }
      
      .form-row {
        flex-direction: column;
      }
      
      .character-display {
        height: 300px;
      }
      
      .character-emoji {
        font-size: 6rem;
      }
    }
  `;

export default skyThemeStyles;