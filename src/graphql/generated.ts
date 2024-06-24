import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
  File: { input: any; output: any };
  JSON: { input: any; output: any };
};

export type AnimatedProperty = {
  __typename?: 'AnimatedProperty';
  a: Scalars['Int']['output'];
  ix: Scalars['Int']['output'];
  k: Array<Keyframe>;
  l?: Maybe<Scalars['Int']['output']>;
};

export type Asset = {
  __typename?: 'Asset';
  e?: Maybe<Scalars['Int']['output']>;
  h?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  layers?: Maybe<Array<Maybe<Layer>>>;
  p?: Maybe<Scalars['String']['output']>;
  u?: Maybe<Scalars['String']['output']>;
  w?: Maybe<Scalars['Int']['output']>;
};

export type Color = {
  __typename?: 'Color';
  a: Scalars['Int']['output'];
  ix: Scalars['Int']['output'];
  k: Array<Scalars['Int']['output']>;
};

export type ColorPayload = {
  __typename?: 'ColorPayload';
  color: Array<Scalars['Int']['output']>;
  layer: Array<Scalars['Int']['output']>;
  shape: Scalars['Int']['output'];
  shapeItem: Scalars['Int']['output'];
};

export type CreateLottieMessage = {
  __typename?: 'CreateLottieMessage';
  payload?: Maybe<CreateLottiePayload>;
  uuid: Scalars['String']['output'];
};

export type CreateLottiePayload = {
  __typename?: 'CreateLottiePayload';
  json: Scalars['JSON']['output'];
};

export type DeleteLottieLayerMessage = {
  __typename?: 'DeleteLottieLayerMessage';
  payload: LayerPayload;
  uuid: Scalars['String']['output'];
};

export type Easing = {
  __typename?: 'Easing';
  x: Array<Scalars['Float']['output']>;
  y: Array<Scalars['Float']['output']>;
};

export type Keyframe = {
  __typename?: 'Keyframe';
  i: Easing;
  o: Easing;
  s: Array<Scalars['Float']['output']>;
  t: Scalars['Int']['output'];
};

export type Layer = {
  __typename?: 'Layer';
  ao?: Maybe<Scalars['Int']['output']>;
  bm: Scalars['Int']['output'];
  ct?: Maybe<Scalars['Int']['output']>;
  ddd: Scalars['Int']['output'];
  ind: Scalars['Int']['output'];
  ip: Scalars['Int']['output'];
  ks: Transform;
  layers?: Maybe<Array<Layer>>;
  nm: Scalars['String']['output'];
  op: Scalars['Int']['output'];
  shapes?: Maybe<Array<Shape>>;
  sr: Scalars['Float']['output'];
  st: Scalars['Int']['output'];
  ty: Scalars['Int']['output'];
};

export type LayerPayload = {
  __typename?: 'LayerPayload';
  layer: Scalars['Int']['output'];
};

export type Lottie = {
  __typename?: 'Lottie';
  createdAt: Scalars['Date']['output'];
  json: Scalars['JSON']['output'];
  updatedAt: Scalars['Date']['output'];
  uuid: Scalars['String']['output'];
};

export type LottieAnimation = {
  __typename?: 'LottieAnimation';
  assets: Array<Asset>;
  ddd: Scalars['Int']['output'];
  fr: Scalars['Float']['output'];
  h: Scalars['Int']['output'];
  ip: Scalars['Int']['output'];
  layers: Array<Layer>;
  nm: Scalars['String']['output'];
  op: Scalars['Int']['output'];
  v: Scalars['String']['output'];
  w: Scalars['Int']['output'];
};

export enum LottieSocketEvents {
  CreateJson = 'Create_Json',
  UpdateJson = 'Update_Json',
}

export type Property = {
  __typename?: 'Property';
  a: Scalars['Int']['output'];
  ix: Scalars['Int']['output'];
  k: Scalars['JSON']['output'];
};

export type Query = {
  __typename?: 'Query';
  lottie?: Maybe<Lottie>;
};

export type QueryLottieArgs = {
  uuid: Scalars['ID']['input'];
};

export type ScalePayload = {
  __typename?: 'ScalePayload';
  scale: Scalars['Float']['output'];
};

export type Shape = {
  __typename?: 'Shape';
  bm: Scalars['Int']['output'];
  cix: Scalars['Int']['output'];
  hd: Scalars['Boolean']['output'];
  it?: Maybe<Array<Maybe<ShapeItem>>>;
  ix: Scalars['Int']['output'];
  mn: Scalars['String']['output'];
  nm: Scalars['String']['output'];
  np: Scalars['Int']['output'];
  ty: Scalars['String']['output'];
};

