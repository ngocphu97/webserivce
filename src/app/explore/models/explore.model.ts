export interface ExploreModel {
  id: string;
  name: string;
  audience_size: number;
  locale: string;
  path: Array<string>;
  description: string;
  topic: string;
  type: string;
}

export interface AdSuggestion {
  id: string;
  name: string;
  type: string;
  path: Array<string>;
  description: string;
  source: string;
  partner: string;
  audience_size: number;
  country: string;
  country_access: string;
  topic: string;
}
