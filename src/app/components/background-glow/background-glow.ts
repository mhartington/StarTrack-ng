import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  Application,
  Sprite,
  Graphics,
  Container,
  Texture,
  DisplayObject,
} from 'pixi.js';
import { TwistFilter } from '@pixi/filter-twist';
import { AdjustmentFilter } from '@pixi/filter-adjustment';
import { KawaseBlurFilter } from '@pixi/filter-kawase-blur';

@Component({
  standalone: true,
  selector: 'background-glow',
  template: `<canvas #canvas width="100" height="100"></canvas>`,
  styleUrls: ['./background-glow.scss'],
})
export class BackgroundGlow implements AfterViewInit, OnDestroy {
  @Input() src: string;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

  private container: Container | null;
  private app: Application<any>;

  reduceMotionQuery = matchMedia('(prefers-reduced-motion)');
  ngAfterViewInit() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    this.app = new Application({
      resizeTo: window,
      width,
      height,
      powerPreference: 'low-power',
      backgroundAlpha: 0,
      view: this.canvas.nativeElement,
    });

    const graphics = new Graphics();
    graphics.beginFill('#5a5960');
    graphics.drawRect(0, 0, this.app.renderer.width, this.app.renderer.height);
    graphics.endFill();

    this.app.stage.addChild(graphics as DisplayObject);
    this.app.ticker.maxFPS = 15;

