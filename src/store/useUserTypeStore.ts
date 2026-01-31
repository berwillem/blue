import { create } from "zustand";

type UserType = "individuals" | "corporates" | null;

interface UserTypeState {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

export const useUserTypeStore = create<UserTypeState>((set) => ({
  userType: null,
  setUserType: (type) => set({ userType: type }),
}));
