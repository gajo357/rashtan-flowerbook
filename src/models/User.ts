export enum RoleDto {
  Owner = 1,
  Technician = 2,
  Admin = 3
}

export interface UserModel {
  userId: string;
  name: string | null;
  email: string | null;
  emailVerified: boolean;
  role: RoleDto;
  getIdToken(forceRefresh?: boolean): Promise<string | undefined>;
  sendEmailVerification(code: string | null): Promise<void>;
}

export interface RegisterDataDto {
  name: string;
  email: string;
  password: string;
}
