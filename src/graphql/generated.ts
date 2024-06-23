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

export type ColorPayload = {
  __typename?: 'ColorPayload';
  color: Array<Scalars['Int']['output']>;
  layer: Scalars['Int']['output'];
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

export type Lottie = {
  __typename?: 'Lottie';
  createdAt: Scalars['Date']['output'];
  json: Scalars['JSON']['output'];
  updatedAt: Scalars['Date']['output'];
  uuid: Scalars['String']['output'];
};

export enum LottieSocketEvents {
  CreateJson = 'Create_Json',
  UpdateJson = 'Update_Json',
}

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

export type SpeedPayload = {
  __typename?: 'SpeedPayload';
  frameRate: Scalars['Int']['output'];
};

export type UpdateLottieColorMessage = {
  __typename?: 'UpdateLottieColorMessage';
  payload: ColorPayload;
  uuid: Scalars['String']['output'];
};

export type UpdateLottieMessage =
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
    | UpdateLottieColorMessage
    | UpdateLottieScaleMessage
    | UpdateLottieSpeedMessage;
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ColorPayload: ResolverTypeWrapper<ColorPayload>;
  CreateLottieMessage: ResolverTypeWrapper<CreateLottieMessage>;
  CreateLottiePayload: ResolverTypeWrapper<CreateLottiePayload>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  File: ResolverTypeWrapper<Scalars['File']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Lottie: ResolverTypeWrapper<Lottie>;
  LottieSocketEvents: LottieSocketEvents;
  Query: ResolverTypeWrapper<{}>;
  ScalePayload: ResolverTypeWrapper<ScalePayload>;
  SpeedPayload: ResolverTypeWrapper<SpeedPayload>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateLottieColorMessage: ResolverTypeWrapper<UpdateLottieColorMessage>;
  UpdateLottieMessage: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['UpdateLottieMessage']
  >;
  UpdateLottieScaleMessage: ResolverTypeWrapper<UpdateLottieScaleMessage>;
  UpdateLottieSpeedMessage: ResolverTypeWrapper<UpdateLottieSpeedMessage>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  ColorPayload: ColorPayload;
  CreateLottieMessage: CreateLottieMessage;
  CreateLottiePayload: CreateLottiePayload;
  Date: Scalars['Date']['output'];
  File: Scalars['File']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Lottie: Lottie;
  Query: {};
  ScalePayload: ScalePayload;
  SpeedPayload: SpeedPayload;
  String: Scalars['String']['output'];
  UpdateLottieColorMessage: UpdateLottieColorMessage;
  UpdateLottieMessage: ResolversUnionTypes<ResolversParentTypes>['UpdateLottieMessage'];
  UpdateLottieScaleMessage: UpdateLottieScaleMessage;
  UpdateLottieSpeedMessage: UpdateLottieSpeedMessage;
};

export type ColorPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ColorPayload'] = ResolversParentTypes['ColorPayload'],
> = {
  color?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  layer?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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

export interface FileScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['File'], any> {
  name: 'File';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

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

export type SpeedPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SpeedPayload'] = ResolversParentTypes['SpeedPayload'],
> = {
  frameRate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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
    'UpdateLottieColorMessage' | 'UpdateLottieScaleMessage' | 'UpdateLottieSpeedMessage',
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
  ColorPayload?: ColorPayloadResolvers<ContextType>;
  CreateLottieMessage?: CreateLottieMessageResolvers<ContextType>;
  CreateLottiePayload?: CreateLottiePayloadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  File?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Lottie?: LottieResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ScalePayload?: ScalePayloadResolvers<ContextType>;
  SpeedPayload?: SpeedPayloadResolvers<ContextType>;
  UpdateLottieColorMessage?: UpdateLottieColorMessageResolvers<ContextType>;
  UpdateLottieMessage?: UpdateLottieMessageResolvers<ContextType>;
  UpdateLottieScaleMessage?: UpdateLottieScaleMessageResolvers<ContextType>;
  UpdateLottieSpeedMessage?: UpdateLottieSpeedMessageResolvers<ContextType>;
};
