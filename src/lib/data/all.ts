export interface Item {
  sourceSheet: SourceSheet;
  name: null | string;
  patternTitle?: null | string;
  diy?: boolean;
  patternCustomize?: boolean;
  kitType?: KitType | null;
  cyrusCustomizePrice?: number | null;
  size?: Size;
  surface?: boolean;
  exchangePrice?: number | null;
  exchangeCurrency?: ExchangeCurrency | null;
  sourceNotes?: null | string;
  seasonEvent?: null | string;
  seasonEventExclusive?: boolean | null;
  hhaBasePoints?: number;
  hhaCategory?: HhaCategory | null;
  interact?: boolean | InteractEnum;
  tag?: string;
  outdoor?: boolean;
  speakerType?: null | string;
  lightingType?: LightingType | null;
  catalog?: Catalog;
  versionAdded?: Version | null;
  unlocked?: boolean;
  set?: null | string;
  series?: null | string;
  customizationKitCost?: number | null;
  variants?: Variant[];
  stackSize?: number;
  foodPower?: number | null;
  doorDeco?: boolean;
  vfx?: boolean;
  vfxType?: VfxType | null;
  windowType?: WindowType | null;
  windowColor?: WindowColor | null;
  paneType?: PaneType | null;
  curtainType?: CurtainType | null;
  curtainColor?: null | string;
  ceilingType?: CeilingType;
  sizeCategory?: Shadow;
  customize?: boolean;
  uses?: number;
  villagerEquippable?: boolean;
  seasonalAvailability?: SeasonalAvailability;
  seasonality?: SeasonalAvailability;
  mannequinSeason?: SeasonalAvailability | null;
  gender?: Gender;
  villagerGender?: Gender;
  style1?: Style;
  style2?: Style | null;
  sortOrder?: number;
  clothGroupId?: number;
  primaryShape?: PrimaryShape;
  secondaryShape?: SecondaryShape;
  type?: string;
  fossilGroup?: string;
  description?: string;
  museum?: Museum;
  highResTexture?: null | string;
  category?: Category | null;
  realArtworkTitle?: string;
  artist?: string;
  soundType?: string;
  inventoryFilename?: string;
  storageFilename?: string;
  request?: string;
  thoughtBubble?: string;
  song?: string;
  furnitureList?: string;
  furnitureNameList?: string;
  image?: string;
  genuine?: boolean;
  buy?: number | null;
  sell?: number | null;
  color1?: Color;
  color2?: Color;
  source?: string[];
  hhaConcept1?: HhaConcept1;
  hhaConcept2?: HhaConcept1 | null;
  hhaSeries?: null;
  hhaSet?: null;
  filename?: string;
  internalId?: number | string;
  uniqueEntryId?: string;
  num?: number;
  iconImage?: null | string;
  critterpediaImage?: string;
  furnitureImage?: string;
  whereHow?: string;
  weather?: Weather;
  totalCatchesToUnlock?: number;
  spawnRates?: string;
  catchPhrase?: string;
  iconFilename?: null | string;
  critterpediaFilename?: string;
  furnitureFilename?: string;
  colors?: Color[];
  specialSell?: number;
  activeMonths?: ActiveMonths;
  shadow?: Shadow;
  catchDifficulty?: CatchDifficulty;
  vision?: Vision;
  movementSpeed?: MovementSpeed;
  imageSh?: null | string;
  recipesToUnlock?: number;
  craftedItemInternalId?: number;
  cardColor?: null | string;
  diyIconFilename?: string;
  diyIconFilenameSh?: null | string;
  serialId?: number;
  materials?: {[key: string]: number};
  achievementDescription?: string;
  achievementCriteria?: string;
  internalName?: string;
  internalCategory?: string;
  sequential?: boolean;
  tiers?: Tier[];
  photoImage?: null | string;
  houseImage?: null | string;
  species?: string;
  personality?: Personality;
  subtype?: Subtype;
  hobby?: Hobby;
  birthday?: string;
  catchphrase?: string;
  favoriteSong?: string;
  favoriteSaying?: string;
  defaultClothing?: number;
  defaultUmbrella?: string;
  wallpaper?: string;
  flooring?: string;
  diyWorkbench?: string;
  kitchenEquipment?: number | string;
  nameColor?: null | string;
  bubbleColor?: null | string;
  styles?: Style[];
  genderAsia?: Gender;
  npcId?: string;
  photoFilename?: null | string;
  backColor?: null | string;
  bodyColor?: string;
  headColor?: string;
  footColor?: string;
  penColor1?: string;
  penColor2?: string;
  penColor3?: string;
  penColor4?: string;
  startDate?: null | string;
  endDate?: null | string;
  nhStartDate?: null | string;
  nhEndDate?: null | string;
  shStartDate?: null | string;
  shEndDate?: null | string;
  version?: string;
  versionLastUpdated?: Version;
  year?: YearEnum | number | null;
  datesNorthernHemisphere?: null | string;
  datesSouthernHemisphere?: null | string;
  displayName?: string;
  eventNotes?: null | string;
  internalLabel?: null | string;
  unlockDate?: number;
  unlockMethod?: boolean | UnlockMethodEnum;
}

