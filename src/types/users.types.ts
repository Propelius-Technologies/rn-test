export interface UsersState {
  user: User;
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
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
