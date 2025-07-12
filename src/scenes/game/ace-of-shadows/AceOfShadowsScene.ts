import * as PIXI from 'pixi.js';
import { BaseScene } from 'scenes/BaseScene';
import { Deck } from './Deck';

const BACKGROUND_IMAGE = '/assets/images/ace-of-shadows.jpg';

/**
 * Scene that demonstrates theAce-of-Shadows mini-game card-dealing animation.
 *
 * It uses a `Deck` instance (draw pile) and a `discardPile` container. Every second the scene
 * animates the top card from the deck to the discard pile until the deck is empty.
 *
 * The scene is primarily a visual showcase and does not yet model actual card game rules.
 */
export class AceOfShadowsScene extends BaseScene {
  private deck: Deck;
  private background: PIXI.Sprite;
  private discardPile: PIXI.Container;
  private dealInterval: NodeJS.Timeout | null = null;

  /**
   * @param game - Reference to the main `Game` singleton used for accessing renderer & scene API.
   */
  constructor(game: any) {
    super(game, 'Ace of Shadows');

    this.background = PIXI.Sprite.from(BACKGROUND_IMAGE);
    this.addChildAt(this.background, 0);

    this.deck = new Deck(this.game.getApp().renderer);
    this.discardPile = new PIXI.Container();

    this.addChild(this.deck.container, this.discardPile);

    this.startDealing();
  }

  /**
   * Begin an interval that moves one card per second from the deck to the discard pile.
   * Stops automatically once the deck runs out of cards.
   */
  private startDealing(): void {
    this.dealInterval = setInterval(() => {
      if (!this.deck.hasCards) {
        if (this.dealInterval) clearInterval(this.dealInterval);
        return;
      }
      this.deck.moveTopCard(this.discardPile);
    }, 1000);
  }

  /**
   * Resize handler keeps background stretched to viewport and positions piles responsively.
   */
  public onResize(width: number, height: number): void {
    super.onResize(width, height);
    this.background.width = width;
    this.background.height = height;

    this.deck.container.position.set(width * 0.25, height / 2);
    this.discardPile.position.set(width * 0.75, height / 2);
  }

  /**
   * Clean up resources and stop any running intervals before the scene is removed.
   */
  public destroy(options?: PIXI.IDestroyOptions | boolean): void {
    super.destroy(options);
    if (this.dealInterval) {
      clearInterval(this.dealInterval);
    }
    this.deck.destroy();
  }
}
