import { useRef, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { isEmailValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { TextInput } from "./FunctionalComponents/TextInput";
import { PhoneInput } from "./FunctionalComponents/PhoneInput";
import { formatPhoneNumber } from "../utils/transformations";
import { UserInformation } from "../types";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";
export type PhoneInputState = ["", "", "", ""];

export const FunctionalForm = ({
  userData,
  setUserData,
}: {
  userData: UserInformation;

  setUserData: React.Dispatch<React.SetStateAction<UserInformation>>;
}) => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [phoneInputState, setPhoneInputState] = useState<PhoneInputState>([
    "",
    "",
    "",
    "",
  ]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const isFirstNameInputValid: boolean = userData.firstName.length > 2;
  const isLastNameInputValid: boolean = userData.lastName.length > 2;
  const isEmailInputValid: boolean = isEmailValid(userData.email);
  const isCityInputValid: boolean = allCities.includes(userData.city);

  const showFirstNameError = isSubmitted && !isFirstNameInputValid;
  const showLastNameError = isSubmitted && !isLastNameInputValid;
  const showEmailInputError = isSubmitted && !isEmailInputValid;
  const showCityInputError = isSubmitted && !isCityInputValid;
  const showPhoneInputError =
    isSubmitted && !formatPhoneNumber(userData.phone.join(""));

  const nameRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setCityInput("");
    setPhoneInputState(["", "", "", ""]);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const isFormValid =
          isFirstNameInputValid &&
          isLastNameInputValid &&
          isEmailInputValid &&
          isCityInputValid &&
          formatPhoneNumber(userData.phone.join(""));
        if (isFormValid) {
          setUserData({
            firstName: firstNameInput,
            lastName: lastNameInput,
            email: emailInput,
            city: cityInput,
            phone: phoneInputState,
          });
          setIsSubmitted(true);
          // reset();
        }
      }}
    >
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <TextInput
        inputProps={{
          onChange: (e) => {
            setFirstNameInput(e.target.value);
            setUserData((prev) => ({
              ...prev,
              firstName: firstNameInput,
            }));
          },
          value: firstNameInput,
          placeholder: "Bilbo",
          ref: nameRef,
        }}
        labelText={"First Name"}
      />

      {showFirstNameError && (
        <ErrorMessage
          message={firstNameErrorMessage}
          show={true}
        />
      )}

      {/* last name input */}
      <TextInput
        inputProps={{
          onChange: (e) => {
            setLastNameInput(e.target.value);
            setUserData((prev) => ({
              ...prev,
              lastNameName: lastNameInput,
            }));
          },
          value: lastNameInput,
          placeholder: "Baggins",
          ref: nameRef,
        }}
        labelText="Last Name"
      />

      {showLastNameError && (
        <ErrorMessage
          message={lastNameErrorMessage}
          show={true}
        />
      )}

      {/* Email Input */}
      <TextInput
        inputProps={{
          onChange: (e) => {
            setEmailInput(e.target.value);
            setUserData((prev) => ({
              ...prev,
              email: emailInput,
            }));
          },
          value: emailInput,
          placeholder: "bilbo-baggins@adventurehobbits.net",
          ref: nameRef,
        }}
        labelText="Email"
      />
      {showEmailInputError && (
        <ErrorMessage
          message={emailErrorMessage}
          show={true}
        />
      )}

      {/* City Input */}
      {/* <TextInput
        inputProps={{
          onChange: (e) => {
            setCityInput(e.target.value);
          },
          value: cityInput,
          placeholder: "Hobbiton",
          ref: nameRef,
        }}
        labelText="City"
      /> */}
      <div className="input-wrap">
        <label htmlFor="city">City</label>
        <select
          className="selectedCity"
          value={cityInput}
          onChange={(e) => {
            setCityInput(e.target.value);
            setUserData((prev) => ({
              ...prev,
              city: cityInput,
            }));
          }}
        >
          <option
            value=""
            disabled
            selected
            className="disabled-option"
          >
            Hobbiton
          </option>
          {allCities.map((city, i) => (
            <option
              key={i}
              value={city}
              // onChange={() => {
              //   setEmailInput(city);
              // }}
            >
              {city}
            </option>
          ))}
        </select>
      </div>
      {showCityInputError && (
        <ErrorMessage
          message={cityErrorMessage}
          show={true}
        />
      )}
      <PhoneInput
        phoneInputState={phoneInputState}
        setPhoneInputState={setPhoneInputState}
      />
      {showPhoneInputError && (
        <ErrorMessage
          message={phoneNumberErrorMessage}
          show={true}
        />
      )}

      <input
        type="submit"
        value="Submit"
      />
    </form>
  );
};
