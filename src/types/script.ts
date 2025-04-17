export interface Character {
  id: string;
  name: string;
  color: string;
  avatar?: string;
}

export interface ScriptLine {
  id: string;
  characterId: string;
  text: string;
  timestamp: number;
}

export interface Script {
  id: string;
  title: string;
  characters: Character[];
  lines: ScriptLine[];
} 