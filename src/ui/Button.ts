import * as PIXI from 'pixi.js';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';

export class Button extends PIXI.Container {
  private text: PIXI.Text;
  private background: PIXI.Graphics;
  private glowFilter: DropShadowFilter;

  constructor(label: string, onClick: () => void) {
    super();

    this.glowFilter = new DropShadowFilter({
      color: 0xffd700,
      alpha: 0.25,
      blur: 2,
      distance: 0,
      quality: 5,
    });
    this.filters = [this.glowFilter];

    this.background = new PIXI.Graphics();
    this.text = new PIXI.Text(label, {
      fontSize: 24,
      fill: 0xffffff,
      fontFamily: 'Arial',
      fontWeight: 'bold',
    });
    this.text.anchor.set(0.5);

    this.addChild(this.background);
    this.addChild(this.text);

    this.eventMode = 'static';
    this.cursor = 'pointer';

    this.on('pointerdown', onClick);
    this.on('pointerover', this.onPointerOver.bind(this));
    this.on('pointerout', this.onPointerOut.bind(this));
  }

  public redraw(width: number, height: number) {
    this.background.clear();
    this.background.beginFill(0x1a1a1a, 0.8);
    this.background.lineStyle({ width: 2, color: 0xffd700, alpha: 0.5 });
    this.background.drawRoundedRect(0, 0, width, height, 15);
    this.background.endFill();

    this.text.x = width / 2;
    this.text.y = height / 2;

    if (height < 40) {
      this.text.style.fontSize = 18;
    } else {
      this.text.style.fontSize = 24;
    }
  }

  public setText(newLabel: string): void {
    this.text.text = newLabel;
  }

  private onPointerOver() {
    this.glowFilter.blur = 6;
    this.glowFilter.alpha = 0.6;
    this.scale.set(1.03);
  }

  private onPointerOut() {
    this.glowFilter.blur = 2;
    this.glowFilter.alpha = 0.25;
    this.scale.set(1.0);
  }
}
