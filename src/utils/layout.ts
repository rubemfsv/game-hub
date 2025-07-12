import * as PIXI from 'pixi.js';

/**
 * Centers a display object within the given dimensions.
 * @param content The PIXI.DisplayObject to center.
 * @param width The width of the area to center within.
 * @param height The height of the area to center within.
 */
export function centerContent(content: PIXI.DisplayObject, width: number, height: number): void {
  content.x = width / 2;
  content.y = height / 2;
}
