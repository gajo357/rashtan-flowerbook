import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import config from "./firebaseConfig";
import { RoleDto, UserModel as User } from "../models/User";
import { appUrl } from "./Constants";

firebase.initializeApp(config);

const firebaseAuth = () => firebase.auth();

const signInWithGoogle = () =>
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

const currentUser = () => firebaseAuth().currentUser;

const RoleClaimType = "https://rashtan-flowebook.com/role";
const UserIdClaimType = "https://rashtan-flowebook.com/user";

const extractCustomClaims = async (
  user: firebase.User,
  forceRefresh?: boolean
) => {
  const token = await user.getIdTokenResult(forceRefresh);

  const role: RoleDto = token.claims[RoleClaimType];
  const userId: string = token.claims[UserIdClaimType];
  return { role, userId };
};

const hasIdInToken = async (user: firebase.User) => {
  const { userId } = await extractCustomClaims(user);

  return userId ? true : false;
};

const extractUserInfo: (user: firebase.User) => Promise<User> = async user => {
  // force refresh the token to get the latest user info
  const { role, userId } = await extractCustomClaims(user, true);
  return {
    name: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    userId,
    role,
    sendEmailVerification: (code: string | null) => {
      // we take the current user, because the user object that was passed in might be unavailable
      const u = currentUser();
      if (!u || u === null) return Promise.resolve();

      return u.sendEmailVerification({
        url: code ? `${appUrl}invitation?code=${code}` : `${appUrl}new-lab/`
        // TODO: Add options for opening Continue button in the app
      });
    },
    getIdToken: b => {
      // we take the current user, because the user object that was passed in might be unavailable
      const u = currentUser();
      if (!u || u === null) return Promise.resolve(undefined);
      return u.getIdToken(b);
    }
  };
};

const firestore = firebase.firestore();

export {
  currentUser,
  firebaseAuth,
  firestore,
  extractUserInfo,
  hasIdInToken,
  signInWithGoogle
};
