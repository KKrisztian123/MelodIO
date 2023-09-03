type APIResponse<T> =
  | { status: 'success'; payload: T }
  | { status: 'error'; message: string };

interface UserCredentials {
  email: string;
  password: string;
}
type AuthLevel = 'admin' | 'user';

interface User {
  username: string;
  password: string;
  email: string;
  authLevel: AuthLevel;
  firstName: string;
  lastName: string;
  imageURL: string;
  imageType: string;
  userId: number;
}

interface DBUser {
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
  imageURL: string;
  imageType: string;
  id: number;
}

interface Login {
  session: string;
  userId: number;
  authLevel: AuthLevel;
}

type LoginUserData = Omit<Login, 'session'>;
