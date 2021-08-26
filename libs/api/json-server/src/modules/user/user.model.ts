import { Entity } from '../../crud/entity.model';


export interface User extends Entity {
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  email: string;
  avatar: string;
  jobTitle: string;
}
