export interface Construction {
  sourceSheet: SourceSheet;
  name: null | string;
  image: string;
  buy: number | null;
  category: Category | null;
  source: Source[];
  filename: string;
  versionAdded: VersionAdded;
  uniqueEntryId: string;
}

export enum Category {
  Bridge = 'Bridge',
  Door = 'Door',
  Incline = 'Incline',
  Mailbox = 'Mailbox',
  Roofing = 'Roofing',
  Siding = 'Siding',
}

export enum Source {
  Empty = '',
  InitialHouse = 'Initial House',
  ResidentServicesUpgrade = 'Resident Services Upgrade',
  Tent = 'Tent',
  The3RDHouseUpgradeLeftRoom = '3rd House Upgrade (Left Room)',
  The4ThHouseUpgradeRightRoom = '4th House Upgrade (Right Room)',
  The5ThHouseUpgrade2NdFloor = '5th House Upgrade (2nd Floor)',
}

export enum SourceSheet {
  Construction = 'Construction',
}

export enum VersionAdded {
  The100 = '1.0.0',
  The200 = '2.0.0',
}
