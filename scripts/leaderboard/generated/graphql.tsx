import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  Cursor: any;
  Date: any;
  Datetime: any;
  JSON: any;
  Time: any;
  UUID: any;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']>;
  gt?: InputMaybe<Scalars['BigInt']>;
  gte?: InputMaybe<Scalars['BigInt']>;
  lt?: InputMaybe<Scalars['BigInt']>;
  lte?: InputMaybe<Scalars['BigInt']>;
  neq?: InputMaybe<Scalars['BigInt']>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  neq?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  neq?: InputMaybe<Scalars['Date']>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']>;
  gt?: InputMaybe<Scalars['Datetime']>;
  gte?: InputMaybe<Scalars['Datetime']>;
  lt?: InputMaybe<Scalars['Datetime']>;
  lte?: InputMaybe<Scalars['Datetime']>;
  neq?: InputMaybe<Scalars['Datetime']>;
};

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  neq?: InputMaybe<Scalars['Float']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
};

/** Boolean expression comparing fields on type "JSON" */
export type JsonFilter = {
  eq?: InputMaybe<Scalars['JSON']>;
  neq?: InputMaybe<Scalars['JSON']>;
};

export type Measurement = {
  __typename?: 'Measurement';
  createdAt: Scalars['Datetime'];
  id: Scalars['Int'];
  score: Scalars['Float'];
  team?: Maybe<Team>;
  teamId: Scalars['Int'];
  updatedAt: Scalars['Datetime'];
};

export type MeasurementConnection = {
  __typename?: 'MeasurementConnection';
  edges: Array<MeasurementEdge>;
  pageInfo: PageInfo;
};

export type MeasurementDeleteResponse = {
  __typename?: 'MeasurementDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Measurement>;
};

export type MeasurementEdge = {
  __typename?: 'MeasurementEdge';
  cursor: Scalars['String'];
  node?: Maybe<Measurement>;
};

export type MeasurementFilter = {
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<IntFilter>;
  score?: InputMaybe<FloatFilter>;
  teamId?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type MeasurementInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  score?: InputMaybe<Scalars['Float']>;
  teamId?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

export type MeasurementInsertResponse = {
  __typename?: 'MeasurementInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Measurement>;
};

export type MeasurementOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  score?: InputMaybe<OrderByDirection>;
  teamId?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
};

export type MeasurementUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  score?: InputMaybe<Scalars['Float']>;
  teamId?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

export type MeasurementUpdateResponse = {
  __typename?: 'MeasurementUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Measurement>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the collection */
  deleteFromMeasurementCollection: MeasurementDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFromQueueCollection: QueueDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFromTeamCollection: TeamDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFromUserCollection: UserDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFrom_prisma_migrationsCollection: _Prisma_MigrationsDeleteResponse;
  /** Adds one or more `MeasurementInsertResponse` records to the collection */
  insertIntoMeasurementCollection?: Maybe<MeasurementInsertResponse>;
  /** Adds one or more `QueueInsertResponse` records to the collection */
  insertIntoQueueCollection?: Maybe<QueueInsertResponse>;
  /** Adds one or more `TeamInsertResponse` records to the collection */
  insertIntoTeamCollection?: Maybe<TeamInsertResponse>;
  /** Adds one or more `UserInsertResponse` records to the collection */
  insertIntoUserCollection?: Maybe<UserInsertResponse>;
  /** Adds one or more `_prisma_migrationsInsertResponse` records to the collection */
  insertInto_prisma_migrationsCollection?: Maybe<_Prisma_MigrationsInsertResponse>;
  /** Updates zero or more records in the collection */
  updateMeasurementCollection: MeasurementUpdateResponse;
  /** Updates zero or more records in the collection */
  updateQueueCollection: QueueUpdateResponse;
  /** Updates zero or more records in the collection */
  updateTeamCollection: TeamUpdateResponse;
  /** Updates zero or more records in the collection */
  updateUserCollection: UserUpdateResponse;
  /** Updates zero or more records in the collection */
  update_prisma_migrationsCollection: _Prisma_MigrationsUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromMeasurementCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<MeasurementFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromQueueCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<QueueFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromTeamCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<TeamFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromUserCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<UserFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFrom_Prisma_MigrationsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<_Prisma_MigrationsFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoMeasurementCollectionArgs = {
  objects: Array<MeasurementInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoQueueCollectionArgs = {
  objects: Array<QueueInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoTeamCollectionArgs = {
  objects: Array<TeamInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoUserCollectionArgs = {
  objects: Array<UserInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertInto_Prisma_MigrationsCollectionArgs = {
  objects: Array<_Prisma_MigrationsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationUpdateMeasurementCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<MeasurementFilter>;
  set: MeasurementUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateQueueCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<QueueFilter>;
  set: QueueUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateTeamCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<TeamFilter>;
  set: TeamUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateUserCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<UserFilter>;
  set: UserUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdate_Prisma_MigrationsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<_Prisma_MigrationsFilter>;
  set: _Prisma_MigrationsUpdateInput;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  AscNullsFirst = 'AscNullsFirst',
  AscNullsLast = 'AscNullsLast',
  DescNullsFirst = 'DescNullsFirst',
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `_prisma_migrations` */
  _prisma_migrationsCollection?: Maybe<_Prisma_MigrationsConnection>;
  /** A pagable collection of type `Measurement` */
  measurementCollection?: Maybe<MeasurementConnection>;
  /** A pagable collection of type `Queue` */
  queueCollection?: Maybe<QueueConnection>;
  /** A pagable collection of type `Team` */
  teamCollection?: Maybe<TeamConnection>;
  /** A pagable collection of type `User` */
  userCollection?: Maybe<UserConnection>;
};


/** The root type for querying data */
export type Query_Prisma_MigrationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<_Prisma_MigrationsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<_Prisma_MigrationsOrderBy>>;
};


/** The root type for querying data */
export type QueryMeasurementCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<MeasurementFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MeasurementOrderBy>>;
};


/** The root type for querying data */
export type QueryQueueCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<QueueFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<QueueOrderBy>>;
};


/** The root type for querying data */
export type QueryTeamCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<TeamFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TeamOrderBy>>;
};


/** The root type for querying data */
export type QueryUserCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
};

