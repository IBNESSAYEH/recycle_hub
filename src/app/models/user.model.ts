export interface User {
  id?: number;
  email: string;
  password: string;
  role: string;
}


export interface AuthRes{
    id?: number;
    username: string;
    email: string;
    token: string;
    refreshToken: string
}
export interface AuthUser{
    id?: number;
    username: string;
    email: string;
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  birthDate: string;
  password: string;
  point?: number;
  confirmPassword: string;
  role: 'USER' | 'PARTICULIER';
}

