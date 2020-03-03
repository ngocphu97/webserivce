import { EntityMetadataMap, DefaultDataServiceConfig } from '@ngrx/data';

export const entityMetadata: EntityMetadataMap = {
  Explore: {}
};

const pluralNames = { Explore: 'Explores' };

export const entityConfig = {
  entityMetadata,
  pluralNames
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'https://graph.facebook.com',
  timeout: 3000,
}
