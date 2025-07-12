import * as PIXI from 'pixi.js';

const BORDER_COLOR = 0xdaa520;
const BORDER_WIDTH = 4;
const NAME_TEXT_COLOR = 0xffffff;
const BOX_COLOR = 0x1e1e1e;

export class AvatarBox extends PIXI.Container {
  private frame: PIXI.Graphics;
  private avatar: PIXI.Sprite;
  private nameText: PIXI.Text;
  private nameBackground: PIXI.Graphics;

  constructor(avatar: PIXI.Sprite, name: string) {
    super();

    this.frame = new PIXI.Graphics();
    this.nameBackground = new PIXI.Graphics();
    this.avatar = avatar;
    this.nameText = new PIXI.Text(name, {
      fontFamily: 'Arial',
      fontSize: 18,
      fill: NAME_TEXT_COLOR,
      fontWeight: 'bold',
    });
    this.nameText.anchor.set(0.5, 0.5);

    this.addChild(this.frame, this.avatar, this.nameBackground, this.nameText);

    this.redraw();
  }

  private redraw(): void {
    const avatarSize = 100;
    const padding = 10;
    const frameSize = avatarSize + padding * 2;
    const nameTagHeight = 30;

    this.frame.clear();
    this.frame.lineStyle(BORDER_WIDTH, BORDER_COLOR, 1);
    this.frame.beginFill(0x000000);
    this.frame.drawRect(0, 0, frameSize, frameSize);
    this.frame.endFill();

    this.avatar.width = avatarSize;
    this.avatar.height = avatarSize;
    this.avatar.anchor.set(0.5, 0.5);
    this.avatar.position.set(frameSize / 2, frameSize / 2);

    const nameTagWidth = this.nameText.width + 20;
    this.nameBackground.clear();
    this.nameBackground.beginFill(BOX_COLOR);
    this.nameBackground.drawRect(0, 0, nameTagWidth, nameTagHeight);
    this.nameBackground.endFill();
    this.nameBackground.position.set(
      (frameSize - nameTagWidth) / 2,
      frameSize + 5,
    );

    this.nameText.position.set(
      this.nameBackground.x + nameTagWidth / 2,
      this.nameBackground.y + nameTagHeight / 2,
    );
  }
}
