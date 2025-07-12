import * as PIXI from 'pixi.js';
import { BaseScene } from 'scenes/BaseScene';
import { Particle } from './Particle';

export class PhoenixFlameScene extends BaseScene {
  private particles: Particle[] = [];
  private particleContainer: PIXI.ParticleContainer;
  private flameTextures: PIXI.Texture[] = [];
  private flameIndex = 0;
  private emitter: PIXI.Point;

  constructor(game: any) {
    super(game, 'Phoenix Flame');

    this.particleContainer = new PIXI.ParticleContainer(10, {
      scale: true,
      position: true,
      alpha: true,
    });
    this.addChild(this.particleContainer);

    this.emitter = new PIXI.Point(
      this.game.getApp().screen.width / 2,
      this.game.getApp().screen.height * 0.8,
    );

    this.loadAssets();
  }

  private async loadAssets(): Promise<void> {
    try {
      const flamePaths = Array.from(
        { length: 6 },
        (_, i) =>
          `assets/particles/flame_${String(i + 1).padStart(2, '0')}.png`,
      );
      await PIXI.Assets.load(flamePaths);
      this.flameTextures = flamePaths.map((p) => PIXI.Texture.from(p));
      this.initializeParticles();
      this.game.getApp().ticker.add(this.update, this);
    } catch (error) {
      console.error('Failed to load particle assets:', error);
    }
  }

  private initializeParticles(): void {
    const textures = this.flameTextures;

    for (let i = 0; i < 10; i++) {
      const particle = new Particle(textures[i % textures.length]);
      particle.anchor.set(0.5);
      particle.visible = false;
      this.particles.push(particle);
      this.particleContainer.addChild(particle);
    }
  }

  private emitParticle(): void {
    const particle = this.particles.find((p) => !p.visible);
    if (!particle) return;

    particle.position.copyFrom(this.emitter);
    particle.texture = this.flameTextures[this.flameIndex];
    this.flameIndex = (this.flameIndex + 1) % this.flameTextures.length;

    particle.alpha = 1;
    particle.scale.set(0.2 + Math.random() * 0.3);
    particle.tint = 0xffa500;
    particle.visible = true;

    particle.vx = Math.random() * 2 - 1;
    particle.vy = -Math.random() * 3 - 2;
    particle.life = Math.random() * 40 + 50;
  }

  private update(delta: number): void {
    this.emitParticle();

    this.particles.forEach((particle: Particle) => {
      if (!particle.visible) return;

      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;
      particle.vy -= 0.05 * delta;

      particle.life -= delta;

      particle.alpha = Math.max(0, particle.life / 60);
      particle.scale.set(particle.scale.x * 0.99);

      if (particle.life <= 0) {
        particle.visible = false;
      }
    });
  }

  public onResize(width: number, height: number): void {
    super.onResize(width, height);
    this.emitter.set(width / 2, height * 0.8);
  }

  public destroy(options?: PIXI.IDestroyOptions | boolean): void {
    super.destroy(options);
  }
}
