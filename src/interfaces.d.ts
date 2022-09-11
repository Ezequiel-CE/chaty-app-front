export interface UserLoginAttribute {
  mail: string;
  password: string;
}

export interface UserRegisterAttribute {
  mail: string;
  password: string;
  username: string;
}

export interface UserAttributes {
  id: number;
  mail: string;
  username: string;
}
