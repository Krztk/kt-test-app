export interface UserData extends AuthUser {
  token: string;
  expirationDateEpochSeconds: number;
}

export interface AuthUser {
  id: number;
  isTeacher: boolean;
  isOrganizationOwner: boolean;
}

export interface LoginResponseDTO {
  token: string;
}

export enum ROLES {
  Student,
  Teacher,
  OrganizationOwner,
}
