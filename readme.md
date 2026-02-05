<!-- Animated Background Container -->
<div align="center" style="position: relative; overflow: hidden; background: #0d1117; border-radius: 20px; padding: 40px 20px;">
  
  <!-- CSS-Only Background Glow -->
  <div style="position: absolute; top: -50px; left: -50px; width: 200px; height: 200px; background: rgba(61, 130, 239, 0.15); filter: blur(80px); border-radius: 50%; z-index: 0;"></div>
  <div style="position: absolute; bottom: -50px; right: -50px; width: 200px; height: 200px; background: rgba(138, 43, 226, 0.15); filter: blur(80px); border-radius: 50%; z-index: 0;"></div>
  
  <div style="position: relative; z-index: 1;">
    <!-- Glitch Text Effect -->
    <div class="glitch-wrapper">
      <h1 class="glitch" data-text="Hello, Coders!">
        Hello, <span style="color: #3d82ef;">&lt;Coders/&gt;</span>! 
      </h1>
    </div>
    
    <!-- Animated Avatar -->
    <div class="pulse-avatar">
      <div class="avatar-ring">
        <div class="avatar-ring-inner">
          <img src="https://avatars.githubusercontent.com/u/94266855?v=4" width="150" style="border-radius: 50%; border: 3px solid #3d82ef;" alt="Hussain Hamim"/>
        </div>
      </div>
    </div>
    
    <!-- Typewriter Effect -->
    <div class="typewriter">
      <h2>I'm <span class="highlight-text">Hussain Hamim</span> 🚀</h2>
    </div>
    
    <!-- Floating Badges -->
    <div class="floating-badges">
      <div class="badge-float" style="animation-delay: 0s;">
        <span class="badge-pulse">🤖 AI Agentic Developer</span>
      </div>
      <div class="badge-float" style="animation-delay: 0.5s;">
        <span class="badge-pulse">💻 Full-Stack Engineer</span>
      </div>
      <div class="badge-float" style="animation-delay: 1s;">
        <span class="badge-pulse">🚀 Tech Innovator</span>
      </div>
    </div>
    
    <!-- Animated Divider -->
    <div class="animated-divider">
      <div class="divider-line"></div>
      <div class="divider-dot"></div>
      <div class="divider-line"></div>
    </div>
  </div>
</div>

