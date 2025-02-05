
export enum WasteType {
  PLASTIC = 'PLASTIC',
  GLASS = 'GLASS',
  PAPER = 'PAPER',
  METAL = 'METAL'
}


export interface CollecteModel {
  wasteType: WasteType;
  photos?: string[];
  estimatedWeight: number;
  collectionAddress: string;
  preferredDate: Date;
  preferredTimeSlot: string;
  additionalNotes?: string;
}

export interface CollecteState {
  collectes: CollecteModel[];
};

