export interface Gyroid {
  sourceSheet: SourceSheet;
  name: string;
  image: string;
  variation: null | string;
  bodyTitle: BodyTitle | null;
  pattern: null;
  patternTitle: null;
  diy: boolean;
  bodyCustomize: boolean;
  patternCustomize: boolean;
  kitCost: number | null;
  kitType: KitType | null;
  cyrusCustomizePrice: number | null;
  buy: number;
  sell: number;
  color1: Color;
  color2: Color;
  exchangePrice: null;
  exchangeCurrency: null;
  size: Size;
  source: Source[];
  sourceNotes: null | string;
  seasonEvent: null;
  seasonEventExclusive: null;
  hhaBasePoints: number;
  hhaConcept1: null;
  hhaConcept2: null;
  hhaSeries: null;
  hhaSet: null;
  hhaCategory: null;
  interact: boolean;
  tag: Tag;
  outdoor: boolean;
  lightingType: null | string;
  soundType: SoundType;
  catalog: Catalog;
  versionAdded: VersionAdded;
  unlocked: boolean;
  filename: string;
  variantId: VariantID | null;
  internalId: number;
  uniqueEntryId: string;
}

export enum BodyTitle {
  Color = 'Color',
}

export enum Catalog {
  NotForSale = 'Not for sale',
}

export enum Color {
  Aqua = 'Aqua',
  Beige = 'Beige',
  Black = 'Black',
  Blue = 'Blue',
  Brown = 'Brown',
  Colorful = 'Colorful',
  Gray = 'Gray',
  Green = 'Green',
  Orange = 'Orange',
  Pink = 'Pink',
  Purple = 'Purple',
  Red = 'Red',
  White = 'White',
  Yellow = 'Yellow',
}

export enum KitType {
  Normal = 'Normal',
}

export enum Size {
  The1X1 = '1x1',
}

export enum SoundType {
  Crash = 'Crash',
  DrumSet = 'Drum set',
  HiHat = 'Hi-hat',
  Kick = 'Kick',
  Melody = 'Melody',
  Snare = 'Snare',
}

export enum Source {
  Brewster = 'Brewster',
  DigSpot = 'Dig Spot',
}

export enum SourceSheet {
  Gyroids = 'Gyroids',
}

export enum Tag {
  Haniwa = 'Haniwa',
}

export enum VariantID {
  The0_0 = '0_0',
  The1_0 = '1_0',
  The2_0 = '2_0',
  The3_0 = '3_0',
  The4_0 = '4_0',
  The5_0 = '5_0',
  The6_0 = '6_0',
}

export enum VersionAdded {
  The200 = '2.0.0',
}
