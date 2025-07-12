import * as PIXI from 'pixi.js';

/**
 * Lightweight sprite representing a single flame particle.
 *
 * Movement and lifetime properties are kept as public fields for quick access in the
 * `PhoenixFlameScene` update loop – this avoids setter overhead in tight loops.
 */
export class Particle extends PIXI.Sprite {
  public vx: number = 0;
  public vy: number = 0;
  public life: number = 0;

  /**
   * @param texture - Texture frame chosen from flame atlas.
   */
  constructor(texture: PIXI.Texture) {
    super(texture);
  }
}
