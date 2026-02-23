import React, { useEffect, useState } from 'react';

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEnterApp = () => {
    // Add your navigation logic here
    console.log('Navigating to main app...');
    // Example: navigate('/dashboard');
  };

  const particles = Array.from({ length: 9 }, (_, i) => (
    <div
      key={i}
      className="particle absolute w-1 h-1 bg-white bg-opacity-50 rounded-full"
      style={{
        left: `${(i + 1) * 10}%`,
        transform: `translate(${mousePosition.x * (i + 1) * 0.01}px, ${mousePosition.y * (i + 1) * 0.01}px)`,
        animationDelay: `${i * 0.5}s`,
        animation: 'float 6s ease-in-out infinite'
      }}
    />
  ));

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-blue-900 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-30 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1489599558318-2aa4b7f2ad37?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
        }}
      />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-slate-900/70 to-blue-900/80" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles}
      </div>
      
      {/* Main Logo Content */}
      <div className="relative z-10 text-center animate-fade-in-up">
        <h1 className="logo-text text-6xl md:text-8xl font-black text-white mb-4 relative inline-block">
          <span className="absolute inset-0 bg-gradient-to-r from-red-400 via-teal-400 to-blue-400 bg-clip-text text-transparent animate-gradient-shift">
            DAZE
          </span>
          <span className="relative">DAZE</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 font-light mb-8 animate-fade-in-up-delay">
          Discover Your Next Favorite Movie
        </p>
        
        <button 
          onClick={handleEnterApp}
          className="bg-gradient-to-r from-red-400 to-teal-400 text-white font-semibold py-4 px-10 rounded-full text-lg uppercase tracking-wider transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-red-400/30 animate-fade-in-up-delay-2"
        >
          Enter the Experience
        </button>
      </div>
      
      {/* Navigation Hint */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-white/60 animate-fade-in-up-delay-3">
        <div className="text-2xl animate-bounce mb-2">↓</div>
        <p className="text-sm">Scroll to explore</p>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Poppins:wght@300;400;600&display=swap');
        
        .logo-text {
          font-family: 'Orbitron', monospace;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
          animation: glow 3s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
          from {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
          }
          to {
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 107, 107, 0.3);
          }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient-shift {
          background-size: 400% 400%;
          animation: gradient-shift 4s ease-in-out infinite;
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 2s ease-out;
        }
        
        .animate-fade-in-up-delay {
          opacity: 0;
          animation: fade-in-up 2s ease-out 0.5s forwards;
        }
        
        .animate-fade-in-up-delay-2 {
          opacity: 0;
          animation: fade-in-up 2s ease-out 1s forwards;
        }
        
        .animate-fade-in-up-delay-3 {
          opacity: 0;
          animation: fade-in-up 2s ease-out 1.5s forwards;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
        }
        
        .particle {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;