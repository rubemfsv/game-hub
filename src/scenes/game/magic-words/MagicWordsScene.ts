import * as PIXI from 'pixi.js';
import { BaseScene } from 'scenes/BaseScene';
import { DialogueBox } from './DialogueBox';
import { MagicWordsData } from './types';
import { Button } from 'ui/Button';
import { fetchMagicWordsData } from 'infra/api';
import { ResourceManager } from './ResourceManager';

const BACKGROUND_IMAGE = '/assets/images/parallax-space-backgound.png';

/**
 * Scene that demonstrates an interactive visual novel-style scene that showcases the "Magic Words" dialogue system.
 *
 * It loads dialogue data from an API, fetches required emoji and avatar assets, and renders
 * a dynamic dialogue box with type-safe support for inline emojis (e.g. `{smile}`).
 */
export class MagicWordsScene extends BaseScene {
  private background: PIXI.TilingSprite | null = null;
  private dialogueBox: DialogueBox | null = null;
  private currentLine = 0;
  private data: MagicWordsData | null = null;
  private emojiTextures: Record<string, PIXI.Texture> = {};
  private avatarSprites: Record<string, PIXI.Sprite> = {};
  private nextButton: Button | null = null;

  /**
   * @param game - Reference to the main `Game` singleton.
   */
  constructor(game: any) {
    super(game, 'Magic Words');
    this.loadGameData();
  }

  /**
   * Asynchronously fetch JSON data and pre-load all remote assets before initialising the scene.
   */
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

  /**
   * Called once assets & data are ready: constructs display objects and positions them.
   */
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

  /**
   * Advance the dialogue index, looping back to the start when finished.
   */
  private nextDialogueLine(): void {
    if (!this.data) return;

    if (this.currentLine >= this.data.dialogue.length - 1) {
      this.currentLine = 0;
    } else {
      this.currentLine++;
    }
    this.showCurrentDialogueLine();
  }

  /**
   * Render current dialogue line with correct avatar, text, and emoji sprites.
   */
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

  /**
   * Keep background and UI responsive to viewport changes.
   */
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

  /**
   * Clean-up; currently defers to `BaseScene` but provided for future resource disposal.
   */
  public destroy(options?: PIXI.IDestroyOptions | boolean): void {
    super.destroy(options);
  }
}
