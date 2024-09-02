import 'destyle.css';

import { render } from '@testing-library/react';

import { Typography, Variants } from './Typography';

describe('Typography', () => {
  test.each([
    {
      variant: 'h1',
      expectedStyles: 'font-size: 36px; font-weight: 800;',
    },
    {
      variant: 'h2',
      expectedStyles: 'font-size: 30px; font-weight: 700;',
    },
    {
      variant: 'h3',
      expectedStyles: 'font-size: 24px; font-weight: 600;',
    },
    {
      variant: 'h4',
      expectedStyles: 'font-size: 20px; font-weight: 500;',
    },
    {
      variant: 'h5',
      expectedStyles: 'font-size: 18px',
    },
    {
      variant: 'h6',
      expectedStyles: 'font-size: 16px',
    },
  ])('renders the correct styles for $variant', ({ variant, expectedStyles }) => {
    const { getByText } = render(<Typography variant={variant as Variants}>Test Text</Typography>);
    const element = getByText('Test Text');

    // スタイルが適用されているかチェック
    expect(element).toHaveStyle(expectedStyles);
    expect(element.tagName).toBe(variant.toUpperCase());
  });

  test.each([
    {
      variant: 'large',
      expectedStyles: 'font-size: 18px;',
    },
    {
      variant: 'normal',
      expectedStyles: 'font-size: 16px;',
    },
    {
      variant: 'small',
      expectedStyles: 'font-size: 14px;',
    },
  ])('renders correct HTML elements for non-heading $variant', ({ variant, expectedStyles }) => {
    const { getByText } = render(<Typography variant={variant as Variants}>Test Text</Typography>);
    const element = getByText('Test Text');
    expect(element).toHaveStyle(expectedStyles);
    expect(element.tagName).toBe('P');
  });
});
