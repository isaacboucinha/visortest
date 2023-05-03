/**
 * Auth model base type
 *
 * @interface IAuth
 */
export interface IAuth {
  accessToken: string;
  refreshToken?: string;
}
