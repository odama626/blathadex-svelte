export interface Achievement {
  sourceSheet: SourceSheet;
  name: string;
  achievementDescription: string;
  achievementCriteria: string;
  num: number;
  internalId: number | string;
  internalName: string;
  internalCategory: string;
  sequential: boolean;
  versionAdded: VersionAdded;
  uniqueEntryId: string;
  tiers: Tier[];
}

export enum SourceSheet {
  Achievements = 'Achievements',
}

export interface Tier {
  qty: number;
  reward: number;
  modifier: string;
  Noun: string;
}

export enum VersionAdded {
  The100 = '1.0.0',
  The120 = '1.2.0',
  The130 = '1.3.0',
  The200 = '2.0.0',
}
