import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';
import { vi } from 'vitest';
import { renderWithProviders } from './test-utils';

const mockChangePage = vi.fn();
const mockSetCountPosts = vi.fn();

const defaultProps = {
  changePage: mockChangePage,
  totalCountPosts: 1200,
  setCountPosts: mockSetCountPosts,
  limit: 20,
};

const paginationCall = (page: number) => {
  return renderWithProviders(<Pagination {...defaultProps} page={page} />);
};

describe('Pagination component', () => {
  it('renders correctly and check not canMoveLeft', () => {
    paginationCall(1);
  });

  it('handles input changes and clicking Set Posts button', () => {
    paginationCall(10);
    const inputElement = screen.getByRole('spinbutton');
    const setPostsButton = screen.getByText('Set Posts');
    fireEvent.change(inputElement, { target: { value: 30 } });
    expect(inputElement).toHaveValue(30);
    fireEvent.click(setPostsButton);
    expect(mockSetCountPosts).toHaveBeenCalledWith(30);
  });

  it('handles clicking the left and right buttons', () => {
    const page = 10;
    paginationCall(page);

    const leftButton = screen.getByText('<');
    const rightButton = screen.getByText('>');
    fireEvent.click(leftButton);
    expect(mockChangePage).toHaveBeenCalledWith(page - 1);
    fireEvent.click(rightButton);
    expect(mockChangePage).toHaveBeenCalledWith(page + 1);
  });

  it('check not canMoveRight', () => {
    paginationCall(65);
  });
});
