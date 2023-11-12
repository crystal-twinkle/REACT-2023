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

describe('Pagination component', () => {
  it('renders correctly', () => {
    render(<Pagination {...defaultProps} page={10} />);
  });

  it('handles input changes and clicking Set Posts button', () => {
    render(<Pagination {...defaultProps} page={10} />);

    const inputElement = screen.getByRole('spinbutton');
    const setPostsButton = screen.getByText('Set Posts');
    fireEvent.change(inputElement, { target: { value: 30 } });
    expect(inputElement).toHaveValue(30);
    fireEvent.click(setPostsButton);
    expect(mockSetCountPosts).toHaveBeenCalledWith(30);
  });

  it('handles clicking the left and right buttons', () => {
    const page = 10;
    render(<Pagination {...defaultProps} page={page} />);

    const leftButton = screen.getByText('<');
    const rightButton = screen.getByText('>');
    fireEvent.click(leftButton);
    expect(mockChangePage).toHaveBeenCalledWith(page - 1);
    fireEvent.click(rightButton);
    expect(mockChangePage).toHaveBeenCalledWith(page + 1);
  });

  it('check canMoveLeft', () => {
    render(<Pagination {...defaultProps} page={1} />);
  });

  it('check canMoveRight', () => {
    render(<Pagination {...defaultProps} page={65} />);
  });
});
