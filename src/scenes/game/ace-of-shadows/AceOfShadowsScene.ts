import * as PIXI from 'pixi.js';
import { BaseScene } from 'scenes/BaseScene';
import { Deck } from './Deck';

const BACKGROUND_IMAGE = '/assets/images/ace-of-shadows.jpg';

export class AceOfShadowsScene extends BaseScene {
  private deck: Deck;
  private background: PIXI.Sprite;
  private discardPile: PIXI.Container;
  private dealInterval: NodeJS.Timeout | null = null;

  constructor(game: any) {
    super(game, 'Ace of Shadows');

    this.background = PIXI.Sprite.from(BACKGROUND_IMAGE);
    this.addChildAt(this.background, 0);

    this.deck = new Deck(this.game.getApp().renderer);
    this.discardPile = new PIXI.Container();

    this.addChild(this.deck.container, this.discardPile);

    this.startDealing();
  }

  private startDealing(): void {
    this.dealInterval = setInterval(() => {
      if (!this.deck.hasCards) {
        if (this.dealInterval) clearInterval(this.dealInterval);
        return;
      }
      this.deck.moveTopCard(this.discardPile);
    }, 1000);
  }

  public onResize(width: number, height: number): void {
    super.onResize(width, height);
    this.background.width = width;
    this.background.height = height;

    this.deck.container.position.set(width * 0.25, height / 2);
    this.discardPile.position.set(width * 0.75, height / 2);
  }

  public destroy(options?: PIXI.IDestroyOptions | boolean): void {
    super.destroy(options);
    if (this.dealInterval) {
      clearInterval(this.dealInterval);
    }
    this.deck.destroy();
  }
}
