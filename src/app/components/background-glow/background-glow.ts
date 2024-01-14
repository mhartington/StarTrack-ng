import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import type { SimpleChanges } from "@angular/core";
import {
  Application,
  Sprite,
  Graphics,
  Container,
  Renderer,
  Assets,
  Point,
} from "pixi.js";
import { TwistFilter } from "@pixi/filter-twist";
import { AdjustmentFilter } from "@pixi/filter-adjustment";
import { KawaseBlurFilter } from "@pixi/filter-kawase-blur";

@Component({
  standalone: true,
  selector: "background-glow",
  template: `<canvas #canvas width="100" height="100"></canvas>`,
  styleUrls: ["./background-glow.scss"],
})
export class BackgroundGlowComponent
  implements OnDestroy, OnChanges, AfterViewInit
{
  @Input() src: string;
  @ViewChild("canvas") canvas: ElementRef<HTMLCanvasElement>;

  private container: Container | null;
  private app: Application<Renderer>;

  reduceMotionQuery = matchMedia("(prefers-reduced-motion)");

  async createApp() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.app = new Application();
    await this.app.init({
      resizeTo: window,
      width,
      height,
      powerPreference: "low-power",
      preference: "webgl",
      backgroundAlpha: 0,
      canvas: this.canvas.nativeElement,
      autoDensity: true,
      resolution: window.devicePixelRatio,
    });

    const graphics = new Graphics();
    graphics
      .rect(0, 0, this.app.screen.width, this.app.screen.height)
      .fill({ color: "#5a5960" });

    this.app.stage.addChild(graphics);
    this.app.ticker.maxFPS = 15;

    console.log(this.src);
    this.initAnimation();
    await this.updateArtwork(this.src);
  }

  addSpritesToContainer(
    largeCenter: Sprite,
    largeOffset: Sprite,
    mediumCenter: Sprite,
    smallCenter: Sprite,
  ) {
    largeCenter.anchor.set(0.5, 0.5);
    largeCenter.position.set(
      this.app.screen.width / 2,
      this.app.screen.height / 2,
    );
    largeCenter.width = this.app.screen.width * 1.25;
    largeCenter.height = this.app.screen.width * 1.25;

    largeOffset.anchor.set(0.5, 0.5);
    largeOffset.position.set(
      this.app.screen.width / 2.5,
      this.app.screen.height / 2.5,
    );
    largeOffset.width = this.app.screen.width * 0.8;
    largeOffset.height = largeOffset.width;

    mediumCenter.anchor.set(0.5, 0.5);
    mediumCenter.position.set(
      this.app.screen.width / 2,
      this.app.screen.height / 2,
    );
    mediumCenter.width = this.app.screen.width * 0.5;
    mediumCenter.height = mediumCenter.width;

    smallCenter.anchor.set(0.5, 0.5);
    smallCenter.position.set(
      this.app.screen.width / 2,
      this.app.screen.height / 2,
    );
    smallCenter.width = this.app.screen.width * 0.25;
    smallCenter.height = smallCenter.width;

    this.container.addChild(
      largeCenter,
      largeOffset,
      mediumCenter,
      smallCenter,
    );
  }

  initAnimation() {
    this.container = new Container();
    this.app.stage.addChild(this.container);

    const t = new Sprite();
    const s = new Sprite();
    const i = new Sprite();
    const r = new Sprite();
    this.addSpritesToContainer(t, s, i, r);

    const n = new KawaseBlurFilter(5, 1);
    const o = new KawaseBlurFilter(10, 1);
    const h = new KawaseBlurFilter(20, 2);
    const a = new KawaseBlurFilter(40, 2);
    const l = new KawaseBlurFilter(80, 2);

    const twistingFilter = new TwistFilter({
      angle: -3.25,
      radius: 900,
      offset: new Point(
        Math.round(this.app.screen.width / 2),
        Math.round(this.app.screen.height / 2),
      ),
    });
    const saturationFilter = new AdjustmentFilter({
      saturation: 2.75,
      brightness: 0.7,
    });

    // this.container.filters = [twistingFilter, n, o, h, a, l, saturationFilter];

    const colorOverlayContainer = new Container();
    colorOverlayContainer.width = this.app.screen.width;
    colorOverlayContainer.height = this.app.screen.height;

    const colorOverlay = new Graphics()
      .fill({ color: 0, alpha: 0.5 })
      .rect(0, 0, this.app.screen.width, this.app.screen.height);
    colorOverlayContainer.addChild(colorOverlay);

    this.app.stage.addChild(colorOverlayContainer);

    const f = new Sprite();
    f.width = this.app.screen.width;
    f.height = this.app.screen.height;

    const _ = new Graphics();
    _.fill({ color: 16777215, alpha: 0.05 });
    _.rect(0, 0, this.app.screen.width, this.app.screen.height);
    colorOverlayContainer.addChild(_);

    this.app.stage.addChild(f);
  }

  async updateArtwork(img: string) {
    if (this.app) {
      const incomingTexture = await Assets.load(img);
      const incomingImgArray = [];

      for (let h = 0; h < 4; h++) {
        const newImg = new Sprite(incomingTexture);
        newImg.alpha = 0;
        incomingImgArray.push(newImg);
      }

      if (this.container.children.length > 4) {
        this.container.removeChildren(4);
      }
      this.addSpritesToContainer(
        incomingImgArray[0],
        incomingImgArray[1],
        incomingImgArray[2],
        incomingImgArray[3],
      );

      const currentContainerCopy = this.container.children.slice(0, 4);
      let opacityDelta = 1;

      const currentRotationValArray = currentContainerCopy.map(
        (h) => h.rotation,
      );
      const rotationSpeed = 0.4;
      const opacitySpeed = this.app.ticker.deltaMS / 33.33333;

      this.app.ticker.add(() => {
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
  async ngAfterViewInit() {
    this.createApp();
  }
  ngOnChanges({ src }: SimpleChanges) {
    if (!src.firstChange && this.app != null) {
      this.updateArtwork(src.currentValue);
    }
  }

  ngOnDestroy(): void {
    // const opt: ViewSystemDestroyOptions = {
    //   removeView: true
    // }
    this.app.destroy({
      removeView: true,
    });
  }
}
