import { css } from '@emotion/react';
import { Check } from 'lucide-react';
import { forwardRef } from 'react';

const checkboxStyle = {
  wrapper: css({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
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
    userSelect: 'none',
  }),

  indicator: css({
    display: 'inline-flex',
    width: '100%',
    height: '100%',
    background: 'transparent',
    border: '1px solid #000',
    borderRadius: '4px',
    transition: 'background-color 0.3s',

    '[data-state="checked"] &': {
      backgroundColor: '#000', // チェック時の背景色を黒に
    },
  }),

  label: css({
    cursor: 'pointer',
  }),
};

type CheckboxElement = React.ElementRef<'button'>;
type PrimitiveButtonProps = React.ComponentPropsWithoutRef<'button'>;
interface CheckboxProps extends PrimitiveButtonProps {
  checked?: boolean;
  label: React.ReactNode;
  required?: boolean;
  onCheckedChange: React.MouseEventHandler<HTMLButtonElement>;
}
const Checkbox = forwardRef<CheckboxElement, CheckboxProps>(
  ({ checked, id, required, onCheckedChange = () => undefined, label, ...props }, ref) => {
    return (
      <div css={[checkboxStyle.wrapper]}>
        <button
          {...props}
          css={[checkboxStyle.checkbox]}
          type='button'
          role='checkbox'
          aria-checked={checked}
          aria-required={required}
          data-state={checked ? 'checked' : 'unchecked'}
          ref={ref}
          id={id}
          onClick={onCheckedChange}
        >
          <span css={[checkboxStyle.indicator]}>
            <Check color='white' size='16px' />
          </span>
        </button>
        <label css={[checkboxStyle.label]} htmlFor={id}>
          {label}
        </label>
      </div>
    );
  },
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
