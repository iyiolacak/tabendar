import React, { useMemo } from 'react';

type DigitPattern = number[][];
type DigitPatternsMap = { [key: string]: DigitPattern };
type GreenLevelsMap = { [key: number]: string };

interface GitHubDigitProps {
  digit: string;
  brightness?: number;
  randomBrightness?: boolean;
  className?: string;
  gapSize?: string;
  showBackground?: boolean;
  withShine?: boolean;
}

interface GitHubNumberProps extends Omit<GitHubDigitProps, 'digit'> {
  number: number | string;
  digitSpacing?: string;
}

const DIGIT_PATTERNS: DigitPatternsMap = {
  '0': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],
  '1': [
    [0,0,1,0,0],
    [0,1,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,1,1,1,0]
  ],
  '2': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [0,0,0,0,1],
    [0,0,1,1,0],
    [0,1,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1]
  ],
  '3': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [0,0,0,0,1],
    [0,0,1,1,0],
    [0,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],
  '4': [
    [0,0,0,1,0],
    [0,0,1,1,0],
    [0,1,0,1,0],
    [1,0,0,1,0],
    [1,1,1,1,1],
    [0,0,0,1,0],
    [0,0,0,1,0]
  ],
  '5': [
    [1,1,1,1,1],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [0,0,0,0,1],
    [0,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],
  '6': [
    [0,1,1,1,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],
  '7': [
    [1,1,1,1,1],
    [0,0,0,0,1],
    [0,0,0,1,0],
    [0,0,1,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0]
  ],
  '8': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],
  '9': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,1],
    [0,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ]
};

const GREEN_LEVELS: GreenLevelsMap = {
  0: "bg-white/10",
  1: "bg-white/30",
  2: "bg-white/40",
  3: "bg-white/50",
  4: "bg-white/70",
  5: "bg-white",
};

const getRandomBrightness = (): number => Math.floor(Math.random() * 5) + 1;

const GitHubDigit: React.FC<GitHubDigitProps> = ({
  digit,
  brightness = 4,
  randomBrightness = false,
  className = '',
  gapSize = 'gap-0.5',
  showBackground = false,
  withShine = false,
}) => {
  const grid = DIGIT_PATTERNS[digit] || DIGIT_PATTERNS['0'];
  
  const squareBrightness = useMemo(() => {
    if (!randomBrightness) return null;
    return grid.map(row => row.map(() => getRandomBrightness()));
  }, [randomBrightness, digit]);

  return (
    <div className={`inline-flex flex-col ${gapSize} ${className}`}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className={`flex ${gapSize}`}>
          {row.map((cell, cellIndex) => {
            const squareLevel = randomBrightness && squareBrightness
              ? squareBrightness[rowIndex][cellIndex]
              : brightness;
              
            return (
              <div
                key={`${rowIndex}-${cellIndex}`}
                className={`
                  w-4 h-4
                  ${cell ? GREEN_LEVELS[squareLevel] : showBackground ? 'bg-neutral-800/25' : 'bg-transparent'}
                  rounded-sm
                  transition-shadow duration-300
                  hover:opacity-90
                  ${withShine && cell ? 'glow' : ''}
                `}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

const GitHubNumber: React.FC<GitHubNumberProps> = ({
  number,
  brightness = 4,
  randomBrightness = false,
  className = '',
  digitSpacing = 'gap-2',
  gapSize = 'gap-0.5',
  showBackground = false,
  withShine = false,
}) => {
  const digits = String(number).split('');

  return (
    <div className={`flex ${digitSpacing} ${className}`}>
      {digits.map((digit, index) => (
        <GitHubDigit
          key={index}
          digit={digit}
          brightness={brightness}
          randomBrightness={randomBrightness}
          gapSize={gapSize}
          showBackground={showBackground}
          withShine={withShine}
        />
      ))}
    </div>
  );
};

export { GitHubDigit, GitHubNumber };