export type Queue = {
  __typename?: 'Queue';
  id: Scalars['Int'];
  status: Scalars['String'];
  team?: Maybe<Team>;
  teamId: Scalars['Int'];
};

export type QueueConnection = {
  __typename?: 'QueueConnection';
  edges: Array<QueueEdge>;
  pageInfo: PageInfo;
};

export type QueueDeleteResponse = {
  __typename?: 'QueueDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Queue>;
};

export type QueueEdge = {
  __typename?: 'QueueEdge';
  cursor: Scalars['String'];
  node?: Maybe<Queue>;
};

export type QueueFilter = {
  id?: InputMaybe<IntFilter>;
  status?: InputMaybe<StringFilter>;
  teamId?: InputMaybe<IntFilter>;
};

export type QueueInsertInput = {
  status?: InputMaybe<Scalars['String']>;
  teamId?: InputMaybe<Scalars['Int']>;
};

export type QueueInsertResponse = {
  __typename?: 'QueueInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Queue>;
};

export type QueueOrderBy = {
  id?: InputMaybe<OrderByDirection>;
  status?: InputMaybe<OrderByDirection>;
  teamId?: InputMaybe<OrderByDirection>;
};

export type QueueUpdateInput = {
  status?: InputMaybe<Scalars['String']>;
  teamId?: InputMaybe<Scalars['Int']>;
};

export type QueueUpdateResponse = {
  __typename?: 'QueueUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Queue>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
};

export type Team = {
  __typename?: 'Team';
  createdAt: Scalars['Datetime'];
  id: Scalars['Int'];
  measurementCollection?: Maybe<MeasurementConnection>;
  name?: Maybe<Scalars['String']>;
  pageUrl: Scalars['String'];
  queueCollection?: Maybe<QueueConnection>;
  updatedAt: Scalars['Datetime'];
  userCollection?: Maybe<UserConnection>;
};


export type TeamMeasurementCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<MeasurementFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MeasurementOrderBy>>;
};


export type TeamQueueCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<QueueFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<QueueOrderBy>>;
};


export type TeamUserCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
};

export type TeamConnection = {
  __typename?: 'TeamConnection';
  edges: Array<TeamEdge>;
  pageInfo: PageInfo;
};

export type TeamDeleteResponse = {
  __typename?: 'TeamDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Team>;
};

export type TeamEdge = {
  __typename?: 'TeamEdge';
  cursor: Scalars['String'];
  node?: Maybe<Team>;
};

export type TeamFilter = {
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  pageUrl?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type TeamInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  name?: InputMaybe<Scalars['String']>;
  pageUrl?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

export type TeamInsertResponse = {
  __typename?: 'TeamInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Team>;
};

export type TeamOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  pageUrl?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
};

export type TeamUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  name?: InputMaybe<Scalars['String']>;
  pageUrl?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

export type TeamUpdateResponse = {
  __typename?: 'TeamUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Team>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']>;
  gt?: InputMaybe<Scalars['Time']>;
  gte?: InputMaybe<Scalars['Time']>;
  lt?: InputMaybe<Scalars['Time']>;
  lte?: InputMaybe<Scalars['Time']>;
  neq?: InputMaybe<Scalars['Time']>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']>;
  neq?: InputMaybe<Scalars['UUID']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Datetime'];
  email: Scalars['String'];
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  team?: Maybe<Team>;
  teamId: Scalars['Int'];
  updatedAt: Scalars['Datetime'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
};

