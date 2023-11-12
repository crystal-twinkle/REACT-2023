import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';
import { vi } from 'vitest';

const mockChangePage = vi.fn();
const mockSetCountPosts = vi.fn();

const defaultProps = {
  totalPages: 65,
  changePage: mockChangePage,
  totalCountPosts: 1200,
  setCountPosts: mockSetCountPosts,
  limit: 20,
};

const PaginationWrap = ({ page }: { page: number }) => {
  return <Pagination {...defaultProps} page={page} />;
};

describe('Pagination component', () => {
  it('renders correctly', () => {
    render(<PaginationWrap page={10} />);
  });

  it('handles input changes and clicking Set Posts button', () => {
    render(<PaginationWrap page={10} />);

    const inputElement = screen.getByRole('spinbutton');
    const setPostsButton = screen.getByText('Set Posts');
    fireEvent.change(inputElement, { target: { value: 30 } });
    expect(inputElement).toHaveValue(30);
    fireEvent.click(setPostsButton);
    expect(mockSetCountPosts).toHaveBeenCalledWith(30);
  });

  it('handles clicking the left and right buttons', () => {
    const page = 10;
    render(<PaginationWrap page={page} />);

    const leftButton = screen.getByText('<');
    const rightButton = screen.getByText('>');
    fireEvent.click(leftButton);
    expect(mockChangePage).toHaveBeenCalledWith(page - 1);
    fireEvent.click(rightButton);
    expect(mockChangePage).toHaveBeenCalledWith(page + 1);
  });

  it('check canMoveLeft', () => {
    render(<PaginationWrap page={1} />);
  });

  it('check canMoveRight', () => {
    render(<PaginationWrap page={65} />);
  });
});
