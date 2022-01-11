export interface Flower {
  sourceSheet: SourceSheet;
  name: string;
  diy: boolean;
  stackSize: number;
  exchangePrice: null;
  exchangeCurrency: null;
  sourceNotes: null;
  seasonEvent: null;
  seasonEventExclusive: null;
  hhaBasePoints: number;
  tag: Tag;
  foodPower: null;
  versionAdded: VersionAdded;
  unlocked: boolean;
  inventoryFilename: string;
  storageFilename: string;
  variants: Variant[];
  color: string;
  genus: string;
  breed: Array<Breed[]>;
}

export interface Breed {
  hybrid: boolean;
  color: BreedColor;
  name: string;
  image: string;
}

export enum BreedColor {
  Blue = 'blue',
  Orange = 'orange',
  Purple = 'purple',
  Red = 'red',
  White = 'white',
  Yellow = 'yellow',
}

export enum SourceSheet {
  Other = 'Other',
}

export enum Tag {
  Plants = 'Plants',
}

export interface Variant {
  uniqueEntryId: string;
  colors: ColorElement[];
  source: Source[];
  internalId: number;
  buy: number;
  sell: number;
  themes: any[];
  storageImage: string;
  inventoryImage: string;
}

export enum ColorElement {
  Black = 'Black',
  Blue = 'Blue',
  Green = 'Green',
  Orange = 'Orange',
  Pink = 'Pink',
  Purple = 'Purple',
  Red = 'Red',
  White = 'White',
  Yellow = 'Yellow',
}

export enum Source {
  PickingFlowers = 'Picking flowers',
}

export enum VersionAdded {
  The100 = '1.0.0',
}