<style>
  /* Glitch Effect */
  .glitch-wrapper { position: relative; margin: 20px 0; }
  .glitch {
    position: relative;
    font-size: 3rem;
    font-weight: bold;
    color: white;
    letter-spacing: 3px;
    animation: glitch-anim 5s infinite;
  }
  .glitch:before, .glitch:after {
    content: attr(data-text);
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
  }
  .glitch:before {
    animation: glitch-1 2s infinite linear alternate-reverse;
    left: 2px;
    text-shadow: -2px 0 #ff00ff;
    clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
  }
  .glitch:after {
    animation: glitch-2 3s infinite linear alternate-reverse;
    left: -2px;
    text-shadow: -2px 0 #00ffff;
    clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
  }
  
  /* Pulse Avatar */
  .pulse-avatar { margin: 30px 0; position: relative; }
  .avatar-ring { position: relative; width: 160px; height: 160px; margin: 0 auto; }
  .avatar-ring:before {
    content: '';
    position: absolute;
    top: -10px; left: -10px; right: -10px; bottom: -10px;
    border: 2px solid #3d82ef;
    border-radius: 50%;
    animation: pulse-ring 2s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
  }
  .avatar-ring-inner {
    width: 150px; height: 150px; margin: 0 auto;
    border-radius: 50%; overflow: hidden;
    animation: float 6s ease-in-out infinite;
  }
  
  /* Typewriter */
  .typewriter h2 {
    overflow: hidden;
    border-right: .15em solid #3d82ef;
    white-space: nowrap;
    margin: 10px auto;
    letter-spacing: .15em;
    animation: typing 3.5s steps(30, end), blink-caret .75s step-end infinite;
    max-width: fit-content;
  }
  
  /* Badges */
  .floating-badges { display: flex; justify-content: center; gap: 15px; margin: 30px 0; flex-wrap: wrap; }
  .badge-float { animation: float-badge 4s ease-in-out infinite; }
  .badge-pulse {
    background: linear-gradient(90deg, #3d82ef, #8a2be2);
    padding: 10px 20px;
    border-radius: 30px;
    color: white;
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(61, 130, 239, 0.3);
  }
  
  /* Divider */
  .animated-divider { display: flex; align-items: center; justify-content: center; margin: 40px 0; }
  .divider-line { height: 2px; width: 80px; background: linear-gradient(90deg, transparent, #3d82ef, transparent); }
  .divider-dot { width: 10px; height: 10px; background: #3d82ef; border-radius: 50%; margin: 0 15px; animation: dot-pulse 2s ease-in-out infinite; }

  /* Animations */
  @keyframes typing { from { width: 0 } to { width: 100% } }
  @keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: #3d82ef } }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
  @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 0.5; } 100% { transform: scale(1.3); opacity: 0; } }
  @keyframes float-badge { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes dot-pulse { 0%, 100% { transform: scale(1); box-shadow: 0 0 10px #3d82ef; } 50% { transform: scale(1.3); box-shadow: 0 0 20px #00ffff; } }
  @keyframes glitch-anim { 0%, 90%, 100% { transform: none; } 92% { transform: skewX(-2deg); } 95% { transform: skewX(2deg); } }
  .highlight-text { background: linear-gradient(90deg, #3d82ef, #00ffff, #3d82ef); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shine 3s linear infinite; }
  @keyframes shine { to { background-position: 200% center; } }
</style>

## 🚀 **Expertise & Focus**
<div align="center">
  <div style="display: flex; gap: 15px; overflow-x: auto; padding: 20px 0; max-width: 100%; scrollbar-width: none;">
    <div class="tech-card">🤖 AI Agents</div>
    <div class="tech-card">🧠 RAG Systems</div>
    <div class="tech-card">⚡ Multi-Agent UX</div>
    <div class="tech-card">🌐 Full-Stack</div>
    <div class="tech-card">☁️ Cloud Arch</div>
  </div>
</div>

<style>
  .tech-card {
    background: rgba(61, 130, 239, 0.05);
    padding: 12px 25px;
    border-radius: 12px;
    border: 1px solid rgba(61, 130, 239, 0.2);
    white-space: nowrap;
    font-weight: 600;
    color: #3d82ef;
    transition: 0.3s;
  }
  .tech-card:hover {
    background: rgba(61, 130, 239, 0.15);
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(61, 130, 239, 0.3);
  }
</style>

## 🛠 **Tech Stack**
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=js,ts,react,nextjs,nodejs,express,mongodb,py,fastapi,docker,aws,git&theme=dark" />
  </a>
</p>

## 📊 **GitHub Stats**
<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=Hussain-hamim&show_icons=true&count_private=true&theme=radical&hide_border=true&bg_color=0d1117&title_color=3d82ef&icon_color=3d82ef" height="170" alt="Stats"/>
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Hussain-hamim&layout=compact&theme=radical&hide_border=true&bg_color=0d1117&title_color=3d82ef" height="170" alt="Languages"/>
</div>

<div align="center" style="margin-top: 20px;">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=Hussain-hamim&theme=radical&hide_border=true&background=0d1117&stroke=3d82ef" alt="Streak"/>
</div>

## 🏆 **Ranking**
<div align="center">
  <div style="background: linear-gradient(135deg, rgba(61, 130, 239, 0.1), rgba(0, 255, 255, 0.1)); padding: 20px; border-radius: 15px; border: 1px solid rgba(61, 130, 239, 0.3); display: inline-block;">
    <img src="https://user-badge.committers.top/afghanistan/Hussain-hamim.svg" alt="Rank"/>
    <div style="margin-top: 10px; font-weight: bold; color: #3d82ef;">🌟 Top AI Developer in Afghanistan</div>
  </div>
</div>

## 📫 **Connect With Me**
<p align="center">
  <a href="mailto:your-email@example.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" /></a>
  <a href="https://linkedin.com/in/your-profile"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
  <a href="https://twitter.com/your-handle"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" /></a>
</p>