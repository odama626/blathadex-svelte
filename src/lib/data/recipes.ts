export interface Recipe {
  sourceSheet: SourceSheet;
  name: string;
  image: string;
  imageSh: null | string;
  buy: number;
  sell: number | null;
  exchangePrice: number | null;
  exchangeCurrency: ExchangeCurrency | null;
  source: string[];
  sourceNotes: null | string;
  seasonEvent: null | string;
  seasonEventExclusive: boolean | null;
  versionAdded: VersionAdded;
  unlocked: boolean;
  recipesToUnlock: number;
  category: Category;
  craftedItemInternalId: number;
  cardColor: null | string;
  diyIconFilename: string;
  diyIconFilenameSh: null | string;
  serialId: number;
  internalId: number;
  uniqueEntryId: string;
  materials: {[key: string]: number};
}

export enum Category {
  CeilingDecor = 'Ceiling Decor',
  Equipment = 'Equipment',
  Floors = 'Floors',
  Housewares = 'Housewares',
  Miscellaneous = 'Miscellaneous',
  Other = 'Other',
  Rugs = 'Rugs',
  Savory = 'Savory',
  Sweet = 'Sweet',
  Tools = 'Tools',
  WallMounted = 'Wall-mounted',
  Wallpaper = 'Wallpaper',
}

export enum ExchangeCurrency {
  NookMiles = 'Nook Miles',
}

export enum SourceSheet {
  Recipes = 'Recipes',
}

export enum VersionAdded {
  The100 = '1.0.0',
  The110 = '1.1.0',
  The1110 = '1.11.0',
  The120 = '1.2.0',
  The130 = '1.3.0',
  The140 = '1.4.0',
  The150 = '1.5.0',
  The160 = '1.6.0',
  The170 = '1.7.0',
  The180 = '1.8.0',
  The200 = '2.0.0',
}
