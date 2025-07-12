import * as PIXI from 'pixi.js';
import { BaseScene } from 'scenes/BaseScene';

/**
 * Simple loading scene that waits a fixed amount of milliseconds before calling `onDone`.
 *
 * Useful as a transition while assets are being downloaded or for simulating load time.
 */
export class TimedLoaderScene extends BaseScene {
  private onDone: () => void;
  private delayMs: number;

  /**
   * @param game    - Reference to the main Game singleton.
   * @param onDone  - Callback to execute after the delay expires.
   * @param delayMs - Delay in milliseconds before invoking `onDone` (default 1000ms).
   */
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

    this.onResize(
      this.game.getApp().screen.width,
      this.game.getApp().screen.height,
    );

    setTimeout(() => {
      this.onDone();
    }, this.delayMs);
  }

  /**
   * Center the "Loading…" label whenever the viewport changes size.
   */
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
