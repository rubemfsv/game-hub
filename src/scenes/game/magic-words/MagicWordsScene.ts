import * as PIXI from 'pixi.js';
import { BaseScene } from 'scenes/BaseScene';
import { DialogueBox } from './DialogueBox';
import { MagicWordsData } from './types';
import { Button } from 'ui/Button';
import { fetchMagicWordsData } from 'infra/api';
import { ResourceManager } from './ResourceManager';

const BACKGROUND_IMAGE = '/assets/images/parallax-space-backgound.png';

export class MagicWordsScene extends BaseScene {
  private background: PIXI.TilingSprite | null = null;
  private dialogueBox: DialogueBox | null = null;
  private currentLine = 0;
  private data: MagicWordsData | null = null;
  private emojiTextures: Record<string, PIXI.Texture> = {};
  private avatarSprites: Record<string, PIXI.Sprite> = {};
  private nextButton: Button | null = null;

  constructor(game: any) {
    super(game, 'Magic Words');
    this.loadGameData();
  }

  private async loadGameData(): Promise<void> {
    try {
      const [data] = await Promise.all([
        fetchMagicWordsData(),
        PIXI.Assets.load(BACKGROUND_IMAGE),
      ]);

      this.data = data;
      const resourceManager = new ResourceManager(this.data);
      const { emojiTextures, avatarSprites } =
        await resourceManager.loadAssets();

      this.emojiTextures = emojiTextures;
      this.avatarSprites = avatarSprites;

      Object.values(this.avatarSprites).forEach((sprite) =>
        this.addChild(sprite),
      );

      this.initializeScene();
    } catch (error) {
      console.error('Failed to load game data:', error);
    }
  }

  private initializeScene(): void {
    if (!this.data) return;

    const { width, height } = this.game.getApp().screen;

    const bgTexture = PIXI.Texture.from(BACKGROUND_IMAGE);
    this.background = new PIXI.TilingSprite(bgTexture);
    this.addChildAt(this.background, 0);

    this.dialogueBox = new DialogueBox();
    this.addChild(this.dialogueBox);

    this.nextButton = new Button('Next', () => this.nextDialogueLine());
    this.addChild(this.nextButton);

    this.showCurrentDialogueLine();
    this.onResize(width, height);
  }

  private nextDialogueLine(): void {
    if (!this.data) return;

    if (this.currentLine >= this.data.dialogue.length - 1) {
      this.currentLine = 0;
    } else {
      this.currentLine++;
    }
    this.showCurrentDialogueLine();
  }

  private showCurrentDialogueLine(): void {
    if (!this.data || !this.dialogueBox) return;

    const line = this.data.dialogue[this.currentLine];
    const avatarData = this.data.avatars.find((a) => a.name === line.name);
    const position = avatarData ? avatarData.position : 'left';
    const avatarSprite = this.avatarSprites[line.name];

    if (line && avatarSprite) {
      const { width, height } = this.game.getApp().screen;
      const dialogueWidth = width * 0.8;
      const dialogueHeight = height * 0.25;

      this.dialogueBox.show(
        line.text,
        line.name,
        avatarSprite,
        this.emojiTextures,
        position,
        dialogueWidth,
        dialogueHeight,
      );

      this.dialogueBox.position.set(
        (width - dialogueWidth) / 2,
        (height - dialogueHeight) / 2,
      );

      Object.values(this.avatarSprites).forEach(
        (sprite) => (sprite.visible = false),
      );
      avatarSprite.visible = true;

      if (this.nextButton) {
        const buttonText =
          this.currentLine >= this.data.dialogue.length - 1
            ? 'Play Again'
            : 'Next';
        this.nextButton.setText(buttonText);
      }
    } else {
      this.dialogueBox.hide();
    }
  }

  public onResize(width: number, height: number): void {
    super.onResize(width, height);

    if (this.background) {
      this.background.tileScale.set(10);
      this.background.width = width;
      this.background.height = height;
    }

    if (this.dialogueBox && this.dialogueBox.visible) {
      this.showCurrentDialogueLine();
    }

    if (this.nextButton && this.dialogueBox) {
      const dialogueY = this.dialogueBox.y;
      const dialogueHeight = this.dialogueBox.height;
      this.nextButton.redraw(width * 0.3, 50);
      this.nextButton.position.set(
        width / 2 - this.nextButton.width / 2,
        dialogueY + dialogueHeight + 20,
      );
    }
  }

  public destroy(options?: PIXI.IDestroyOptions | boolean): void {
    super.destroy(options);
  }
}
