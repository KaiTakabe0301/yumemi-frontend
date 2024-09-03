import { PropsWithChildren, useState } from 'react';

type SelectProps = {
  defaultValue?: string;
  onChange?: (value: string) => void;
};
export function Select({
  defaultValue,
  onChange = () => undefined,
  children,
}: PropsWithChildren<SelectProps>) {
  const [value, setValue] = useState(defaultValue);
  return (
    <select
      className='border rounded'
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
        onChange(event.target.value);
      }}
    >
      {children}
    </select>
  );
}
