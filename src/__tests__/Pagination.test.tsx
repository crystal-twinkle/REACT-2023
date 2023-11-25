import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import Pagination from '../components/Pagination';
import mockRouter from 'next-router-mock';

const paginationCall = () => {
  render(<Pagination />);
};

describe('Pagination component', () => {
  it('handles input changes and clicking Set Posts button', () => {
    paginationCall();
    const inputElement = screen.getByRole('spinbutton');
    const setPostsButton = screen.getByText('Set Posts');
    fireEvent.change(inputElement, { target: { value: 30 } });
    expect(inputElement).toHaveValue(30);
    fireEvent.click(setPostsButton);
    expect(mockRouter.query).toEqual({ limit: 30, page: 1 });
  });

  it('handles clicking the left and right buttons', () => {
    paginationCall();
    const rightButton = screen.getByText('>');
    const leftButton = screen.getByText('<');
    fireEvent.click(rightButton);
    expect(mockRouter.query).toEqual({ limit: 30, page: 2 });
    fireEvent.click(leftButton);
    expect(mockRouter.query).toEqual({ limit: 30, page: 1 });
  });
});
