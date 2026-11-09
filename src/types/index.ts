export interface Milestone {
  id: number;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: 'sparkles' | 'heart' | 'ring' | 'coffee' | 'music' | 'stars';
  tag: string;
}

export interface PolaroidPhoto {
  id: number;
  title: string;
  caption: string;
  date: string;
  image: string;
  rotation: string; // e.g. -rotate-2, rotate-3
}

export interface LoveQuote {
  id: number;
  quote: string;
  category: 'sweet' | 'humorous' | 'deep' | 'promise';
  emoji: string;
}
