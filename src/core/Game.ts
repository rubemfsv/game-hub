import * as PIXI from 'pixi.js';
import { MainMenu } from 'scenes/menu/MainMenu';

export class Game {
  private app: PIXI.Application;
  private sceneContainer: PIXI.Container;
  private uiContainer: PIXI.Container;
  private fpsText!: PIXI.Text;

  private constructor() {
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x000000,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    this.sceneContainer = new PIXI.Container();
    this.uiContainer = new PIXI.Container();
    this.uiContainer.sortableChildren = false;

    this.app.stage.addChild(this.sceneContainer);
    this.app.stage.addChild(this.uiContainer);
  }

  public static create(): Game {
    const game = new Game();
    game.setup();
    return game;
  }

  private setup(): void {
    document.body.appendChild(this.app.view as HTMLCanvasElement);

    window.addEventListener('resize', this.onResize.bind(this));

    const style = new PIXI.TextStyle({
      fill: '#ffffff',
      fontSize: 16,
      fontFamily: 'Arial',
      stroke: '#000000',
      strokeThickness: 3,
    });

    this.fpsText = new PIXI.Text('FPS: 0', style);
    this.fpsText.position.set(10, 10);
    this.uiContainer.addChild(this.fpsText);

    this.app.ticker.add(() => {
      this.fpsText.text = `FPS: ${Math.round(this.app.ticker.FPS)}`;
    });

    this.changeScene(new MainMenu(this));
  }

  public onResize() {
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
    if (this.sceneContainer.children.length > 0) {
      const currentScene = this.sceneContainer.children[0] as any;
      if (currentScene.onResize) {
        currentScene.onResize(window.innerWidth, window.innerHeight);
      }
    }
  }

  public changeScene(newScene: PIXI.Container) {
    if (this.sceneContainer.children.length > 0) {
      this.sceneContainer.removeChildAt(0);
    }
    this.sceneContainer.addChild(newScene);
    if ((newScene as any).onResize) {
      (newScene as any).onResize(window.innerWidth, window.innerHeight);
    }
  }

  public getApp(): PIXI.Application {
    return this.app;
  }
}
