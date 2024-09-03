import { act, fireEvent, render } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';

import { Select } from './Select';

describe('Select Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('should render with default value', () => {
    const { getByRole } = render(
      <Select defaultValue='option2'>
        <option value='option1'>Option 1</option>
        <option value='option2'>Option 2</option>
        <option value='option3'>Option 3</option>
      </Select>,
    );
    const selectElement = getByRole('combobox') as HTMLSelectElement;
    expect(selectElement.value).toBe('option2');
  });

  test('should call onChange handler when value changes', () => {
    const handleChange = vi.fn();
    const { getByRole } = render(
      <Select defaultValue='option1' onChange={handleChange}>
        <option value='option1'>Option 1</option>
        <option value='option2'>Option 2</option>
        <option value='option3'>Option 3</option>
      </Select>,
    );
    const selectElement = getByRole('combobox') as HTMLSelectElement;

    act(() => {
      fireEvent.click(selectElement, { target: { value: 'option3' } });
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('option3');
    expect(selectElement.value).toBe('option3');
  });

  test('should update value when changed', () => {
    const { getByRole } = render(
      <Select defaultValue='option1'>
        <option value='option1'>Option 1</option>
        <option value='option2'>Option 2</option>
        <option value='option3'>Option 3</option>
      </Select>,
    );
    const selectElement = getByRole('combobox') as HTMLSelectElement;

    act(() => {
      fireEvent.click(selectElement, { target: { value: 'option2' } });
    });

    expect(selectElement.value).toBe('option2');
  });
});
