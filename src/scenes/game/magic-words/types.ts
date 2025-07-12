export interface Emoji {
  name: string;
  url: string;
}

export interface Avatar {
  name: string;
  url: string;
  position: 'left' | 'right';
}

export interface DialogueLine {
  name: string;
  text: string;
}

export interface MagicWordsData {
  dialogue: DialogueLine[];
  emojies: Emoji[];
  avatars: Avatar[];
}