export interface ActiveMonths {
  northern: Thern[];
  southern: Thern[];
}

export interface Thern {
  month: number;
  isAllDay: boolean;
  activeHours: Array<string[]>;
  season: Season;
}

export enum Season {
  Autumn = 'autumn',
  Spring = 'spring',
  Summer = 'summer',
  Winter = 'winter',
}

export enum Catalog {
  ForSale = 'For sale',
  NotForSale = 'Not for sale',
  NotInCatalog = 'Not in catalog',
  Seasonal = 'Seasonal',
}

export enum CatchDifficulty {
  Easy = 'Easy',
  Hard = 'Hard',
  Medium = 'Medium',
  VeryEasy = 'Very Easy',
  VeryHard = 'Very Hard',
}

export enum Category {
  Bridge = 'Bridge',
  CeilingDecor = 'Ceiling Decor',
  Door = 'Door',
  Equipment = 'Equipment',
  Floors = 'Floors',
  Housewares = 'Housewares',
  Incline = 'Incline',
  Mailbox = 'Mailbox',
  Miscellaneous = 'Miscellaneous',
  Other = 'Other',
  Roofing = 'Roofing',
  Rugs = 'Rugs',
  Savory = 'Savory',
  Siding = 'Siding',
  Sweet = 'Sweet',
  Tools = 'Tools',
  WallMounted = 'Wall-mounted',
  Wallpaper = 'Wallpaper',
}

