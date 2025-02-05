export interface CollecteModel {
  id?: number;
  wasteType: 'plastic' | 'glass' | 'paper' | 'metal';
  photos?: string[];
  estimatedWeight: number;
  collectionAddress: string;
  collectionDate: Date;
  timeSlot: string;
  additionalNotes?: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  userId: number;
}

export interface CollecteState {
  collectes: CollecteModel[];
  selectedCollecte: CollecteModel | null;
  loading: boolean;
  error: string | null;
  showForm: boolean;
}
