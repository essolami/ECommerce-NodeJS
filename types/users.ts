export interface IUser {
  id?: string;
  name: string;
  email: string;
  passwordHash: string;
  phone: string;
  isAdmin?: boolean;
  street?: string;
  apartement?: string;
  zip?: string;
  country?: string;
}
