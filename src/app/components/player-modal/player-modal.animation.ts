import { createAnimation } from '@ionic/angular';
const getOpacity = ({ top }) => {
  let from = 0;
  let to = 1;
  if (top !== 0) {
    from = 1;
    to = 0;
  }
  return { from, to };
};
const getQueueVectors = (pre: number, post: number) => {
  const val = {
    scaleFrom: null,
    scaleTo: null,
    opacityFrom: null,
    opacityTo: null,
  };
  if (pre < post) {
    val.scaleFrom = 0.8;
    val.scaleTo = 1;
    val.opacityFrom = 0;
    val.opacityTo = 1;
  } else {
    val.scaleTo = 0.8;
    val.scaleFrom = 1;
    val.opacityFrom = 1;
    val.opacityTo = 0;
  }
  return val;
};
const getRec = (el: Element) => {
  const { top, left, width, height } = el.getBoundingClientRect();
  const rect = { top, left, width, height };
  return rect;
};

export const createQueueAnimation = async (
  targetEl: HTMLElement,
  isOpening: boolean
): Promise<void> => {
  const isPortait = window.matchMedia('(orientation: portrait)').matches;
  console.log(isPortait);
  console.log('is opening', isOpening);
  const animationChain = [];
  const baseAnimation = createAnimation()
  .duration(500)
  .easing('cubic-bezier(0.32,0.72,0,1)');


  if (!isPortait) {
    /// Player
    const playerQueue = targetEl.querySelector('.player-queue-landscape');
    const trackPlayer = targetEl.querySelector('.track-player');

    const playerRecPre = getRec(trackPlayer);
    const playerQueueRecPre = getRec(playerQueue);

    targetEl.classList.toggle('queue-active');

    const playerRecPost = getRec(trackPlayer);
    const playerQueueRecPost = getRec(playerQueue);

    const playerDeltaX = playerRecPre.left - playerRecPost.left;
    const playerDeltaY = playerRecPre.top - playerRecPost.top;

    const playerQueueDeltaW = getQueueVectors(
      playerQueueRecPre.width,
      playerQueueRecPost.width
    );
    const playerQueueDeltaH = getQueueVectors(
      playerQueueRecPre.height,
      playerQueueRecPost.height
    );

    const playerQueueAnimation = createAnimation()
      .addElement(playerQueue)
      .fromTo(
        'transform',
        `scale3d(${playerQueueDeltaW.scaleFrom}, ${playerQueueDeltaH.scaleFrom}, ${playerQueueDeltaH.scaleFrom})`,
        `scale3d(${playerQueueDeltaW.scaleTo}, ${playerQueueDeltaH.scaleTo}, ${playerQueueDeltaH.scaleTo})`
      )
      .fromTo(
        'opacity',
        playerQueueDeltaH.opacityFrom,
        playerQueueDeltaH.opacityTo
      );
    animationChain.push(playerQueueAnimation);

    const trackPlayerAnimation = createAnimation()
      .addElement(trackPlayer)
      .beforeStyles({
        'transform-origin': 'top left',
      })
      .from('transform', `translate3d(${playerDeltaX}px, ${playerDeltaY}px, 0)`)
      .afterClearStyles(['transform-origin']);

    animationChain.push(trackPlayerAnimation);
  }

  else {
    const thumbnailEl = targetEl.querySelector('ion-thumbnail');
    const labelEl = targetEl.querySelector('ion-label');
    const playerQueueEl = targetEl.querySelector('.player-queue-portrait');

    const thumbnailRecPre = getRec(thumbnailEl);
    const labelRecPre = getRec(labelEl);
    const playerQueueRecPre = getRec(playerQueueEl);

    targetEl.classList.toggle('queue-active');

    if(isOpening){

    } else {

    }



    const thumbnailRecPost = getRec(thumbnailEl);
    const labelRecPost = getRec(labelEl);
    const playerQueueRecPost = getRec(playerQueueEl);

    const thumbnailDeltaX = thumbnailRecPre.left - thumbnailRecPost.left;
    const thumbnailDeltaY = thumbnailRecPre.top - thumbnailRecPost.top;
    const thumbnailDeltaW = thumbnailRecPre.width / thumbnailRecPost.width;
    const thumbnailDeltaH = thumbnailRecPre.height / thumbnailRecPost.height;
    const thumbnailAnimation = createAnimation()
      .addElement(thumbnailEl)
      .beforeStyles({'transform-origin': 'top left'})
      .from(
        'transform',
        `translate3d(${thumbnailDeltaX}px, ${thumbnailDeltaY}px, 0) scale3d(${thumbnailDeltaW}, ${thumbnailDeltaH}, ${thumbnailDeltaW})`
      )
      .afterClearStyles(['transform-origin']);
    animationChain.push(thumbnailAnimation);

    const labelDeltaX = labelRecPre.left - labelRecPost.left;
    const labelDeltaY = labelRecPre.top - labelRecPost.top;

    const labelAnimation = createAnimation()
      .addElement(labelEl)
      .from(
        'transform',
        `translate3d(${labelDeltaX}px, ${labelDeltaY}px, ${0})`
      );

    animationChain.push(labelAnimation);

    const playerQueueOp = getOpacity(playerQueueRecPre);

    const playerQueueAnimation = createAnimation()
      .addElement(playerQueueEl)
      .easing('ease-out')
      .fromTo('opacity', playerQueueOp.from, playerQueueOp.to);

    animationChain.push(playerQueueAnimation);
  }
  baseAnimation.addAnimation(animationChain).play();
};
