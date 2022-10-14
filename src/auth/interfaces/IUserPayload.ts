export default interface IUserPayload {
  email: string;
  id: number;
  profiles: Profile[];
}

interface Profile {
  id: number;
  name: string;
  permissions: Permission[];
}

interface Permission {
  id: number;
  name: string;
}
