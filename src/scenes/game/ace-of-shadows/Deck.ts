import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { Card, CARD_WIDTH, CARD_HEIGHT } from './Card';

const NUM_CARDS = 144;
const STAGGER_OFFSET = 0.5;

export class Deck {
  public container: PIXI.Container;
  private cards: Card[] = [];
  private discardPile: Card[] = [];
  private renderer: PIXI.Renderer;

  constructor(renderer: PIXI.Renderer) {
    this.container = new PIXI.Container();
    this.renderer = renderer;
    this.createDeck();
  }

  private createCardTexture(): PIXI.Texture {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.lineStyle(2, 0x000000, 1);
    graphics.drawRoundedRect(0, 0, CARD_WIDTH, CARD_HEIGHT, 10);
    graphics.endFill();
    return this.renderer.generateTexture(graphics);
  }

  private createDeck(): void {
    const cardTexture = this.createCardTexture();
    for (let i = 0; i < NUM_CARDS; i++) {
      const card = new Card(cardTexture);
      card.y = i * STAGGER_OFFSET;
      this.cards.push(card);
      this.container.addChild(card);
    }
  }

  public moveTopCard(discardContainer: PIXI.Container): void {
    if (this.cards.length === 0) {
      return;
    }

    const card = this.cards.pop()!;
    this.discardPile.push(card);

    // Convert discard pile's position to the card's parent's local space
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

  public get hasCards(): boolean {
    return this.cards.length > 0;
  }

  public destroy(): void {
    this.cards.forEach(card => card.destroy());
    this.discardPile.forEach(card => card.destroy());
    gsap.killTweensOf(this.cards);
    gsap.killTweensOf(this.discardPile);
  }
}
