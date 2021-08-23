export type UserCredential = {
  email: string;
  password: string;
};

export type UserControllerHandler = (
  userCredential: UserCredential
) => Promise<any>;
