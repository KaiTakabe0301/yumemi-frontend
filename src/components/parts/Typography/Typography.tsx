import { PropsWithChildren } from 'react';
import { tv } from 'tailwind-variants';

import { cn } from '../../../utils/cn';

export type Variants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'large' | 'normal' | 'small';

const typography = tv({
  base: 'text-base',
  variants: {
    variant: {
      h1: 'text-4xl font-extrabold',
      h2: 'text-3xl font-bold',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-medium',
      h5: 'text-lg',
      h6: 'text-base',
      large: 'text-lg',
      normal: 'text-base',
      small: 'text-sm',
    },
  },
  defaultVariants: {
    variant: 'normal',
  },
});

type TypographyProps = {
  variant: Variants;
  className?: string;
} & PropsWithChildren;

export function Typography({ variant, children, className }: TypographyProps) {
  const Comp = variant !== 'large' && variant !== 'normal' && variant !== 'small' ? variant : 'p';
  return <Comp className={cn(typography({ variant }), className)}>{children}</Comp>;
}
