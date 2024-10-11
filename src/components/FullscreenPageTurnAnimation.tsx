import React, { useState, useEffect } from "react";

interface FullscreenPageTurnAnimationProps {
  onAnimationComplete: () => void;
}

const FullscreenPageTurnAnimation: React.FC<
  FullscreenPageTurnAnimationProps
> = ({ onAnimationComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      onAnimationComplete();
    }, 2000); // La animación dura 2 segundos

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <div className={`fixed inset-0 z-50 ${isAnimating ? "" : "hidden"}`}>
      <div className="page-turn-container w-full h-full relative overflow-hidden">
        <div className="page absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600">
          <div className="page-content flex items-center justify-center h-full">
            <h1 className="text-6xl font-bold text-white">Mi Biblioteca</h1>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes pageTurn {
          0% {
            transform: perspective(1200px) rotateY(0deg);
          }
          100% {
            transform: perspective(1200px) rotateY(-180deg);
          }
        }
        .page-turn-container {
          perspective: 1200px;
        }
        .page {
          transform-origin: left center;
          animation: pageTurn 2s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default FullscreenPageTurnAnimation;
