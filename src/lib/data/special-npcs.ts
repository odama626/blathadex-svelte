export interface SpecialNpc {
  sourceSheet: SourceSheet;
  name: string;
  iconImage: null | string;
  photoImage: null | string;
  gender: Gender;
  genderAsia: Gender;
  versionAdded: null | string;
  npcId: string;
  internalId: number;
  birthday: string;
  nameColor: null | string;
  bubbleColor: null | string;
  iconFilename: null | string;
  photoFilename: null | string;
  uniqueEntryId: string;
}

export enum Gender {
  Female = 'Female',
  Male = 'Male',
}

export enum SourceSheet {
  SpecialNpcs = 'SpecialNpcs',
}
