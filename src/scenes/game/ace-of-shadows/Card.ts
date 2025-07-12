import * as PIXI from 'pixi.js';

export const CARD_WIDTH = 100;
export const CARD_HEIGHT = 140;

export class Card extends PIXI.Sprite {
  constructor(texture: PIXI.Texture) {
    super(texture);
    this.anchor.set(0.5);
  }
}
