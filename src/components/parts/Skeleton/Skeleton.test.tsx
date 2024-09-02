import { render } from '@testing-library/react';
import { describe, expect } from 'vitest';

import { Skeleton } from './Skeleton';

describe('Skeleton component', () => {
  test('renders correctly with default classes', () => {
    const { container } = render(<Skeleton />);
    const skeletonElement = container.firstChild as HTMLElement;

    // デフォルトのクラスが適用されているかをテスト
    expect(skeletonElement).toHaveClass('animate-pulse rounded-md bg-muted');
  });

  test('applies additional className', () => {
    const { container } = render(<Skeleton className='custom-class' />);
    const skeletonElement = container.firstChild as HTMLElement;

    // デフォルトのクラスと追加されたクラスが両方適用されているかをテスト
    expect(skeletonElement).toHaveClass('animate-pulse rounded-md bg-muted custom-class');
  });

  test('passes additional props to the div element', () => {
    const { container } = render(<Skeleton data-testid='skeleton-test' />);
    const skeletonElement = container.firstChild as HTMLElement;

    // data-testid プロパティが正しく適用されているかをテスト
    expect(skeletonElement).toHaveAttribute('data-testid', 'skeleton-test');
  });
});
