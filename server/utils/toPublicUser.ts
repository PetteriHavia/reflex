import { PublicUser, User } from "../types";

export const toPublicUser = (user: User): PublicUser => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    created_at: user.created_at,
  };
};
