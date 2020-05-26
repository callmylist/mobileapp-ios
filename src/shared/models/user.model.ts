import {Role} from "./role.model";
import {Account} from "./account.model";
import { Customize } from "./customize.model";

export class User {
  
  id: string;
  accountCode: string;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  password: string;
  parentId: string;
  gmailId:string;
  role: Role;
  customize: Customize;
  account: Account;
  
  constructor() {
    this.role = new Role();
    this.account = new Account();
    this.customize = new Customize();
  }
}