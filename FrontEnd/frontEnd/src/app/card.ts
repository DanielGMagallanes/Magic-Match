export interface Card {
    id: number;
    cardId: number;
    cardName: string;
    cardClass: string;
    attackNumber: number;
    defenseNumber: number;
    inDeck: boolean;
    imageURL: string;
    qty: number;
    collectionID: string;
  }