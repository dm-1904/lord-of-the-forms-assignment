import { PhoneInputState } from "./FunctionalApp/FunctionalForm";
import { UserInformation } from "./types";

export const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | PhoneInputState;
}) => {
  return (
    <div>
      <span style={{ marginRight: 5 }}>
        <b>{label}:</b>
      </span>
      <span>{value}</span>
    </div>
  );
};
export const ProfileInformation = ({
  userData,
}: // isSubmitted,
// isSubmitted,
// stateSetters,
// setIsSubmitted,
{
  userData: UserInformation;
  // isSubmitted: boolean;
  // stateSetters: StateTypes;
  // setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // {
  //   console.log(userData);
  // }

  // const reset = () => {
  //   stateSetters.setFirstNameInput("");
  //   stateSetters.setLastNameInput("");
  //   stateSetters.setEmailInput("");
  //   stateSetters.setCityInput("");
  //   stateSetters.setPhoneInputState(["", "", "", ""]);
  // };

  // const isObjectValid = (userData: UserInformation): boolean => {
  //   for (const value of Object.values(userData)) {
  //     if (typeof value === "string" && value.trim() === "") {
  //       return false;
  //     }
  //     if (Array.isArray(value)) {
  //       if (
  //         value.some((item) => typeof item !== "string" || item.trim() === "")
  //       ) {
  //         return false;
  //       }
  //     }
  //   }
  //   return true;
  // };

  if (userData === null) {
    // {
    //   console.log("yes");
    // }
    return (
      <>
        <u>
          <h3>Your Submitted User Information</h3>
        </u>
        <div className="user-info">
          <div>No information provided</div>
        </div>
      </>
    );
  }

  // console.log(isObjectValid(userData));

  if (userData.city) {
    const { email, firstName, lastName, city } = userData;
    const phone = userData.phone.join("-");
    console.log(userData);
    console.log(Object.values(userData));
    console.log(phone);
    return (
      <>
        <u>
          <h3>Your Submitted User Information</h3>
        </u>
        <div className="user-info">
          <InfoRow
            label="Email"
            value={email}
          />
          <InfoRow
            label="First Name"
            value={firstName}
          />
          <InfoRow
            label="Last Name"
            value={lastName}
          />
          <InfoRow
            label="City"
            value={city}
          />
          <InfoRow
            label="Phone"
            value={phone}
          />
        </div>
      </>
    );
  }
};