export type ShapeItem = {
  __typename?: 'ShapeItem';
  c?: Maybe<Color>;
  hd: Scalars['Boolean']['output'];
  ind: Scalars['Int']['output'];
  ix: Scalars['Int']['output'];
  ks?: Maybe<ShapeProperty>;
  mn: Scalars['String']['output'];
  nm: Scalars['String']['output'];
  ty: Scalars['String']['output'];
};

export type ShapeKeyframe = {
  __typename?: 'ShapeKeyframe';
  c: Scalars['Boolean']['output'];
  i: Array<Array<Scalars['Float']['output']>>;
  o: Array<Array<Scalars['Float']['output']>>;
  v: Array<Array<Scalars['Float']['output']>>;
};

export type ShapeProperty = {
  __typename?: 'ShapeProperty';
  a: Scalars['Int']['output'];
  ix: Scalars['Int']['output'];
  k: ShapeKeyframe;
};

export type SocketAcknowledgement = {
  __typename?: 'SocketAcknowledgement';
  code: Scalars['Int']['output'];
  status: Scalars['String']['output'];
};

export type SpeedPayload = {
  __typename?: 'SpeedPayload';
  frameRate: Scalars['Int']['output'];
};

export type Transform = {
  __typename?: 'Transform';
  a: Property;
  ix?: Maybe<Scalars['Int']['output']>;
  l?: Maybe<Scalars['Int']['output']>;
  o: Property;
  p: Property;
  r: Property;
  s: AnimatedProperty;
};

export type UpdateLottieColorMessage = {
  __typename?: 'UpdateLottieColorMessage';
  payload: ColorPayload;
  uuid: Scalars['String']['output'];
};

export type UpdateLottieMessage =
  | DeleteLottieLayerMessage
  | UpdateLottieColorMessage
  | UpdateLottieScaleMessage
  | UpdateLottieSpeedMessage;

export type UpdateLottieScaleMessage = {
  __typename?: 'UpdateLottieScaleMessage';
  payload: ScalePayload;
  uuid: Scalars['String']['output'];
};

