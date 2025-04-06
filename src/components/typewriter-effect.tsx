"use client";

import { useEffect, useState, useCallback } from "react";

interface TypewriterEffectProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  loopInterval?: number;
}

export function TypewriterEffect({
  text,
  className = "",
  delay = 500,
  speed = 50,
  loopInterval = 5000,
}: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // 重置打字状态
  const resetTyping = useCallback(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setIsTyping(false);
    
    // 设置延迟后重新开始打字
    const initialTimer = setTimeout(() => {
      setIsTyping(true);
    }, delay);
    
    return initialTimer;
  }, [delay]);

  // 初始化和循环
  useEffect(() => {
    // 初始延迟
    const initialTimer = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    // 设置循环定时器
    const loopTimer = setInterval(() => {
      resetTyping();
    }, loopInterval);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(loopTimer);
    };
  }, [delay, loopInterval, resetTyping]);

  // 打字效果
  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, isTyping, text, speed]);

  return (
    <div className={className}>
      <span>{displayText}</span>
      {currentIndex < text.length && (
        <span className="inline-block w-1 h-4 ml-0.5 bg-current animate-pulse" />
      )}
    </div>
  );
} 