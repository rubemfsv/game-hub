import * as PIXI from 'pixi.js';
import { BaseScene } from 'scenes/BaseScene';

/**
 * Displays a simple "Loading…" message for the given delay and then executes the callback.
 * Useful for lightweight transitions where real asset streaming isn't necessary.
 */
export class TimedLoaderScene extends BaseScene {
  private onDone: () => void;
  private delayMs: number;

  constructor(game: any, onDone: () => void, delayMs = 1000) {
    super(game, 'Loading');
    this.onDone = onDone;
    this.delayMs = delayMs;

    const label = new PIXI.Text('Loading…', {
      fill: 0xffffff,
      fontSize: 32,
      fontFamily: 'Arial',
    });
    label.anchor.set(0.5);
    this.addChild(label);

    // Center label initially
    this.onResize(
      this.game.getApp().screen.width,
      this.game.getApp().screen.height,
    );

    // Schedule scene change after delay
    setTimeout(() => {
      this.onDone();
    }, this.delayMs);
  }

  public onResize(width: number, height: number): void {
    super.onResize(width, height);
    const label = this.children.find(
      (c) => c instanceof PIXI.Text,
    ) as PIXI.Text;
    if (label) {
      label.position.set(width / 2, height / 2);
    }
  }
}
