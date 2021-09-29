export interface UsersState {
  user: User;
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  children: Record<string, Child>;
};

export type Child = {
  id: string;
  name: string;
  age: string;
  cards: Record<string, Card>;
};

export type Card = {
  id: string;
  type: string;
  number: string;
  securityCode: string;
  expirationDate: string;
  monthlyLimit: string;
};
