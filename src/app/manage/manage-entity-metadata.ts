import { EntityMetadataMap, DefaultDataServiceConfig } from '@ngrx/data';

export const entityMetadata: EntityMetadataMap = {
  Manage: {}
};

export const entityConfig = {
  entityMetadata,
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  // root: 'https://graph.facebook.com',
  timeout: 3000, // request timeout
}
