import { LottieAnimation } from '../graphql/generated';
import { FastifyInstance } from 'fastify';

export const updateLottieColorProperty = (
  fastify: FastifyInstance,
  obj: LottieAnimation,
  layerSeq: number[],
  shapeSeq: number,
  shapeItemSeq: number,
  color: number[],
) => {
  const newObj = { ...obj };

  let layer = newObj.layers[layerSeq[0]];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!layer) {
    fastify.log.error('ColorUpdate:: Layer not found', layer);
    return obj;
  }
  // Check if nested layers exist and the specific layer exists
  let i = 1;
  while (i < layerSeq.length) {
    if (layer.layers?.[layerSeq[i]]) {
      layer = layer.layers[layerSeq[i]];

      i++;
    } else {
      fastify.log.error('ColorUpdate:: Layer not found', layer, i);
      return obj;
    }
  }

  // Check if shapes exist and the specific shape exists
  if (!layer.shapes?.[shapeSeq]) {
    fastify.log.error('ColorUpdate:: Shape not found');
    return obj;
  }

  const shape = layer.shapes[shapeSeq];

  // Check if 'it' array exists and the specific shape item exists
  if (!shape.it?.[shapeItemSeq]) {
    fastify.log.error('ColorUpdate:: ShapeItem not found');
    return obj;
  }

  const item = shape.it[shapeItemSeq];

  // Check if color property exists
  if (!item?.c) {
    fastify.log.error('ColorUpdate:: Color property not found');
    return obj;
  }

  item.c.k = color;

  return newObj;
};

export const updateLottieSpeedProperty = (obj: LottieAnimation, frameRate: number) => {
  return {
    ...obj,
    fr: frameRate,
  };
};

export const deleteLottieLayerProperty = (
  fastify: FastifyInstance,
  obj: LottieAnimation,
  layerSeq: number[],
) => {
  if (layerSeq.length === 0) {
    return obj;
  }

  const newObj = { ...obj };
  let layer = newObj.layers[layerSeq[0]];

  if (layerSeq.length === 1) {
    // If the sequence has only one element, we delete the top-level layer
    newObj.layers.splice(layerSeq[0], 1);
    return newObj;
  }

  // Traverse to the parent of the target layer
  for (let i = 1; i < layerSeq.length - 1; i++) {
    if (layer.layers) {
      layer = layer.layers[layerSeq[i]];
    } else {
      fastify.log.error('LayerDelete:: Invalid nested layer', layerSeq[i]);
      return newObj;
    }
  }

  // Delete the target layer
  if (layer.layers) {
    layer.layers.splice(layerSeq[layerSeq.length - 1], 1);
  } else {
    fastify.log.error('LayerDelete:: Invalid nested layer', layerSeq[layerSeq.length - 1]);
  }

  return newObj;
};
