'use client';

import React, { useState, useCallback } from 'react';
import { Character, Script, ScriptLine } from '@/types/script';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// 示例数据
const sampleCharacters: Character[] = [
  { id: '1', name: '张牧之', color: '#F44336', avatar: '/avatars/script/zhang-avatar.jpg' },
  { id: '2', name: '黄四郎', color: '#2196F3', avatar: '/avatars/script/huang-avatar.jpg' },
  { id: '3', name: '老汤', color: '#4CAF50', avatar: '/avatars/script/tang-avatar.jpg' },
];

const sampleLines: ScriptLine[] = [
  { id: '1', characterId: '2', text: '我是做什么生意的？明白吗？', timestamp: 0 },
  { id: '2', characterId: '1', text: '不明白。', timestamp: 2000 },
  { id: '3', characterId: '3', text: '小半个民国的烟土都是黄老爷您在贩卖，南国皆知！', timestamp: 4000 },
  { id: '4', characterId: '2', text: '错！我不过是给刘都统当跑腿的。而且只是其中一条腿。', timestamp: 6000 },
  { id: '5', characterId: '1', text: '那么刘都统到底有几条腿呢？', timestamp: 8000 },
  { id: '6', characterId: '3', text: '三条呗。', timestamp: 10000 },
  { id: '7', characterId: '1', text: '对呀！', timestamp: 12000 },
  { id: '8', characterId: '3', text: '黄老爷还是条大腿！', timestamp: 14000 },
  { id: '9', characterId: '2', text: '对！（将腿撂在桌上）大腿！可是我这条腿，断了！', timestamp: 16000 },
];

const sampleScript: Script = {
  id: '1',
  title: '鸿门宴',
  characters: sampleCharacters,
  lines: sampleLines,
};

export default function ScriptViewer() {
  const [script] = useState<Script>(sampleScript);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [displayedLines, setDisplayedLines] = useState<ScriptLine[]>([]);
  const [currentText, setCurrentText] = useState<string>('');
  const [textIndex, setTextIndex] = useState<number>(0);
  const [showAllLines, setShowAllLines] = useState<boolean>(false);

  const getCharacterById = (id: string): Character | undefined => {
    return script.characters.find(char => char.id === id);
  };

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    setCurrentLineIndex(0);
    setDisplayedLines([script.lines[0]]);
  }, [script.lines]);

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setCurrentLineIndex(-1);
    setDisplayedLines([]);
    setCurrentText('');
    setTextIndex(0);
    setShowAllLines(false);
  }, []);

  const showAllDialogLines = useCallback(() => {
    setDisplayedLines(script.lines);
    setShowAllLines(true);
    setIsPlaying(false);
    setCurrentText('');
    setTextIndex(0);
  }, [script.lines]);

  const handleNextLine = useCallback(() => {
    if (currentLineIndex < script.lines.length - 1) {
      const nextIndex = currentLineIndex + 1;
      setCurrentLineIndex(nextIndex);
      setDisplayedLines([...displayedLines, script.lines[nextIndex]]);
      setTextIndex(0);
      setCurrentText('');
    } else {
      setIsPlaying(false);
    }
  }, [currentLineIndex, script.lines, displayedLines]);

  // 添加打字效果
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying && currentLineIndex >= 0 && !showAllLines) {
      const currentLine = script.lines[currentLineIndex];
      if (textIndex < currentLine.text.length) {
        timer = setTimeout(() => {
          setCurrentText(prev => prev + currentLine.text[textIndex]);
          setTextIndex(prev => prev + 1);
        }, 100); // 每个字之间的延迟时间
      } else if (currentLineIndex < script.lines.length - 1) {
        const nextLine = script.lines[currentLineIndex + 1];
        const delay = nextLine.timestamp - currentLine.timestamp;
        timer = setTimeout(() => {
          handleNextLine();
        }, delay);
      }
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentLineIndex, textIndex, handleNextLine, script.lines, showAllLines]);

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-4">
        <Button 
          onClick={isPlaying ? handlePause : handlePlay}
          variant={isPlaying ? "destructive" : "default"}
        >
          {isPlaying ? '暂停' : '播放'}
        </Button>
        <Button 
          onClick={showAllLines ? handleReset : showAllDialogLines} 
          variant="outline"
        >
          {showAllLines ? '重置' : '显示全部'}
        </Button>
      </div>

      <div className="flex justify-center space-x-8 mb-8">
        {script.characters.map(character => (
          <div key={character.id} className="flex flex-col items-center">
            <Avatar className="h-16 w-16 border-2 overflow-hidden" style={{ borderColor: character.color }}>
              <AvatarImage src={character.avatar} className="object-cover" />
              <AvatarFallback className="rounded-full">{character.name.substring(0, 3)}</AvatarFallback>
            </Avatar>
            <span className="mt-2 font-medium">{character.name}</span>
          </div>
        ))}
      </div>

      <Card className="w-full max-w-3xl mx-auto">
        <CardContent className="p-6">
          <div className="space-y-4">
            {displayedLines.map((line, index) => {
              const character = getCharacterById(line.characterId);
              const isCurrentLine = index === displayedLines.length - 1;
              return (
                <div 
                  key={line.id} 
                  className="flex items-start space-x-3 p-3 rounded-lg"
                  style={{ backgroundColor: `${character?.color}15` }}
                >
                  <Avatar className="h-10 w-10 overflow-hidden" style={{ borderColor: character?.color, borderWidth: '2px', borderStyle: 'solid' }}>
                    <AvatarImage src={character?.avatar} className="object-cover" />
                    <AvatarFallback className="rounded-full">{character?.name.substring(0, 1)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium" style={{ color: character?.color }}>
                      {character?.name}
                    </div>
                    <div className="mt-1">
                      {showAllLines ? line.text : (isCurrentLine ? currentText : line.text)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 