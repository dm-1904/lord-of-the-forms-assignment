import { useRef, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { isEmailValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { TextInput } from "./FunctionalComponents/TextInput";
import { PhoneInput } from "./FunctionalComponents/PhoneInput";
import { formatPhoneNumber } from "../utils/transformations";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";
export type PhoneInputState = ["", "", "", ""];

export const FunctionalForm = () => {
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFirstNameInputValid: boolean = firstNameInput.length > 2;
  const isLastNameInputValid: boolean = lastNameInput.length > 2;
  const isEmailInputValid: boolean = isEmailValid(emailInput);
  const isCityInputValid: boolean = allCities.includes(cityInput);

  const showFirstNameError = isSubmitted && !isFirstNameInputValid;
  const showLastNameError = isSubmitted && !isLastNameInputValid;
  const showEmailInputError = isSubmitted && !isEmailInputValid;
  const showCityInputError = isSubmitted && !isCityInputValid;
  const showPhoneInputError =
    isSubmitted && !formatPhoneNumber(phoneInputState.join(""));

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
        setIsSubmitted(true);
        const isFormValid =
          isFirstNameInputValid &&
          isLastNameInputValid &&
          isEmailInputValid &&
          isCityInputValid &&
          formatPhoneNumber(phoneInputState.join(""));

        if (isFormValid) {
          reset();
          setIsSubmitted(false);
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
      <TextInput
        inputProps={{
          onChange: (e) => {
            setCityInput(e.target.value);
          },
          value: cityInput,
          placeholder: "Hobbiton",
          ref: nameRef,
        }}
        labelText="City"
      />
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
