import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../lib/firebase";
import { HTTP_METHODS } from "./constant";
import { request } from "./index";



class Auth {
  static async login(email, password) {
    const emailTrimed = email.trim();
    const passwordTrimed = password.trim();
    const user = await signInWithEmailAndPassword(
      auth,
      emailTrimed,
      passwordTrimed
    );

    return user;
  }

  static async logout() {
    await signOut(auth);
  }


  static registerUser(option) {


    const config = {
      method: HTTP_METHODS.post,
      url: `/user`,
      body: option.body,
      token: option.token,
    };
    console.log(config)
    
    return request(config).catch((err) => ({ ...err, isOk: false }));

  }
  static registerPharmacy(option) {


    const config = {
      method: HTTP_METHODS.post,
      url: `/pharmacy`,
      body: option.body,
      token: option.token,
    };
    console.log(config)
    
    return request(config).catch((err) => ({ ...err, isOk: false }));

  }
  static getUserProfile(option){
    const config = {
      method: HTTP_METHODS.get,
      url: `/user`,
      body: option.body,
      token: option.token,
    };
    console.log(config)
    
    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static checkUserEmail(option){
    const config = {
      method: HTTP_METHODS.post,
      url: `/register/email`,
      body: option.body,
      token: option.token,
    };
    console.log(config)
    
    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static updateUserProfile(option){
    const config = {
      method: HTTP_METHODS.put,
      url: `/user`,
      body: option.body,
      token: option.token,
    };
    console.log(config)
    
    return request(config).catch((err) => ({ ...err, isOk: false }));
  }

}

export default Auth;
