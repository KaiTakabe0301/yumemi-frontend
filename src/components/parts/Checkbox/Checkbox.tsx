import { Check } from 'lucide-react';
import { forwardRef } from 'react';

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
      <div className='flex gap-2 cursor-pointer items-center hover:opacity-80 active:opacity-60'>
        <button
          {...props}
          className='w-4 h-4 flex-shrink-0 m-0 cursor-pointer user-select-none'
          type='button'
          role='checkbox'
          aria-checked={checked}
          aria-required={required}
          data-state={checked ? 'checked' : 'unchecked'}
          ref={ref}
          id={id}
          onClick={onCheckedChange}
        >
          <span
            className={`inline-flex w-full h-full border border-solid border-black rounded duration-300 ${checked ? 'bg-black' : 'bg-transparent'} `}
          >
            <Check color='white' size='16px' />
          </span>
        </button>
        <label className='cursor-pointer' htmlFor={id}>
          {label}
        </label>
      </div>
    );
  },
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
