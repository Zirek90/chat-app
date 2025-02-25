import { LoginCredentialsInterface } from './login-credentials.interface';

export interface SignUpCredentialsInterface extends LoginCredentialsInterface {
  username: string;
}
