/**
 * User model base type
 *
 * @interface IUser
 */
export interface IUser {
  // eslint-disable-next-line
  id?: any;
  firstName?: string;
  lastName?: string;
  password?: string;
  email: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
