export interface Reaction {
  sourceSheet: SourceSheet;
  num: number;
  name: string;
  image: string;
  source: string[];
  sourceNotes: SourceNotes | null;
  seasonEvent: SeasonEvent | null;
  seasonEventExclusive: boolean | null;
  versionAdded: VersionAdded;
  iconFilename: string;
  internalId: number;
  uniqueEntryId: string;
}

export enum SeasonEvent {
  FestivaleReadyDaysFestivale = 'Festivale (ready days); Festivale',
  Halloween = 'Halloween',
  HappyHomeParadise = 'Happy Home Paradise',
}

export enum SourceNotes {
  ReceivedAfterDoingYour50ThGroupStretch = 'Received after doing your 50th group stretch',
  RequiresAHighLevelOfFriendship = 'Requires a high level of friendship',
}

export enum SourceSheet {
  Reactions = 'Reactions',
}

export enum VersionAdded {
  The100 = '1.0.0',
  The150 = '1.5.0',
  The160 = '1.6.0',
  The170 = '1.7.0',
  The200 = '2.0.0',
}
