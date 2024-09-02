import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, vi } from 'vitest';

import { Checkbox } from './Checkbox';

describe('Checkbox Component', () => {
  const handleChange = vi.fn();

  afterEach(() => {
    vitest.resetAllMocks();
  });

  test('renders correctly with the provided label', () => {
    render(<Checkbox label='Test Label' onClick={handleChange} />);

    const label = screen.getByText('Test Label');
    expect(label).toBeVisible();
  });

  test('toggles the checkbox when clicked', () => {
    // 状態を管理するラッパーコンポーネント
    const CheckboxWithState = () => {
      const [isChecked, setIsChecked] = useState(false);

      return (
        <Checkbox
          label='Test Label'
          checked={isChecked}
          onClick={() => {
            setIsChecked(!isChecked);
            handleChange();
          }}
        />
      );
    };

    render(<CheckboxWithState />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    // Click to toggle the checkbox
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
  });

  test('is checked when the checked prop is true', () => {
    render(<Checkbox label='Test Label' checked={true} onClick={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('is disabled when the disabled prop is true', () => {
    render(<Checkbox label='Test Label' disabled={true} onClick={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });
});
