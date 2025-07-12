import * as PIXI from 'pixi.js';
import { MagicWordsData } from './types';

export class ResourceManager {
  private data: MagicWordsData;

  constructor(data: MagicWordsData) {
    this.data = data;
  }

  public async loadAssets(): Promise<{
    emojiTextures: Record<string, PIXI.Texture>;
    avatarSprites: Record<string, PIXI.Sprite>;
  }> {
    const allEmojiNames = this.getAllEmojiNames();
    const { assetsToLoad: emojiAssets, emojiUrlMap } =
      this.prepareAssetUrls(allEmojiNames);

    const allCharacterNames = this.getAllCharacterNames();
    const { assetsToLoad: avatarAssets, avatarUrlMap } =
      this.prepareAvatarUrls(allCharacterNames);

    await PIXI.Assets.load([...emojiAssets, ...avatarAssets]);

    const emojiTextures = this.createEmojiTextures(allEmojiNames, emojiUrlMap);
    const avatarSprites = this.createAvatarSprites(
      allCharacterNames,
      avatarUrlMap,
    );

    return { emojiTextures, avatarSprites };
  }

  private getAllEmojiNames(): Set<string> {
    const allEmojiNames = new Set<string>();
    const emojiRegex = /\{([^}]+)\}/g;
    this.data.dialogue.forEach((line) => {
      const matches = line.text.match(emojiRegex);
      if (matches) {
        matches.forEach((match) => {
          const emojiName = match.slice(1, -1);
          allEmojiNames.add(emojiName);
        });
      }
    });
    return allEmojiNames;
  }

  private getAllCharacterNames(): Set<string> {
    const allCharacterNames = new Set<string>();
    this.data.dialogue.forEach((line) => {
      allCharacterNames.add(line.name);
    });
    return allCharacterNames;
  }

  private prepareAssetUrls(allEmojiNames: Set<string>): {
    assetsToLoad: { alias: string; src: string }[];
    emojiUrlMap: Map<string, string>;
  } {
    const apiEmojis = new Map(this.data.emojies.map((e) => [e.name, e.url]));
    const assetsToLoad: { alias: string; src: string }[] = [];
    const emojiUrlMap = new Map<string, string>();

    allEmojiNames.forEach((name) => {
      const url =
        apiEmojis.get(name) ||
        `https://api.dicebear.com/9.x/fun-emoji/png?seed=${name}`;
      assetsToLoad.push({ alias: name, src: url });
      emojiUrlMap.set(name, url);
    });

    this.data.avatars.forEach((avatar) => {
      assetsToLoad.push({ alias: avatar.name, src: avatar.url });
    });

    return { assetsToLoad, emojiUrlMap };
  }

  private createEmojiTextures(
    allEmojiNames: Set<string>,
    emojiUrlMap: Map<string, string>,
  ): Record<string, PIXI.Texture> {
    const emojiTextures: Record<string, PIXI.Texture> = {};
    allEmojiNames.forEach((name) => {
      const url = emojiUrlMap.get(name)!;
      emojiTextures[name] = PIXI.Texture.from(url);
    });
    return emojiTextures;
  }

  private prepareAvatarUrls(characterNames: Set<string>): {
    assetsToLoad: { alias: string; src: string }[];
    avatarUrlMap: Map<string, string>;
  } {
    const assetsToLoad: { alias: string; src: string }[] = [];
    const avatarUrlMap = new Map<string, string>();
    const fallbackUrl = 'https://api.dicebear.com/9.x/personas/png';

    characterNames.forEach((name) => {
      const existingAvatar = this.data.avatars.find((a) => a.name === name);
      const url =
        existingAvatar?.url ??
        `${fallbackUrl}?seed=${encodeURIComponent(name)}`;

      assetsToLoad.push({ alias: name, src: url });
      avatarUrlMap.set(name, url);
    });

    return { assetsToLoad, avatarUrlMap };
  }

  private createAvatarSprites(
    characterNames: Set<string>,
    avatarUrlMap: Map<string, string>,
  ): Record<string, PIXI.Sprite> {
    const avatarSprites: Record<string, PIXI.Sprite> = {};
    characterNames.forEach((name) => {
      const url = avatarUrlMap.get(name);
      if (url) {
        const sprite = PIXI.Sprite.from(url);
        sprite.anchor.set(0.5);
        avatarSprites[name] = sprite;
      }
    });
    return avatarSprites;
  }
}
