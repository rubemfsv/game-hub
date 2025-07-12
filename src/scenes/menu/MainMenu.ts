import * as PIXI from 'pixi.js';
import { AceOfShadowsScene } from 'scenes/game/ace-of-shadows/AceOfShadowsScene';
import { MagicWordsScene } from 'scenes/game/magic-words/MagicWordsScene';
import { PhoenixFlameScene } from 'scenes/game/phoenix-flame/PhoenixFlameScene';
import { Button } from 'ui/Button';

const BACKGROUND_IMAGE = '/assets/images/menu.jpg';

export class MainMenu extends PIXI.Container {
  private game: any;
  private background: PIXI.Sprite;

  constructor(game: any) {
    super();
    this.game = game;

    this.background = PIXI.Sprite.from(BACKGROUND_IMAGE);
    this.addChild(this.background);

    this.createMenu();
  }

  private createMenu() {
    const title = new PIXI.Text('GameHub', {
      fontSize: 48,
      fill: 0xffffff,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
    });
    title.anchor.set(0.5);
    this.addChild(title);

    const buttons = [
      {
        label: 'Ace of Shadows',
        action: () => this.game.changeScene(new AceOfShadowsScene(this.game)),
      },
      {
        label: 'Magic Words',
        action: () => this.game.changeScene(new MagicWordsScene(this.game)),
      },
      {
        label: 'Phoenix Flame',
        action: () => this.game.changeScene(new PhoenixFlameScene(this.game)),
      },
    ];

    buttons.forEach((buttonInfo) => {
      const button = new Button(buttonInfo.label, buttonInfo.action);
      this.addChild(button);
    });

    this.onResize(
      this.game.getApp().screen.width,
      this.game.getApp().screen.height,
    );
  }

  public onResize(width: number, height: number) {
    const title = this.children.find(
      (c) => c instanceof PIXI.Text,
    ) as PIXI.Text;
    title.x = width / 2;
    title.y = height * 0.25;

    this.background.width = width;
    this.background.height = height;

    const buttons = this.children.filter(
      (child) => child instanceof Button,
    ) as Button[];

    const isPortrait = height > width;

    const buttonWidth = isPortrait ? width * 0.7 : width * 0.3;
    const buttonHeight = isPortrait ? height * 0.08 : height * 0.12;
    const buttonSpacing = 20;

    const totalButtonHeight =
      buttons.length * buttonHeight + (buttons.length - 1) * buttonSpacing;
    let startY = height / 2 - totalButtonHeight / 2 + title.height / 2;

    if (startY < title.y + title.height) {
      startY = title.y + title.height + 40;
    }

    buttons.forEach((button) => {
      button.redraw(buttonWidth, buttonHeight);
      button.x = width / 2 - button.width / 2;
      button.y = startY;
      startY += button.height + buttonSpacing;
    });
  }
}
