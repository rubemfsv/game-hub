import * as PIXI from 'pixi.js';
import { SceneHeader } from 'ui/SceneHeader';
import { MainMenu } from 'scenes/menu/MainMenu';

/**
 * Base class that all playable scenes extend. Provides a common header with a
 * "Home" button for returning to the `MainMenu` and forwards resize events.
 */
export abstract class BaseScene extends PIXI.Container {
  protected game: any;
  protected header: SceneHeader;

  /**
   * @param game  - Reference to the `Game` singleton.
   * @param title - Title to display in the `SceneHeader`.
   */
  constructor(game: any, title: string) {
    super();
    this.game = game;

    this.header = new SceneHeader(title, () => {
      this.game.changeScene(new MainMenu(this.game));
    });
    this.addChild(this.header);
  }

  /**
   * Pass the new width to the header and ignore height (not needed for header).
   */
  public onResize(width: number, _height: number): void {
    // Some derived scenes rely on the same (width, height) signature.
    // The header only needs width, so we void the variable to avoid the
    // unused-parameter lint without altering the method contract.
    void _height;
    this.header.onResize(width);
  }
}
