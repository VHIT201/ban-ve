// Core
import { AES, enc } from "crypto-js";
import { PersistStorage } from "zustand/middleware";

// App
import envConfig from "@/configs/env";

// Create storage
export const createStorage = <S>(): PersistStorage<S> => {
  return {
    getItem: (name) => {
      const cipherText = localStorage.getItem(name);
      if (!cipherText) return null;

      const originalText = AES.decrypt(
        cipherText,
        envConfig.NEXT_PUBLIC_STORE_SECRET_KEY
      ).toString(enc.Utf8);
      if (!originalText) return null;

      return JSON.parse(originalText);
    },
    setItem: (name, value) => {
      const cipherText = AES.encrypt(
        JSON.stringify(value),
        envConfig.NEXT_PUBLIC_STORE_SECRET_KEY
      ).toString();
      localStorage.setItem(name, cipherText);
    },
    removeItem: (name) => {
      localStorage.removeItem(name);
    },
  };
};
