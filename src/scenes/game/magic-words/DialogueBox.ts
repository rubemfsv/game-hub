import * as PIXI from 'pixi.js';
import { AvatarBox } from './AvatarBox';

const BORDER_COLOR = 0xdaa520;
const BORDER_WIDTH = 4;
const BOX_COLOR = 0x1e1e1e;
const TEXT_COLOR = 0xffffff;

export class DialogueBox extends PIXI.Container {
  private mainBox: PIXI.Graphics;
  private contentContainer: PIXI.Container;
  private avatarBox: AvatarBox | null = null;

  constructor() {
    super();

    this.mainBox = new PIXI.Graphics();
    this.contentContainer = new PIXI.Container();

    this.addChild(this.mainBox, this.contentContainer);
  }

  public show(
    text: string,
    name: string,
    avatar: PIXI.Sprite,
    emojiTextures: Record<string, PIXI.Texture>,
    side: 'left' | 'right',
    width: number,
    height: number,
  ): void {
    this.visible = true;

    if (this.avatarBox) {
      this.removeChild(this.avatarBox);
    }

    this.avatarBox = new AvatarBox(avatar, name);
    this.addChild(this.avatarBox);

    const padding = 20;
    const avatarBoxWidth = this.avatarBox.width || 0;
    const wordWrapWidth = width - avatarBoxWidth - padding * 3;

    this.updateContent(text, emojiTextures, wordWrapWidth);
    this.redraw(side, width, height);
  }

  public hide(): void {
    this.visible = false;
  }

  private updateContent(
    text: string,
    emojiTextures: Record<string, PIXI.Texture>,
    wordWrapWidth: number,
  ): void {
    this.contentContainer.removeChildren();
    let currentX = 0;
    let currentY = 0;
    const FONT_SIZE = 20;
    const LINE_HEIGHT = FONT_SIZE * 1.4;
    const EMOJI_SIZE = FONT_SIZE * 1.2;
    const SPACE_WIDTH = 5;

    const parts = text.split(/(\{[^}]+\})/g).filter((p) => p.length > 0);

    parts.forEach((part) => {
      const emojiMatch = part.match(/\{([^}]+)\}/);
      if (emojiMatch && emojiTextures[emojiMatch[1]]) {
        const emojiName = emojiMatch[1];
        if (currentX + EMOJI_SIZE > wordWrapWidth) {
          currentX = 0;
          currentY += LINE_HEIGHT;
        }
        const emojiSprite = new PIXI.Sprite(emojiTextures[emojiName]);
        emojiSprite.width = EMOJI_SIZE;
        emojiSprite.height = EMOJI_SIZE;
        emojiSprite.y = currentY + (LINE_HEIGHT - EMOJI_SIZE) / 2;
        emojiSprite.x = currentX;
        this.contentContainer.addChild(emojiSprite);
        currentX += emojiSprite.width + SPACE_WIDTH;
      } else {
        const words = part.split(' ');
        words.forEach((word) => {
          if (word.length === 0) return;
          const textObject = new PIXI.Text(word, {
            fontSize: FONT_SIZE,
            fill: TEXT_COLOR,
          });
          if (currentX + textObject.width > wordWrapWidth) {
            currentX = 0;
            currentY += LINE_HEIGHT;
          }
          textObject.position.set(
            currentX,
            currentY + (LINE_HEIGHT - textObject.height) / 2,
          );
          this.contentContainer.addChild(textObject);
          currentX += textObject.width + SPACE_WIDTH;
        });
      }
    });
  }

  private redraw(
    side: 'left' | 'right',
    containerWidth: number,
    containerHeight: number,
  ): void {
    const padding = 20;

    this.mainBox.clear();
    this.mainBox.lineStyle(BORDER_WIDTH, BORDER_COLOR, 1);
    this.mainBox.beginFill(BOX_COLOR, 0.9);
    this.mainBox.drawRoundedRect(0, 0, containerWidth, containerHeight, 15);
    this.mainBox.endFill();

    if (!this.avatarBox) return;

    const avatarBoxWidth = this.avatarBox.width;
    const avatarBoxHeight = this.avatarBox.height;

    if (side === 'left') {
      this.avatarBox.position.set(
        padding,
        (containerHeight - avatarBoxHeight) / 2,
      );
      this.contentContainer.position.set(avatarBoxWidth + padding * 2, padding);
    } else {
      this.avatarBox.position.set(
        containerWidth - avatarBoxWidth - padding,
        (containerHeight - avatarBoxHeight) / 2,
      );
      this.contentContainer.position.set(padding, padding);
    }
  }
}
