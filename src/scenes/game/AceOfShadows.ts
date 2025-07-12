import * as PIXI from 'pixi.js';
import { BaseScene } from 'scenes/BaseScene';
import { centerContent } from 'utils/layout';

export class AceOfShadowsScene extends BaseScene {
  constructor(game: any) {
    super(game, 'Ace of Shadows');

    const content = new PIXI.Text('Welcome to Ace of Shadows!', {
      fontSize: 28,
      fill: 0xffffff,
      align: 'center',
    });
    content.anchor.set(0.5);
    this.addChild(content);
  }

  public onResize(width: number, height: number) {
    super.onResize(width, height);

    centerContent(this.children[1], width, height);
  }
}
