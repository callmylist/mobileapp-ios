import { Customize } from './customize.model';

export class LoginUser {

  constructor(private id: string,
    private version: string,
    public firstName: string,
    public lastName: string,
    public companyName: string,
    public email: string,
    public phone: string,
    private expiry: string,
    private token: string,
    private googleLogin: boolean,
    private permissions: object,
    private roles: object,
    private telephonicId: string,
    private telephonicCode: string,
    public parentId: string,
    public customize: Customize,
    public messageSubscription: any
  ) {
  }
}
