export interface Card {
    id: number;
    cardId: number;
    cardName: string;
    cardClass: string;
    attackNumber: number;
    defenceNumber: number;
    inDeck: boolean;
    imageURL: string;
    qty: number;
    collectionID: string;
  }