import * as PIXI from 'pixi.js';

export class Particle extends PIXI.Sprite {
  public vx: number = 0;
  public vy: number = 0;
  public life: number = 0;

  constructor(texture: PIXI.Texture) {
    super(texture);
  }
}
