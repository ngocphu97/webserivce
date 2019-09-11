import { AddressModel } from './address.model';

export interface UserModel {
  id: string;
  name: string;
  username: string;
  email: string;
  address: AddressModel;
}
