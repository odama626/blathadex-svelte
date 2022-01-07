export interface SeasonAndEvent {
  sourceSheet: SourceSheet;
  name: string;
  type: Type;
  versionAdded: string;
  versionLastUpdated: VersionLastUpdated;
  year: YearEnum | number | null;
  datesNorthernHemisphere: null | string;
  datesSouthernHemisphere: null | string;
  displayName: string;
  eventNotes: null | string;
  internalLabel: null | string;
  unlockDate: number;
  unlockMethod: boolean | UnlockMethodEnum;
  uniqueEntryId: string;
}

export enum SourceSheet {
  SeasonsAndEvents = 'SeasonsAndEvents',
}

export enum Type {
  BasegameEvent = 'Basegame event',
  CraftingSeason = 'Crafting season',
  NookShoppingEvent = 'Nook Shopping event',
  ShoppingSeason = 'Shopping season',
  SpecialEvent = 'Special event',
  ZodiacSeason = 'Zodiac season',
}

export enum UnlockMethodEnum {
  BCATA = 'BCAT (a)',
  BCATB = 'BCAT (b)',
  BCATC = 'BCAT (c)',
  NTP = 'NTP',
}

export enum VersionLastUpdated {
  The100 = '1.0.0',
  The1100 = '1.10.0',
  The1110 = '1.11.0',
  The160 = '1.6.0',
  The170 = '1.7.0',
  The180 = '1.8.0',
  The190 = '1.9.0',
  The200 = '2.0.0',
}

export enum YearEnum {
  Any = 'Any',
}
