import * as PIXI from 'pixi.js';
import { SceneHeader } from 'ui/SceneHeader';
import { MainMenu } from 'scenes/menu/MainMenu';

export abstract class BaseScene extends PIXI.Container {
  protected game: any;
  protected header: SceneHeader;

  constructor(game: any, title: string) {
    super();
    this.game = game;

    this.header = new SceneHeader(title, () => {
      this.game.changeScene(new MainMenu(this.game));
    });
    this.addChild(this.header);
  }

  public onResize(width: number, height: number) {
    this.header.onResize(width, height);
  }
}
