import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { Card, CARD_WIDTH, CARD_HEIGHT } from './Card';

const NUM_CARDS = 144;
const STAGGER_OFFSET = 0.5;

/**
 * Represents a stack of playing cards used in the Ace-of-Shadows mini-game.
 *
 * Responsibilities:
 *  • Maintain two internal stacks – draw pile (`cards`) and discard pile.
 *  • Handle card rendering inside its own `PIXI.Container`.
 *  • Provide GSAP-powered animation for transferring a card to an external discard container.
 *  • Offer helper getters for game logic (e.g. `hasCards`).
 */
export class Deck {
  public container: PIXI.Container;
  private cards: Card[] = [];
  private discardPile: Card[] = [];
  private renderer: PIXI.Renderer;

  /**
   * Create a new deck instance.
   *
   * @param renderer - PIXI renderer used to rasterise the vector graphics into a reusable texture.
   */
  constructor(renderer: PIXI.Renderer) {
    this.container = new PIXI.Container();
    this.renderer = renderer;
    this.createDeck();
  }

  /**
   * Generate a simple rounded-rectangle card texture.
   *
   * Using the deck's renderer to bake the `PIXI.Graphics` object into a texture avoids
   * recreating heavy graphics for every card and improves performance.
   *
   * @returns A `PIXI.Texture` sized to `CARD_WIDTH` × `CARD_HEIGHT`.
   */
  private createCardTexture(): PIXI.Texture {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.lineStyle(2, 0x000000, 1);
    graphics.drawRoundedRect(0, 0, CARD_WIDTH, CARD_HEIGHT, 10);
    graphics.endFill();
    return this.renderer.generateTexture(graphics);
  }

  /**
   * Populate the draw pile with `NUM_CARDS` cards and lay them out with a slight Y offset so
   * that the pile looks visually stacked.
   */
  private createDeck(): void {
    const cardTexture = this.createCardTexture();
    for (let i = 0; i < NUM_CARDS; i++) {
      const card = new Card(cardTexture);
      card.y = i * STAGGER_OFFSET;
      this.cards.push(card);
      this.container.addChild(card);
    }
  }

  /**
   * Animate the top card from the draw pile to the provided discard container.
   * If the draw pile is empty the method exits early.
   *
   * @param discardContainer - Container that represents the discard pile on screen.
   */
  public moveTopCard(discardContainer: PIXI.Container): void {
    if (this.cards.length === 0) {
      return;
    }

    const card = this.cards.pop()!;
    this.discardPile.push(card);

    const worldPos = discardContainer.toGlobal(new PIXI.Point());
    const localPos = card.parent.toLocal(worldPos);

    gsap.to(card.position, {
      x: localPos.x,
      y: localPos.y + (this.discardPile.length - 1) * STAGGER_OFFSET,
      duration: 2,
      onComplete: () => {
        discardContainer.addChild(card);
      },
    });
  }

  /**
   * Indicates if there are still cards in the draw pile.
   */
  public get hasCards(): boolean {
    return this.cards.length > 0;
  }

  /**
   * Destroy all card instances and kill running GSAP tweens to free resources.
   */
  public destroy(): void {
    this.cards.forEach((card) => card.destroy());
    this.discardPile.forEach((card) => card.destroy());
    gsap.killTweensOf(this.cards);
    gsap.killTweensOf(this.discardPile);
  }
}
