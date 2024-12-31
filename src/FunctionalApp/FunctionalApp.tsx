import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";
import { useState } from "react";
import { PhoneInputState } from "./FunctionalForm";
import { UserInformation } from "../types";

export interface StateTypes {
  setFirstNameInput: React.Dispatch<React.SetStateAction<string>>;
  setLastNameInput: React.Dispatch<React.SetStateAction<string>>;
  setEmailInput: React.Dispatch<React.SetStateAction<string>>;
  setCityInput: React.Dispatch<React.SetStateAction<string>>;
  setPhoneInputState: React.Dispatch<React.SetStateAction<PhoneInputState>>;
}

export const FunctionalApp = () => {
  const [userData, setUserData] = useState<UserInformation>({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: ["", "", "", ""],
  });
  console.log(userData);
  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation
        userData={userData}
        // setUserData={setUserData}
        // setIsSubmitted={setIsSubmitted}
      />
      <FunctionalForm
        userData={userData}
        setUserData={setUserData}
      />
    </>
  );
};
