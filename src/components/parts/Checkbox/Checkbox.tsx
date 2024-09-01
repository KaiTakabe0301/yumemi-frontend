import { css } from '@emotion/react';
import { forwardRef } from 'react';

const checkboxStyle = {
  wrapper: css({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      opacity: 0.8,
    },
    '&:active': {
      opacity: 0.6,
    },
  }),

  checkbox: css({
    width: '16px',
    height: '16px',
    flexShrink: 0,
    margin: 0,
    cursor: 'pointer',
  }),

  label: css({
    cursor: 'pointer',
  }),
};

type CheckboxElement = React.ElementRef<'input'>;
type PrimitiveButtonProps = React.ComponentPropsWithoutRef<'input'>;
interface CheckboxProps extends PrimitiveButtonProps {
  label: React.ReactNode;
  required?: boolean;
  onCheckedChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Checkbox = forwardRef<CheckboxElement, CheckboxProps>(
  ({ checked, id, required, onCheckedChange = () => undefined, label, ...props }, ref) => {
    return (
      <div css={[checkboxStyle.wrapper]}>
        <input
          {...props}
          css={[checkboxStyle.checkbox]}
          checked={checked}
          type='checkbox'
          role='checkbox'
          aria-checked={checked}
          aria-required={required}
          ref={ref}
          id={id}
          onChange={onCheckedChange}
        />
        <label css={[checkboxStyle.label]} htmlFor={id}>
          {label}
        </label>
      </div>
    );
  },
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
