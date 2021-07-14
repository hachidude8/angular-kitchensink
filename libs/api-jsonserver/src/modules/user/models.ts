import { Entity } from '../../crud/models';


export interface User extends Entity {
  "id": number;
  "firstName": string;
  "lastName": string;
  "gender": string;
  "phoneNumber": string;
  "email": string;
  "avatar": string;
  "jobTitle": string;
}

