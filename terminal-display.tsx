import React, { useState, useEffect } from 'react';

const TerminalDisplay = () => {
  const messages = {
    header: 'SYSTEM INITIALIZATION',
    status: 'BUILDING MINDFULNESS INTERFACE v2.0',
    processingSteps: [
      'COMPILING NEURAL NETWORKS ...',
      'CALIBRATING SOUND ENGINES ...',
      'OPTIMIZING AI MODELS ...'
    ],
    mainMessage: [
      '[ DEAR REAKTOR.BERLIN TEAM ]',
      '--------------------------------',
      'WHILE OUR INTERFACE IS UNDER CONSTRUCTION',
      'WE ARE WORKING ON SOMETHING SPECIAL FOR YOU',
      'IN THE NEXT FEW DAYS',
      '--------------------------------',
      'BlankBack',
      'TRANSFORMING MINDFULNESS THROUGH ADAPTIVE AI'
    ]
  };

  const [currentText, setCurrentText] = useState('');
  const [phase, setPhase] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [processIndex, setProcessIndex] = useState(-1);
  const [showMainMessage, setShowMainMessage] = useState(false);

  // Handle binary animation for a single text
  const animateBinary = (targetText, onComplete) => {
    if (!targetText) return;
    
    let currentChar = 0;
    let cycleCount = 0;
    const maxCycles = 2;

    setCurrentText(Array(targetText.length).fill('0').join(''));

    const animate = () => {
      if (currentChar < targetText.length) {
        setCurrentText(prev => {
          const chars = prev?.split('') || [];
          if (currentChar >= chars.length) return prev;
          if (cycleCount < maxCycles) {
            chars[currentChar] = Math.random() > 0.5 ? '1' : '0';
            cycleCount++;
          } else {
            chars[currentChar] = targetText[currentChar];
            cycleCount = 0;
            currentChar++;
          }
          return chars.join('');
        });
      } else {
        clearInterval(interval);
        if (onComplete) {
          onComplete();
        }
      }
    };

    const interval = setInterval(animate, 20);
    return () => clearInterval(interval);
  };

  // Handle phase transitions
  useEffect(() => {
    switch (phase) {
      case 0: // Initial header
        animateBinary(messages.header, () => {
          setTimeout(() => setPhase(1), 500);
        });
        break;

      case 1: // Status message
        animateBinary(messages.status, () => {
          setTimeout(() => {
            setShowProgress(true);
            setPhase(2);
          }, 500);
        });
        break;

      case 2: // Process steps
        if (processIndex >= 0 && processIndex < messages.processingSteps.length) {
          animateBinary(messages.processingSteps[processIndex], () => {
            setTimeout(() => {
              if (processIndex < messages.processingSteps.length - 1) {
                setProcessIndex(prev => prev + 1);
              } else {
                setShowMainMessage(true);
              }
            }, 500);
          });
        }
        break;

      default:
        break;
    }
  }, [phase, processIndex]);

  return (
    <div className="min-h-screen bg-black text-white font-mono p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-8">
        {/* Current animated text */}
        <div className="text-lg whitespace-pre">{currentText}</div>

        {/* Progress bar */}
        {showProgress && (
          <div className="w-48 h-1 bg-white/20">
            <div 
              className="h-full bg-white animate-progress"
              onAnimationEnd={() => {
                setProcessIndex(0);
                setPhase(2);
              }}
            />
          </div>
        )}

        {/* Main message */}
        {showMainMessage && (
          <div className="space-y-2 mt-12">
            {messages.mainMessage.map((line, idx) => (
              <div 
                key={idx}
                style={{ 
                  textAlign: idx === 0 || idx === messages.mainMessage.length - 1 ? 'center' : 'left'
                }}
              >
                {line}
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @font-face {
          font-family: 'iA Writer Quattro';
          src: url('https://cdnjs.cloudflare.com/ajax/libs/iawriter-quattro/1.0.0/iAWriterQuattroS-Regular.woff2') format('woff2');
        }

        .font-mono {
          font-family: 'iA Writer Quattro', monospace;
          letter-spacing: -0.03em;
        }

        @keyframes progress {
          from { width: 0; }
          to { width: 100%; }
        }

        .animate-progress {
          animation: progress 3s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default TerminalDisplay;