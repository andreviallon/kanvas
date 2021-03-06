import { useState, useEffect, ChangeEvent } from "react";

interface Props {
  value: boolean;
  updateValue: (value: boolean) => void;
}

export const InputCheckbox: React.FC<Props> = ({ value, updateValue }) => {
  const [inputValue, setInputValue] = useState<boolean>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.checked);
    updateValue(event.target.checked);
  };

  return (
    <input type="checkbox" checked={inputValue} onChange={handleInputChange} />
  );
};
