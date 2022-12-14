export interface RequestWithUser extends Request {
  user: RequestUserData;
}

export interface RequestUserData {
  userId: string;
  userEmail: string;
}

export interface RequestWithLocalUser extends Request {
  user: {
    id: string;
    email: string;
  };
}
