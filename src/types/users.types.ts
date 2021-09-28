export interface UsersState {
  users: User[];
}

export type User = {
  id: number;
  name: string;
  email: string;
  children: Child[];
};

export type Child = {
  id: number;
  name: string;
  age: number;
  cards: Card[];
};

export type Card = {
  id: number;
  type: string;
  number: number;
  securityCode: number;
  expirationDate: Date;
  monthlyLimit: number;
};
