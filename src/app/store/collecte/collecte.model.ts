export interface CollecteModel {
  id: string;
  wasteType: 'PLASTIC' | 'GLASS' | 'PAPER' | 'METAL';
  photos?: any[];
  estimatedWeight: number;
  collectionAddress: string;
  preferredDate: string;
  preferredTimeSlot: string;
  additionalNotes?: string;
  status?: 'pending' | 'accepted' | 'completed' | 'cancelled';
  userId?: number;
}

export interface CollecteState {
  collectes: CollecteModel[];
  selectedCollecte: CollecteModel | null;
  loading: boolean;
  error: string | null;
  showForm: boolean;
}