export type UserDeleteResponse = {
  __typename?: 'UserDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<User>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node?: Maybe<User>;
};

export type UserFilter = {
  createdAt?: InputMaybe<DatetimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  teamId?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type UserInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  teamId?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

export type UserInsertResponse = {
  __typename?: 'UserInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<User>;
};

export type UserOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  email?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  teamId?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
};

export type UserUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  teamId?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

export type UserUpdateResponse = {
  __typename?: 'UserUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<User>;
};

export type _Prisma_Migrations = {
  __typename?: '_prisma_migrations';
  applied_steps_count: Scalars['Int'];
  checksum: Scalars['String'];
  finished_at?: Maybe<Scalars['Datetime']>;
  id: Scalars['String'];
  logs?: Maybe<Scalars['String']>;
  migration_name: Scalars['String'];
  rolled_back_at?: Maybe<Scalars['Datetime']>;
  started_at: Scalars['Datetime'];
};

export type _Prisma_MigrationsConnection = {
  __typename?: '_prisma_migrationsConnection';
  edges: Array<_Prisma_MigrationsEdge>;
  pageInfo: PageInfo;
};

export type _Prisma_MigrationsDeleteResponse = {
  __typename?: '_prisma_migrationsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<_Prisma_Migrations>;
};

export type _Prisma_MigrationsEdge = {
  __typename?: '_prisma_migrationsEdge';
  cursor: Scalars['String'];
  node?: Maybe<_Prisma_Migrations>;
};

export type _Prisma_MigrationsFilter = {
  applied_steps_count?: InputMaybe<IntFilter>;
  checksum?: InputMaybe<StringFilter>;
  finished_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<StringFilter>;
  logs?: InputMaybe<StringFilter>;
  migration_name?: InputMaybe<StringFilter>;
  rolled_back_at?: InputMaybe<DatetimeFilter>;
  started_at?: InputMaybe<DatetimeFilter>;
};

export type _Prisma_MigrationsInsertInput = {
  applied_steps_count?: InputMaybe<Scalars['Int']>;
  checksum?: InputMaybe<Scalars['String']>;
  finished_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['String']>;
  logs?: InputMaybe<Scalars['String']>;
  migration_name?: InputMaybe<Scalars['String']>;
  rolled_back_at?: InputMaybe<Scalars['Datetime']>;
  started_at?: InputMaybe<Scalars['Datetime']>;
};

export type _Prisma_MigrationsInsertResponse = {
  __typename?: '_prisma_migrationsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<_Prisma_Migrations>;
};

export type _Prisma_MigrationsOrderBy = {
  applied_steps_count?: InputMaybe<OrderByDirection>;
  checksum?: InputMaybe<OrderByDirection>;
  finished_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  logs?: InputMaybe<OrderByDirection>;
  migration_name?: InputMaybe<OrderByDirection>;
  rolled_back_at?: InputMaybe<OrderByDirection>;
  started_at?: InputMaybe<OrderByDirection>;
};

export type _Prisma_MigrationsUpdateInput = {
  applied_steps_count?: InputMaybe<Scalars['Int']>;
  checksum?: InputMaybe<Scalars['String']>;
  finished_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['String']>;
  logs?: InputMaybe<Scalars['String']>;
  migration_name?: InputMaybe<Scalars['String']>;
  rolled_back_at?: InputMaybe<Scalars['Datetime']>;
  started_at?: InputMaybe<Scalars['Datetime']>;
};

export type _Prisma_MigrationsUpdateResponse = {
  __typename?: '_prisma_migrationsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<_Prisma_Migrations>;
};

export type SampleQueryVariables = Exact<{ [key: string]: never; }>;


export type SampleQuery = { __typename?: 'Query', queueCollection?: { __typename?: 'QueueConnection', edges: Array<{ __typename?: 'QueueEdge', node?: { __typename?: 'Queue', id: number } | null }> } | null };


export const SampleDocument = gql`
    query sample {
  queueCollection {
    edges {
      node {
        id
      }
    }
  }
}
    `;

/**
 * __useSampleQuery__
 *
 * To run a query within a React component, call `useSampleQuery` and pass it any options that fit your needs.
 * When your component renders, `useSampleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSampleQuery({
 *   variables: {
 *   },
 * });
 */
export function useSampleQuery(baseOptions?: Apollo.QueryHookOptions<SampleQuery, SampleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SampleQuery, SampleQueryVariables>(SampleDocument, options);
      }
export function useSampleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SampleQuery, SampleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SampleQuery, SampleQueryVariables>(SampleDocument, options);
        }
export type SampleQueryHookResult = ReturnType<typeof useSampleQuery>;
export type SampleLazyQueryHookResult = ReturnType<typeof useSampleLazyQuery>;
export type SampleQueryResult = Apollo.QueryResult<SampleQuery, SampleQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    