    this.initAnimation();
    this.updateArtwork(this.src);
  }

  addSpritesToContainer(t: Sprite, s: Sprite, i: Sprite, r: Sprite) {
    t.anchor.set(0.5, 0.5);
    s.anchor.set(0.5, 0.5);
    i.anchor.set(0.5, 0.5);
    r.anchor.set(0.5, 0.5);
    t.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
    s.position.set(this.app.screen.width / 2.5, this.app.screen.height / 2.5);
    i.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
    r.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
    t.width = this.app.screen.width * 1.25;
    t.height = t.width;
    s.width = this.app.screen.width * 0.8;
    s.height = s.width;
    i.width = this.app.screen.width * 0.5;
    i.height = i.width;
    r.width = this.app.screen.width * 0.25;
    r.height = r.width;
    this.container.addChild(
      t as DisplayObject,
      s as DisplayObject,
      i as DisplayObject,
      r as DisplayObject,
    );
  }

  initAnimation() {
    this.container = new Container();
    this.app.stage.addChild(this.container as DisplayObject);

    const t = new Sprite();
    const s = new Sprite();
    const i = new Sprite();
    const r = new Sprite();
    this.addSpritesToContainer(t, s, i, r);

    const n = new KawaseBlurFilter();
    const o = new KawaseBlurFilter();
    const h = new KawaseBlurFilter();
    const a = new KawaseBlurFilter();
    const l = new KawaseBlurFilter();

    n.blur = 5;
    o.blur = 10;
    h.blur = 20;
    a.blur = 40;
    l.blur = 80;
    n.quality = 1;
    o.quality = 1;
    h.quality = 2;
    a.quality = 2;
    l.quality = 2;

    const twistingFilter = new TwistFilter();
    twistingFilter.angle = -3.25;
    twistingFilter.radius = 900;
    twistingFilter.offset.x = Math.round(this.app.renderer.screen.width / 2);
    twistingFilter.offset.y = Math.round(this.app.renderer.screen.height / 2);

    const saturationFilter = new AdjustmentFilter();
    saturationFilter.saturation = 2.75;
    // saturationFilter.contrast = 1// 1.9;
    saturationFilter.brightness = 0.7;

    this.container.filters = [twistingFilter, n, o, h, a, l, saturationFilter];

    const colorOverlayContainer = new Sprite();
    colorOverlayContainer.width = this.app.screen.width;
    colorOverlayContainer.height = this.app.screen.height;

    const colorOverlay = new Graphics();
    colorOverlay.beginFill(0, 0.5);
    colorOverlay.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
    colorOverlay.endFill();

    colorOverlayContainer.addChild(colorOverlay as DisplayObject);

    this.app.stage.addChild(colorOverlayContainer as DisplayObject);

    const f = new Sprite();
    f.width = this.app.screen.width;
    f.height = this.app.screen.height;

    const _ = new Graphics();
    _.beginFill(16777215, 0.05);
    _.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
    _.endFill();

    colorOverlayContainer.addChild(_ as DisplayObject);
    this.app.stage.addChild(f as DisplayObject);
  }

  updateArtwork(img: string) {
    if (this.app && img !== 'assets/imgs/default.svg') {
      const incomingTexture = Texture.from(img);
      const incomingImgArray = [];

      for (let h = 0; h < 4; h++) {
        const newImg = new Sprite(incomingTexture);
        newImg.alpha = 0;
        incomingImgArray.push(newImg);
      }

      if (this.container.children.length > 4) {
        this.container.removeChildren(4);
      }
      this.addSpritesToContainer.apply(this, incomingImgArray);

      const currentContainerCopy = this.container.children.slice(0, 4);
      let opacityDelta = 1;
      let currentRotationValArray = currentContainerCopy.map((h) => h.rotation);
      this.app.ticker.add(() => {
        let rotationSpeed = 0.4;
        let opacitySpeed = this.app.ticker.deltaMS / 33.33333;

        opacityDelta -= 0.02 * opacitySpeed;
        opacityDelta < 0 && this.container.removeChild(...currentContainerCopy);
        currentContainerCopy.forEach((a) => (a.alpha = opacityDelta));
        incomingImgArray.forEach((a) => (a.alpha = 1 - opacityDelta));

        this.reduceMotionQuery.matches
          ? ((currentRotationValArray[0] += 0.001 * rotationSpeed),
            (currentRotationValArray[1] += 0.001 * rotationSpeed),
            (currentRotationValArray[2] += 0.001 * rotationSpeed),
            (currentRotationValArray[3] += 0.001 * rotationSpeed))
          : ((currentRotationValArray[0] += 0.003 * rotationSpeed),
            (currentRotationValArray[1] -= 0.008 * rotationSpeed),
            (currentRotationValArray[2] -= 0.006 * rotationSpeed),
            (currentRotationValArray[3] += 0.004 * rotationSpeed));

        incomingImgArray[0] &&
          (incomingImgArray[0].rotation = currentRotationValArray[0]);
        incomingImgArray[1] &&
          (incomingImgArray[1].rotation = currentRotationValArray[1]);
        incomingImgArray[2] &&
          ((incomingImgArray[2].rotation = -currentRotationValArray[2]),
          (incomingImgArray[2].x =
            this.app.screen.width / 2 +
            (this.app.screen.width / 4) *
              Math.cos(currentRotationValArray[2] * 0.75)),
          (incomingImgArray[2].y =
            this.app.screen.height / 2 +
            (this.app.screen.width / 4) *
              Math.sin(currentRotationValArray[2] * 0.75)));
        incomingImgArray[3] &&
          ((incomingImgArray[3].rotation = -currentRotationValArray[3]),
          (incomingImgArray[3].x =
            this.app.screen.width / 2 +
            (this.app.screen.width / 2) * 0.1 +
            (this.app.screen.width / 4) *
              Math.cos(currentRotationValArray[3] * 0.75)),
          (incomingImgArray[3].y =
            this.app.screen.height / 2 +
            (this.app.screen.width / 2) * 0.1 +
            (this.app.screen.width / 4) *
              Math.sin(currentRotationValArray[3] * 0.75)));
      });
    }
  }

  async ngOnChanges({ src }: SimpleChanges) {
    if (src.currentValue !== 'assets/imgs/default.svg') {
      this.updateArtwork(src.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.app.destroy(true, {
      children: true,
      texture: true,
      baseTexture: true,
    });
  }
}
