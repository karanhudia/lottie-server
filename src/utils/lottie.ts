import { LottieAnimation } from '../graphql/generated';
import { FastifyInstance } from 'fastify';

export const updateLottieColorProperty = (
  fastify: FastifyInstance,
  obj: LottieAnimation,
  layerSeq: number,
  shapeSeq: number,
  shapeItemSeq: number,
  color: number[],
) => {
  // Check if layers exist and the specific layer exists
  if (!obj.layers?.[layerSeq]) {
    fastify.log.error('ColorUpdate:: Layer not found');
    return obj;
  }

  const layer = obj.layers[layerSeq];

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

  // Perform the update immutably using spread operators
  return {
    ...obj,
    layers: [
      ...obj.layers.slice(0, layerSeq),
      {
        ...layer,
        shapes: [
          ...layer.shapes.slice(0, shapeSeq),
          {
            ...shape,
            it: [
              ...shape.it.slice(0, shapeItemSeq),
              {
                ...item,
                c: {
                  ...item.c,
                  k: color,
                },
              },
              ...shape.it.slice(shapeItemSeq + 1),
            ],
          },
          ...layer.shapes.slice(shapeSeq + 1),
        ],
      },
      ...obj.layers.slice(layerSeq + 1),
    ],
  };
};
