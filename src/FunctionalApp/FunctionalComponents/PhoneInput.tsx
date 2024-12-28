import React, { ChangeEventHandler, useRef, useState } from "react";

interface ChildComponentProps {
  phoneInputState: PhoneInputState;
  setPhoneInputState: React.Dispatch<React.SetStateAction<PhoneInputState>>;
}

export type PhoneInputState = ["", "", "", ""];

export const PhoneInput = ({
  phoneInputState,
  setPhoneInputState,
}: ChildComponentProps) => {
  const ref0 = useRef<HTMLInputElement>(null);
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);

  const refs = [ref0, ref1, ref2, ref3];
  const lengths = [2, 2, 2, 1];

  const createOnChangeHandler =
    (index: 0 | 1 | 2 | 3): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const currentMaxLength = lengths[index];
      const nextRef = refs[index + 1];
      const prevRef = refs[index - 1];
      const rawValue = e.target.value;

      const sanitizedValue = rawValue
        .replace(/[^0-9]/g, "")
        .slice(0, currentMaxLength);

      const newState = phoneInputState.map((phoneInput, phoneInputIndex) =>
        phoneInputIndex === index ? sanitizedValue : phoneInput
      ) as PhoneInputState;

      setPhoneInputState(newState);

      if (sanitizedValue.length === currentMaxLength && nextRef?.current) {
        nextRef.current.focus();
      }

      if (
        rawValue.length < phoneInputState[index].length &&
        prevRef?.current &&
        sanitizedValue.length === 0
      ) {
        prevRef.current.focus();
      }
    };

  return (
    <div className="input-wrap">
      <label htmlFor="phone">Phone:</label>
      <div id="phone-input-wrap">
        <input
          type="text"
          id="phone-input-1"
          placeholder="55"
          value={phoneInputState[0]}
          maxLength={2}
          ref={ref0}
          onChange={createOnChangeHandler(0)}
        />
        -
        <input
          type="text"
          id="phone-input-2"
          placeholder="55"
          value={phoneInputState[1]}
          maxLength={2}
          ref={ref1}
          onChange={createOnChangeHandler(1)}
        />
        -
        <input
          type="text"
          id="phone-input-3"
          placeholder="55"
          value={phoneInputState[2]}
          maxLength={2}
          ref={ref2}
          onChange={createOnChangeHandler(2)}
        />
        -
        <input
          type="text"
          id="phone-input-4"
          placeholder="5"
          value={phoneInputState[3]}
          maxLength={1}
          ref={ref3}
          onChange={createOnChangeHandler(3)}
        />
      </div>
    </div>
  );
};