export type UpdateLottieSpeedMessage = {
  __typename?: 'UpdateLottieSpeedMessage';
  payload: SpeedPayload;
  uuid: Scalars['String']['output'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  UpdateLottieMessage:
    | DeleteLottieLayerMessage
    | UpdateLottieColorMessage
    | UpdateLottieScaleMessage
    | UpdateLottieSpeedMessage;
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AnimatedProperty: ResolverTypeWrapper<AnimatedProperty>;
  Asset: ResolverTypeWrapper<Asset>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Color: ResolverTypeWrapper<Color>;
  ColorPayload: ResolverTypeWrapper<ColorPayload>;
  CreateLottieMessage: ResolverTypeWrapper<CreateLottieMessage>;
  CreateLottiePayload: ResolverTypeWrapper<CreateLottiePayload>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DeleteLottieLayerMessage: ResolverTypeWrapper<DeleteLottieLayerMessage>;
  Easing: ResolverTypeWrapper<Easing>;
  File: ResolverTypeWrapper<Scalars['File']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Keyframe: ResolverTypeWrapper<Keyframe>;
  Layer: ResolverTypeWrapper<Layer>;
  LayerPayload: ResolverTypeWrapper<LayerPayload>;
  Lottie: ResolverTypeWrapper<Lottie>;
  LottieAnimation: ResolverTypeWrapper<LottieAnimation>;
  LottieSocketEvents: LottieSocketEvents;
  Property: ResolverTypeWrapper<Property>;
  Query: ResolverTypeWrapper<{}>;
  ScalePayload: ResolverTypeWrapper<ScalePayload>;
  Shape: ResolverTypeWrapper<Shape>;
  ShapeItem: ResolverTypeWrapper<ShapeItem>;
  ShapeKeyframe: ResolverTypeWrapper<ShapeKeyframe>;
  ShapeProperty: ResolverTypeWrapper<ShapeProperty>;
  SocketAcknowledgement: ResolverTypeWrapper<SocketAcknowledgement>;
  SpeedPayload: ResolverTypeWrapper<SpeedPayload>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Transform: ResolverTypeWrapper<Transform>;
  UpdateLottieColorMessage: ResolverTypeWrapper<UpdateLottieColorMessage>;
  UpdateLottieMessage: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['UpdateLottieMessage']
  >;
  UpdateLottieScaleMessage: ResolverTypeWrapper<UpdateLottieScaleMessage>;
  UpdateLottieSpeedMessage: ResolverTypeWrapper<UpdateLottieSpeedMessage>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AnimatedProperty: AnimatedProperty;
  Asset: Asset;
  Boolean: Scalars['Boolean']['output'];
  Color: Color;
  ColorPayload: ColorPayload;
  CreateLottieMessage: CreateLottieMessage;
  CreateLottiePayload: CreateLottiePayload;
  Date: Scalars['Date']['output'];
  DeleteLottieLayerMessage: DeleteLottieLayerMessage;
  Easing: Easing;
  File: Scalars['File']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Keyframe: Keyframe;
  Layer: Layer;
  LayerPayload: LayerPayload;
  Lottie: Lottie;
  LottieAnimation: LottieAnimation;
  Property: Property;
  Query: {};
  ScalePayload: ScalePayload;
  Shape: Shape;
  ShapeItem: ShapeItem;
  ShapeKeyframe: ShapeKeyframe;
  ShapeProperty: ShapeProperty;
  SocketAcknowledgement: SocketAcknowledgement;
  SpeedPayload: SpeedPayload;
  String: Scalars['String']['output'];
  Transform: Transform;
  UpdateLottieColorMessage: UpdateLottieColorMessage;
  UpdateLottieMessage: ResolversUnionTypes<ResolversParentTypes>['UpdateLottieMessage'];
  UpdateLottieScaleMessage: UpdateLottieScaleMessage;
  UpdateLottieSpeedMessage: UpdateLottieSpeedMessage;
};

export type AnimatedPropertyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['AnimatedProperty'] = ResolversParentTypes['AnimatedProperty'],
> = {
  a?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ix?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  k?: Resolver<Array<ResolversTypes['Keyframe']>, ParentType, ContextType>;
  l?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AssetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Asset'] = ResolversParentTypes['Asset'],
> = {
  e?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  h?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  layers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Layer']>>>, ParentType, ContextType>;
  p?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  u?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  w?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ColorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Color'] = ResolversParentTypes['Color'],
> = {
  a?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ix?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  k?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ColorPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ColorPayload'] = ResolversParentTypes['ColorPayload'],
> = {
  color?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  layer?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  shape?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  shapeItem?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateLottieMessageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CreateLottieMessage'] = ResolversParentTypes['CreateLottieMessage'],
> = {
  payload?: Resolver<Maybe<ResolversTypes['CreateLottiePayload']>, ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateLottiePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CreateLottiePayload'] = ResolversParentTypes['CreateLottiePayload'],
> = {
  json?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DeleteLottieLayerMessageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DeleteLottieLayerMessage'] = ResolversParentTypes['DeleteLottieLayerMessage'],
> = {
  payload?: Resolver<ResolversTypes['LayerPayload'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EasingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Easing'] = ResolversParentTypes['Easing'],
> = {
  x?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  y?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface FileScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['File'], any> {
  name: 'File';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type KeyframeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Keyframe'] = ResolversParentTypes['Keyframe'],
> = {
  i?: Resolver<ResolversTypes['Easing'], ParentType, ContextType>;
  o?: Resolver<ResolversTypes['Easing'], ParentType, ContextType>;
  s?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  t?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LayerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Layer'] = ResolversParentTypes['Layer'],
> = {
  ao?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  bm?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ct?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ddd?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ind?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ip?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ks?: Resolver<ResolversTypes['Transform'], ParentType, ContextType>;
  layers?: Resolver<Maybe<Array<ResolversTypes['Layer']>>, ParentType, ContextType>;
  nm?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  op?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  shapes?: Resolver<Maybe<Array<ResolversTypes['Shape']>>, ParentType, ContextType>;
  sr?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  st?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ty?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LayerPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LayerPayload'] = ResolversParentTypes['LayerPayload'],
> = {
  layer?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LottieResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Lottie'] = ResolversParentTypes['Lottie'],
> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  json?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LottieAnimationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['LottieAnimation'] = ResolversParentTypes['LottieAnimation'],
> = {
  assets?: Resolver<Array<ResolversTypes['Asset']>, ParentType, ContextType>;
  ddd?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  fr?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  h?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ip?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  layers?: Resolver<Array<ResolversTypes['Layer']>, ParentType, ContextType>;
  nm?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  op?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  v?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  w?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PropertyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Property'] = ResolversParentTypes['Property'],
> = {
  a?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ix?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  k?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  lottie?: Resolver<
    Maybe<ResolversTypes['Lottie']>,
    ParentType,
    ContextType,
    RequireFields<QueryLottieArgs, 'uuid'>
  >;
};

export type ScalePayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ScalePayload'] = ResolversParentTypes['ScalePayload'],
> = {
  scale?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShapeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Shape'] = ResolversParentTypes['Shape'],
> = {
  bm?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  cix?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hd?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  it?: Resolver<Maybe<Array<Maybe<ResolversTypes['ShapeItem']>>>, ParentType, ContextType>;
  ix?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  mn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nm?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  np?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ty?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShapeItemResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ShapeItem'] = ResolversParentTypes['ShapeItem'],
> = {
  c?: Resolver<Maybe<ResolversTypes['Color']>, ParentType, ContextType>;
  hd?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  ind?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ix?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ks?: Resolver<Maybe<ResolversTypes['ShapeProperty']>, ParentType, ContextType>;
  mn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nm?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ty?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShapeKeyframeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ShapeKeyframe'] = ResolversParentTypes['ShapeKeyframe'],
> = {
  c?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  i?: Resolver<Array<Array<ResolversTypes['Float']>>, ParentType, ContextType>;
  o?: Resolver<Array<Array<ResolversTypes['Float']>>, ParentType, ContextType>;
  v?: Resolver<Array<Array<ResolversTypes['Float']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShapePropertyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ShapeProperty'] = ResolversParentTypes['ShapeProperty'],
> = {
  a?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ix?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  k?: Resolver<ResolversTypes['ShapeKeyframe'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SocketAcknowledgementResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SocketAcknowledgement'] = ResolversParentTypes['SocketAcknowledgement'],
> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpeedPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SpeedPayload'] = ResolversParentTypes['SpeedPayload'],
> = {
  frameRate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransformResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Transform'] = ResolversParentTypes['Transform'],
> = {
  a?: Resolver<ResolversTypes['Property'], ParentType, ContextType>;
  ix?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  l?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  o?: Resolver<ResolversTypes['Property'], ParentType, ContextType>;
  p?: Resolver<ResolversTypes['Property'], ParentType, ContextType>;
  r?: Resolver<ResolversTypes['Property'], ParentType, ContextType>;
  s?: Resolver<ResolversTypes['AnimatedProperty'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateLottieColorMessageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UpdateLottieColorMessage'] = ResolversParentTypes['UpdateLottieColorMessage'],
> = {
  payload?: Resolver<ResolversTypes['ColorPayload'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateLottieMessageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UpdateLottieMessage'] = ResolversParentTypes['UpdateLottieMessage'],
> = {
  __resolveType: TypeResolveFn<
    | 'DeleteLottieLayerMessage'
    | 'UpdateLottieColorMessage'
    | 'UpdateLottieScaleMessage'
    | 'UpdateLottieSpeedMessage',
    ParentType,
    ContextType
  >;
};

export type UpdateLottieScaleMessageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UpdateLottieScaleMessage'] = ResolversParentTypes['UpdateLottieScaleMessage'],
> = {
  payload?: Resolver<ResolversTypes['ScalePayload'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateLottieSpeedMessageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UpdateLottieSpeedMessage'] = ResolversParentTypes['UpdateLottieSpeedMessage'],
> = {
  payload?: Resolver<ResolversTypes['SpeedPayload'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AnimatedProperty?: AnimatedPropertyResolvers<ContextType>;
  Asset?: AssetResolvers<ContextType>;
  Color?: ColorResolvers<ContextType>;
  ColorPayload?: ColorPayloadResolvers<ContextType>;
  CreateLottieMessage?: CreateLottieMessageResolvers<ContextType>;
  CreateLottiePayload?: CreateLottiePayloadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DeleteLottieLayerMessage?: DeleteLottieLayerMessageResolvers<ContextType>;
  Easing?: EasingResolvers<ContextType>;
  File?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Keyframe?: KeyframeResolvers<ContextType>;
  Layer?: LayerResolvers<ContextType>;
  LayerPayload?: LayerPayloadResolvers<ContextType>;
  Lottie?: LottieResolvers<ContextType>;
  LottieAnimation?: LottieAnimationResolvers<ContextType>;
  Property?: PropertyResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ScalePayload?: ScalePayloadResolvers<ContextType>;
  Shape?: ShapeResolvers<ContextType>;
  ShapeItem?: ShapeItemResolvers<ContextType>;
  ShapeKeyframe?: ShapeKeyframeResolvers<ContextType>;
  ShapeProperty?: ShapePropertyResolvers<ContextType>;
  SocketAcknowledgement?: SocketAcknowledgementResolvers<ContextType>;
  SpeedPayload?: SpeedPayloadResolvers<ContextType>;
  Transform?: TransformResolvers<ContextType>;
  UpdateLottieColorMessage?: UpdateLottieColorMessageResolvers<ContextType>;
  UpdateLottieMessage?: UpdateLottieMessageResolvers<ContextType>;
  UpdateLottieScaleMessage?: UpdateLottieScaleMessageResolvers<ContextType>;
  UpdateLottieSpeedMessage?: UpdateLottieSpeedMessageResolvers<ContextType>;
};