export enum CeilingType {
  Cloth = 'Cloth',
  Gold = 'Gold',
  Plain = 'Plain',
  Stone = 'Stone',
  Tile = 'Tile',
  Wood = 'Wood',
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

export enum CurtainType {
  Curtains = 'Curtains',
  RollerShades = 'Roller Shades',
  SlattedBlinds = 'Slatted Blinds',
}

export enum ExchangeCurrency {
  Bells = 'Bells',
  HeartCrystals = 'Heart Crystals',
  NookMiles = 'Nook Miles',
  NookPoints = 'Nook Points',
  Poki = 'Poki',
}

export enum Gender {
  Female = 'Female',
  Free = 'Free',
  Male = 'Male',
  Manly = 'Manly',
  Womanly = 'Womanly',
}

export enum HhaCategory {
  AC = 'AC',
  Appliance = 'Appliance',
  Audio = 'Audio',
  Clock = 'Clock',
  Doll = 'Doll',
  Dresser = 'Dresser',
  Food = 'Food',
  Kitchen = 'Kitchen',
  Lighting = 'Lighting',
  MusicalInstrument = 'MusicalInstrument',
  Pet = 'Pet',
  Plant = 'Plant',
  SmallGoods = 'SmallGoods',
  Trash = 'Trash',
  Tv = 'TV',
}

export enum HhaConcept1 {
  AmusementPark = 'amusement park',
  Ancient = 'ancient',
  ApparelShop = 'apparel shop',
  Arcade = 'arcade',
  Bathroom = 'bathroom',
  Café = 'café',
  ChildSRoom = "child's room",
  CityLife = 'city life',
  Concert = 'concert',
  ConstructionSite = 'construction site',
  Den = 'den',
  European = 'European',
  Expensive = 'expensive',
  Facility = 'facility',
  Fancy = 'fancy',
  Fantasy = 'fantasy',
  Fitness = 'fitness',
  FreezingCold = 'freezing cold',
  Garden = 'garden',
  Harmonious = 'harmonious',
  Heritage = 'heritage',
  Horror = 'horror',
  Hospital = 'hospital',
  Kitchen = 'kitchen',
  Lab = 'lab',
  LivingRoom = 'living room',
  Local = 'local',
  Music = 'music',
  Nature = 'nature',
  Ocean = 'ocean',
  Office = 'office',
  Outdoors = 'outdoors',
  Park = 'park',
  Party = 'party',
  PublicBath = 'public bath',
  Resort = 'resort',
  Restaurant = 'restaurant',
  Retro = 'retro',
  School = 'school',
  SciFi = 'sci-fi',
  Shop = 'shop',
  Space = 'space',
  Sports = 'sports',
  Stylish = 'stylish',
  Supermarket = 'supermarket',
  Workshop = 'workshop',
}

export enum Hobby {
  Education = 'Education',
  Fashion = 'Fashion',
  Fitness = 'Fitness',
  Music = 'Music',
  Nature = 'Nature',
  Play = 'Play',
}

export enum InteractEnum {
  Bed = 'Bed',
  Chair = 'Chair',
  Kitchenware = 'Kitchenware',
  Mirror = 'Mirror',
  MusicPlayer = 'Music Player',
  MusicalInstrument = 'Musical Instrument',
  Storage = 'Storage',
  Toilet = 'Toilet',
  Trash = 'Trash',
  Tv = 'TV',
  Wardrobe = 'Wardrobe',
  Workbench = 'Workbench',
}

export enum KitType {
  Normal = 'Normal',
  Pumpkin = 'Pumpkin',
  RainbowFeather = 'Rainbow feather',
}

export enum LightingType {
  Candle = 'Candle',
  Emission = 'Emission',
  Fluorescent = 'Fluorescent',
  Monitor = 'Monitor',
  Shade = 'Shade',
  Spotlight = 'Spotlight',
}

export enum SeasonalAvailability {
  AllYear = 'All Year',
  Autumn = 'Autumn',
  Fall = 'Fall',
  Spring = 'Spring',
  Summer = 'Summer',
  SummerWinter = 'Summer; Winter',
  Winter = 'Winter',
}

export enum MovementSpeed {
  Fast = 'Fast',
  Medium = 'Medium',
  Slow = 'Slow',
  Stationary = 'Stationary',
  VeryFast = 'Very fast',
  VerySlow = 'Very slow',
}

export enum Museum {
  Room1 = 'Room 1',
  Room2 = 'Room 2',
  Room3 = 'Room 3',
}

export enum PaneType {
  Glass = 'Glass',
  Screen = 'Screen',
}

export enum Personality {
  BigSister = 'Big Sister',
  Cranky = 'Cranky',
  Jock = 'Jock',
  Lazy = 'Lazy',
  Normal = 'Normal',
  Peppy = 'Peppy',
  Smug = 'Smug',
  Snooty = 'Snooty',
}

export enum PrimaryShape {
  ALine = 'A-line',
  ALong = 'A-long',
  BLong = 'B-long',
  Balloon = 'Balloon',
  Balloonemm = 'Balloonemm',
  Box = 'Box',
  Dress = 'Dress',
  Kimono = 'Kimono',
  Marinesuit = 'Marinesuit',
  Overall = 'Overall',
  Rib = 'Rib',
  Robe = 'Robe',
  Salopette = 'Salopette',
  Salopetteemm = 'Salopetteemm',
}

export enum SecondaryShape {
  H = 'H',
  L = 'L',
  N = 'N',
}

export enum Shadow {
  Large = 'Large',
  Long = 'Long',
  Medium = 'Medium',
  Small = 'Small',
  XLarge = 'X-Large',
  XLargeWFin = 'X-Large w/Fin',
  XSmall = 'X-Small',
  XXLarge = 'XX-Large',
}

export enum Size {
  The05X05 = '0.5x0.5',
  The05X1 = '0.5x1',
  The15X15 = '1.5x1.5',
  The1X05 = '1x0.5',
  The1X1 = '1x1',
  The1X15 = '1x1.5',
  The1X2 = '1x2',
  The2X05 = '2x0.5',
  The2X1 = '2x1',
  The2X15 = '2x1.5',
  The2X2 = '2x2',
  The3X1 = '3x1',
  The3X2 = '3x2',
  The3X3 = '3x3',
  The4X3 = '4x3',
  The4X4 = '4x4',
  The5X5 = '5x5',
}

export enum SourceSheet {
  Accessories = 'Accessories',
  Achievements = 'Achievements',
  Artwork = 'Artwork',
  Bags = 'Bags',
  Bottoms = 'Bottoms',
  CeilingDecor = 'Ceiling Decor',
  ClothingOther = 'Clothing Other',
  Construction = 'Construction',
  DressUp = 'Dress-Up',
  Fencing = 'Fencing',
  Fish = 'Fish',
  Floors = 'Floors',
  Fossils = 'Fossils',
  Gyroids = 'Gyroids',
  Headwear = 'Headwear',
  Housewares = 'Housewares',
  Insects = 'Insects',
  InteriorStructures = 'Interior Structures',
  MessageCards = 'Message Cards',
  Miscellaneous = 'Miscellaneous',
  Music = 'Music',
  Other = 'Other',
  ParadisePlanning = 'Paradise Planning',
  Photos = 'Photos',
  Posters = 'Posters',
  Reactions = 'Reactions',
  Recipes = 'Recipes',
  Rugs = 'Rugs',
  SeaCreatures = 'Sea Creatures',
  SeasonsAndEvents = 'Seasons and Events',
  Shoes = 'Shoes',
  Socks = 'Socks',
  SpecialNPCS = 'Special NPCs',
  ToolsGoods = 'Tools/Goods',
  Tops = 'Tops',
  Umbrellas = 'Umbrellas',
  Villagers = 'Villagers',
  WallMounted = 'Wall-mounted',
  Wallpaper = 'Wallpaper',
}

export enum Style {
  Active = 'Active',
  Cool = 'Cool',
  Cute = 'Cute',
  Elegant = 'Elegant',
  Gorgeous = 'Gorgeous',
  Simple = 'Simple',
}

export enum Subtype {
  A = 'A',
  B = 'B',
}

export interface Tier {
  qty: number;
  reward: number;
  modifier: string;
  Noun: string;
}

export enum UnlockMethodEnum {
  BCATA = 'BCAT (a)',
  BCATB = 'BCAT (b)',
  BCATC = 'BCAT (c)',
  NTP = 'NTP',
}

export interface Variant {
  image?: string;
  filename?: string;
  uniqueEntryId: string;
  colors: Color[];
  source?: Source[];
  internalId?: number;
  buy?: number;
  sell?: number | null;
  themes: HhaConcept1[];
  variation?: number | null | string;
  variantId?: VariantID | null;
  bodyCustomize?: boolean;
  bodyTitle?: BodyTitle | null;
  pattern?: null | string;
  closetImage?: null | string;
  storageImage?: null | string;
  labelThemes?: LabelTheme[];
  framedImage?: null | string;
  albumImage?: null | string;
  genuine?: boolean;
  inventoryImage?: null | string;
}

export enum BodyTitle {
  Art = 'Art',
  BallType = 'Ball type',
  Bamboo = 'Bamboo',
  BaseColor = 'Base color',
  Beans = 'Beans',
  BeverageColor = 'Beverage color',
  BladeColor = 'Blade color',
  BlockColor = 'Block color',
  BoardMarkings = 'Board markings',
  BodyColor = 'Body color',
  BottleColor = 'Bottle color',
  BoxColor = 'Box color',
  BrickColor = 'Brick color',
  BucketColor = 'Bucket color',
  BuntingColor = 'Bunting color',
  BurnerColor = 'Burner color',
  Can = 'Can',
  CandleColor = 'Candle color',
  ChairColor = 'Chair color',
  ChinaColor = 'China color',
  Color = 'Color',
  Condition = 'Condition',
  ConfettiColor = 'Confetti color',
  ContentColor = 'Content color',
  Contents = 'Contents',
  CordColor = 'Cord color',
  CoverDesign = 'Cover design',
  Creation = 'Creation',
  CupColor = 'Cup color',
  CurtainRod = 'Curtain rod',
  Decorations = 'Decorations',
  Design = 'Design',
  Fabric = 'Fabric',
  FlameColor = 'Flame color',
  Flavor = 'Flavor',
  Flavors = 'Flavors',
  FlowerColor = 'Flower color',
  Flowers = 'Flowers',
  Food = 'Food',
  Frame = 'Frame',
  FrameColor = 'Frame color',
  FruitColor = 'Fruit color',
  Genre = 'Genre',
  Hairstyle = 'Hairstyle',
  Hanger = 'Hanger',
  HangerColor = 'Hanger color',
  HayCondition = 'Hay condition',
  HolderColor = 'Holder color',
  Illumination = 'Illumination',
  JoyCon = 'Joy-Con',
  KimonoPattern = 'Kimono pattern',
  KnitCapColor = 'Knit-cap color',
  LabelColor = 'Label color',
  Leaves = 'Leaves',
  LidSeatColor = 'Lid & seat color',
  LightColor = 'Light color',
  Logo = 'Logo',
  LumberType = 'Lumber type',
  MakeupColor = 'Makeup color',
  MapCenter = 'Map center',
  MatColor = 'Mat color',
  MetalColor = 'Metal color',
  MushroomType = 'Mushroom type',
  Name = 'Name',
  Navigation = 'Navigation',
  NutColor = 'Nut color',
  PaintColor = 'Paint color',
  PaintColors = 'Paint colors',
  Pattern = 'Pattern',
  PlanterColor = 'Planter color',
  Plants = 'Plants',
  PlateColor = 'Plate color',
  PoleColor = 'Pole color',
  Poles = 'Poles',
  PumpkinColor = 'Pumpkin color',
  RaceCarColors = 'Race-car colors',
  RoofColor = 'Roof color',
  RoofTileColor = 'Roof-tile color',
  Scent = 'Scent',
  ScreenDesign = 'Screen design',
  Season = 'Season',
  SeatColor = 'Seat color',
  ShadeColor = 'Shade color',
  ShakerColor = 'Shaker color',
  ShellColor = 'Shell color',
  Sign = 'Sign',
  SignDesign = 'Sign design',
  StandColor = 'Stand color',
  Stone = 'Stone',
  Style = 'Style',
  SurfaceColor = 'Surface color',
  TableColor = 'Table color',
  Tableware = 'Tableware',
  TapeType = 'Tape type',
  Theme = 'Theme',
  TopCloth = 'Top cloth',
  TracingTableColor = 'Tracing-table color',
  Tray = 'Tray',
  TrayColor = 'Tray color',
  Variation = 'Variation',
  WagonColor = 'Wagon color',
  WreathColor = 'Wreath color',
}

export enum LabelTheme {
  Comfy = 'comfy',
  Everyday = 'everyday',
  FairyTale = 'fairy tale',
  Formal = 'formal',
  Goth = 'goth',
  Outdoorsy = 'outdoorsy',
  Party = 'party',
  Sporty = 'sporty',
  Theatrical = 'theatrical',
  Vacation = 'vacation',
  Work = 'work',
}

export enum Source {
  AbleSisters = 'Able Sisters',
  AllVillagers = 'All villagers',
  AppleTree = 'Apple Tree',
  AssessingFossils = 'Assessing fossils',
  Beach = 'Beach',
  Birthday = 'Birthday',
  Blathers = 'Blathers',
  Breeding = 'Breeding',
  Brewster = 'Brewster',
  BuryingBellsInAGlowingSpot = 'Burying bells in a glowing spot',
  CJ = 'C.J.',
  CatchingWithANet = 'Catching with a net',
  CedarTree = 'Cedar Tree',
  CheckToyDayStockingsTheDayAfterToyDay = 'Check Toy Day stockings the day after Toy Day',
  CherryTree = 'Cherry Tree',
  ChoppingABambooTree = 'Chopping a bamboo tree',
  ChoppingATree = 'Chopping a tree',
  ClamDigSpot = 'Clam dig spot',
  CoconutTree = 'Coconut Tree',
  Cooking = 'Cooking',
  Crafting = 'Crafting',
  Cyrus = 'Cyrus',
  DaisyMae = 'Daisy Mae',
  DeliveringItemForAVillager = 'Delivering item for a villager',
  DigSpot = 'Dig Spot',
  DiggingUpACarrotPlant = 'Digging up a carrot plant',
  DiggingUpAFullyGrownBush = 'Digging up a fully grown bush',
  DiggingUpAPotatoPlant = 'Digging up a potato plant',
  DiggingUpAPumpkinPlant = 'Digging up a pumpkin plant',
  DiggingUpASugarcanePlant = 'Digging up a sugarcane plant',
  DiggingUpATomatoPlant = 'Digging up a tomato plant',
  DiggingUpAWheatPlant = 'Digging up a wheat plant',
  DiveSpot = 'Dive spot',
  DodoAirlines = 'Dodo Airlines',
  DonTReturnLostItem = "Don't return lost item",
  DonTReturnTreasureQuestItem = "Don't return treasure quest item",
  DonatingAllArt = 'Donating all art',
  DonatingAllBugs = 'Donating all bugs',
  DonatingAllFish = 'Donating all fish',
  DonatingAllFossils = 'Donating all fossils',
  DonatingAllSeaCreatures = 'Donating all sea creatures',
  EggBalloon = 'Egg balloon',
  ExpiredTurnips = 'Expired turnips',
  Fishing = 'Fishing',
  Flick = 'Flick',
  Franklin = 'Franklin',
  GlowingDigSpot = 'Glowing dig spot',
  GroupStretching = 'Group Stretching',
  Gullivarrr = 'Gullivarrr',
  Gulliver = 'Gulliver',
  HHPApparelShop = 'HHP Apparel Shop',
  HHPCafé = 'HHP Café',
  HHPOffice = 'HHP Office',
  HardwoodTree = 'Hardwood Tree',
  Hha = 'HHA',
  HighFriendship = 'High Friendship',
  HittingARock = 'Hitting a rock',
  Isabelle = 'Isabelle',
  Jack = 'Jack',
  Jingle = 'Jingle',
  JollyReddSTreasureTrawler = "Jolly Redd's Treasure Trawler",
  KKConcert = 'K.K. concert',
  KappN = "Kapp'n",
  KappNIslands = "Kapp'n islands",
  KatrinaSCleansingService = "Katrina's Cleansing Service",
  Kicks = 'Kicks',
  KicksCoOp = "Kicks' Co-op",
  Label = 'Label',
  Leif = 'Leif',
  Lottie = 'Lottie',
  Luna = 'Luna',
  MOM = 'Mom',
  Mail = 'Mail',
  MayDayTour = 'May Day Tour',
  Niko = 'Niko',
  Nintendo = 'Nintendo',
  NookLink = 'NookLink',
  NookMilesRedemption = 'Nook Miles Redemption',
  NookSCranny = "Nook's Cranny",
  NookShopping = 'Nook Shopping',
  NookShoppingDailySelection = 'Nook Shopping Daily Selection',
  NookShoppingPosters = 'Nook Shopping Posters',
  NookShoppingPromotion = 'Nook Shopping Promotion',
  NookShoppingSeasonal = 'Nook Shopping Seasonal',
  NotAvailable = 'NotAvailable',
  OnGround = 'On ground',
  OrangeTree = 'Orange Tree',
  Pascal = 'Pascal',
  Pavé = 'Pavé',
  PeachTree = 'Peach Tree',
  PearTree = 'Pear Tree',
  PickingCarrots = 'Picking carrots',
  PickingFlowers = 'Picking flowers',
  PickingPotatoes = 'Picking potatoes',
  PickingPumpkins = 'Picking pumpkins',
  PickingSugarcane = 'Picking sugarcane',
  PickingTomatoes = 'Picking tomatoes',
  PickingWheat = 'Picking wheat',
  PlantingABambooShoot = 'Planting a bamboo shoot',
  PlantingACedarSapling = 'Planting a cedar sapling',
  PlantingACherry = 'Planting a cherry',
  PlantingACoconut = 'Planting a coconut',
  PlantingAPeach = 'Planting a peach',
  PlantingAPear = 'Planting a pear',
  PlantingASapling = 'Planting a sapling',
  PlantingAnApple = 'Planting an apple',
  PlantingAnOrange = 'Planting an orange',
  RecycleBox = 'Recycle box',
  ReddSCoOpRaffle = "Redd's Co-op Raffle",
  ReddSRaffle = "Redd's Raffle",
  Reese = 'Reese',
  Rover = 'Rover',
  Saharah = 'Saharah',
  SaharahSCoOp = "Saharah's Co-op",
  SeedBag = 'Seed bag',
  ShakingAHardwoodOrCedarTree = 'Shaking a hardwood or cedar tree',
  Snowboy = 'Snowboy',
  StartingItems = 'Starting items',
  The5StarTownStatus = '5-star town status',
  TomNook = 'Tom Nook',
  UseAFountainFirework = 'Use a fountain firework',
  Wardell = 'Wardell',
  Wilbur = 'Wilbur',
  WishingOnShootingStars = 'Wishing on shooting stars',
  WrappingAPresent = 'Wrapping a present',
  Zipper = 'Zipper',
}

export enum VariantID {
  The0_0 = '0_0',
  The0_1 = '0_1',
  The0_2 = '0_2',
  The0_3 = '0_3',
  The0_4 = '0_4',
  The0_5 = '0_5',
  The0_6 = '0_6',
  The0_7 = '0_7',
  The1_0 = '1_0',
  The1_1 = '1_1',
  The1_2 = '1_2',
  The1_3 = '1_3',
  The1_4 = '1_4',
  The1_5 = '1_5',
  The1_6 = '1_6',
  The1_7 = '1_7',
  The2_0 = '2_0',
  The2_1 = '2_1',
  The2_2 = '2_2',
  The2_3 = '2_3',
  The2_4 = '2_4',
  The2_5 = '2_5',
  The2_6 = '2_6',
  The2_7 = '2_7',
  The3_0 = '3_0',
  The3_1 = '3_1',
  The3_2 = '3_2',
  The3_3 = '3_3',
  The3_4 = '3_4',
  The3_5 = '3_5',
  The3_6 = '3_6',
  The3_7 = '3_7',
  The4_0 = '4_0',
  The4_1 = '4_1',
  The4_2 = '4_2',
  The4_3 = '4_3',
  The4_4 = '4_4',
  The4_5 = '4_5',
  The4_6 = '4_6',
  The4_7 = '4_7',
  The5_0 = '5_0',
  The5_1 = '5_1',
  The5_2 = '5_2',
  The5_3 = '5_3',
  The5_4 = '5_4',
  The5_5 = '5_5',
  The5_6 = '5_6',
  The5_7 = '5_7',
  The6_0 = '6_0',
  The6_1 = '6_1',
  The6_2 = '6_2',
  The6_3 = '6_3',
  The6_4 = '6_4',
  The6_5 = '6_5',
  The6_6 = '6_6',
  The6_7 = '6_7',
  The7_0 = '7_0',
  The7_1 = '7_1',
  The7_2 = '7_2',
  The7_3 = '7_3',
  The7_4 = '7_4',
  The7_5 = '7_5',
  The7_6 = '7_6',
  The7_7 = '7_7',
}

export enum Version {
  The100 = '1.0.0',
  The110 = '1.1.0',
  The1100 = '1.10.0',
  The1110 = '1.11.0',
  The120 = '1.2.0',
  The130 = '1.3.0',
  The140 = '1.4.0',
  The150 = '1.5.0',
  The160 = '1.6.0',
  The170 = '1.7.0',
  The180 = '1.8.0',
  The190 = '1.9.0',
  The200 = '2.0.0',
  The204 = '2.0.4',
}

export enum VfxType {
  LightOff = 'LightOff',
  Random = 'Random',
  Synchro = 'Synchro',
}

export enum Vision {
  Medium = 'Medium',
  Narrow = 'Narrow',
  VeryNarrow = 'Very Narrow',
  VeryWide = 'Very Wide',
  Wide = 'Wide',
}

export enum Weather {
  AnyExceptRain = 'Any except rain',
  AnyWeather = 'Any weather',
  RainOnly = 'Rain only',
}

export enum WindowColor {
  BlackMetal = 'Black Metal',
  DarkWood = 'Dark Wood',
  GreyMetal = 'Grey Metal',
  GreyWood = 'Grey Wood',
  LightWood = 'Light Wood',
  NaturalWood = 'Natural Wood',
  WhiteMetal = 'White Metal',
  WhiteWood = 'White Wood',
  Wood = 'Wood',
}

export enum WindowType {
  Arch = 'Arch',
  Circle = 'Circle',
  FourPane = 'Four Pane',
  SinglePane = 'Single Pane',
  SlidingPane = 'Sliding Pane',
}

export enum YearEnum {
  Any = 'Any',
}
