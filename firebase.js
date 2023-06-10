import "dotenv/config";
import { initializeApp, applicationDefault  } from "firebase-admin/app";
import { getAuth, signInWithPhoneNumber  } from "firebase-admin/auth"

initializeApp({
    credential: applicationDefault(),
})

const auth = getAuth();

export { auth, signInWithPhoneNumber  }