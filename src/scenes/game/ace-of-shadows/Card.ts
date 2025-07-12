import * as PIXI from 'pixi.js';

export const CARD_WIDTH = 100;
export const CARD_HEIGHT = 140;

/**
 * Basic playing card sprite used by the Ace-of-Shadows mini-game.
 *
 * This class wraps a texture and centres its anchor
 * to make tweening/rotation easier.
 */
export class Card extends PIXI.Sprite {
  /**
   * @param texture - Pre-generated texture to apply to the sprite.
   */
  constructor(texture: PIXI.Texture) {
    super(texture);
    this.anchor.set(0.5);
  }
}
