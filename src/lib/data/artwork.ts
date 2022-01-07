export interface Artwork {
  sourceSheet: SourceSheet;
  name: string;
  image: string;
  highResTexture: null | string;
  genuine: boolean;
  category: Category;
  buy: number;
  sell: number | null;
  color1: string;
  color2: string;
  size: Size;
  realArtworkTitle: string;
  artist: string;
  description: string;
  source: Source[];
  sourceNotes: null;
  hhaBasePoints: number;
  hhaConcept1: HhaConcept1;
  hhaConcept2: HhaConcept2 | null;
  hhaSeries: null;
  hhaSet: null;
  interact: boolean;
  tag: Tag;
  speakerType: null;
  lightingType: null;
  catalog: Catalog;
  versionAdded: VersionAdded;
  unlocked: boolean;
  filename: string;
  internalId: number;
  uniqueEntryId: string;
}

export enum Catalog {
  NotForSale = 'Not for sale',
}

export enum Category {
  Housewares = 'Housewares',
  Miscellaneous = 'Miscellaneous',
  WallMounted = 'Wall-mounted',
}

export enum HhaConcept1 {
  Ancient = 'ancient',
  European = 'European',
  Expensive = 'expensive',
  Harmonious = 'harmonious',
  Horror = 'horror',
  Resort = 'resort',
}

export enum HhaConcept2 {
  CityLife = 'city life',
  European = 'European',
  Harmonious = 'harmonious',
}

export enum Size {
  The1X1 = '1x1',
  The1X2 = '1x2',
  The2X1 = '2x1',
  The2X15 = '2x1.5',
  The2X2 = '2x2',
}

export enum Source {
  JollyReddSTreasureTrawler = "Jolly Redd's Treasure Trawler",
}

export enum SourceSheet {
  Artwork = 'Artwork',
}

export enum Tag {
  Picture = 'Picture',
  Sculpture = 'Sculpture',
}

export enum VersionAdded {
  The120 = '1.2.0',
}
