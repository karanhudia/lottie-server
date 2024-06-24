import { Layer, LottieAnimation } from '../graphql/generated';
import { FastifyInstance } from 'fastify';

export const updateLottieColorProperty = (
  fastify: FastifyInstance,
  obj: LottieAnimation,
  layerSeq: number[],
  shapeSeq: number,
  shapeItemSeq: number,
  color: number[],
) => {
  let newObj = { ...obj };

  let layer: Layer = newObj.layers[layerSeq[0]];
  if (!layer) {
    fastify.log.error('ColorUpdate:: Layer not found', layer);
    return obj;
  }
  // Check if nested layers exist and the specific layer exists
  let i = 1;
  while (i < layerSeq.length) {
    if (layer?.layers?.[layerSeq[i]]) {
      layer = layer.layers[layerSeq[i]];

      i++;
    } else {
      fastify.log.error('ColorUpdate:: Layer not found', layer, i);
      return obj;
    }
  }

  // Check if shapes exist and the specific shape exists
  if (!layer.shapes || !layer.shapes[shapeSeq]) {
    fastify.log.error('ColorUpdate:: Shape not found');
    return obj;
  }

  const shape = layer.shapes[shapeSeq];

  // Check if 'it' array exists and the specific shape item exists
  if (!shape?.it || !shape?.it[shapeItemSeq]) {
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
  let newObj = { ...obj };

  let layer: Layer = newObj.layers[layerSeq[0]];
  if (!layer) {
    fastify.log.error('LayerDelete:: Layer not found', layer);
    return obj;
  }
  // Check if nested layers exist and the specific layer exists
  let i = 1;
  while (i < layerSeq.length - 1) {
    if (layer?.layers?.[layerSeq[i]]) {
      layer = layer.layers[layerSeq[i]];

      i++;
    } else {
      fastify.log.error('LayerDelete:: Layer not found', layer, i);
      return obj;
    }
  }

  if (!layer.layers?.[layerSeq[i]]) {
    fastify.log.error('LayerDelete:: Layer not found', layer, i);
    return obj;
  }

  delete layer.layers[layerSeq[i]];

  return newObj;
};
