import * as PIXI from 'pixi.js';
import { MainMenu } from 'scenes/menu/MainMenu';

export class Game {
  private app: PIXI.Application;

  private constructor() {
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x000000,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });
  }

  public static create(): Game {
    const game = new Game();
    game.setup();
    return game;
  }

  private setup(): void {
    document.body.appendChild(this.app.view as HTMLCanvasElement);

    window.addEventListener('resize', this.onResize.bind(this));

    this.changeScene(new MainMenu(this));
  }

  public onResize() {
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
    if (this.app.stage.children.length > 0) {
      const currentScene = this.app.stage.children[0] as any;
      if (currentScene.onResize) {
        currentScene.onResize(window.innerWidth, window.innerHeight);
      }
    }
  }

  public changeScene(newScene: PIXI.Container) {
    if (this.app.stage.children.length > 0) {
      this.app.stage.removeChildAt(0);
    }
    this.app.stage.addChild(newScene);
    if ((newScene as any).onResize) {
      (newScene as any).onResize(window.innerWidth, window.innerHeight);
    }
  }

  public getApp(): PIXI.Application {
    return this.app;
  }
}
