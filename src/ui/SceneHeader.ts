import * as PIXI from 'pixi.js';
import { Button } from './Button';

export class SceneHeader extends PIXI.Container {
  private title: PIXI.Text;
  private backButton: Button;

  constructor(title: string, backAction: () => void) {
    super();

    this.title = new PIXI.Text(title, {
      fontSize: 36,
      fill: 0xffffff,
      fontFamily: 'Arial',
      fontWeight: 'bold',
    });
    this.title.anchor.set(0.5);
    this.addChild(this.title);

    this.backButton = new Button('Home', backAction);
    this.addChild(this.backButton);
  }

  public onResize(width: number) {
    this.title.x = width / 2;
    this.title.y = 40;

    const buttonWidth = 120;
    const buttonHeight = 40;
    this.backButton.redraw(buttonWidth, buttonHeight);
    this.backButton.x = width - buttonWidth - 20;
    this.backButton.y = 20;
  }
}
