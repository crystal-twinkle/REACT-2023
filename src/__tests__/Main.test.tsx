import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import { setTestProps } from './utils/forMock';
import Main from '../components/Main';

describe('Main Component', () => {
  it('render and click on Generate Error', async () => {
    render(<Main cards={setTestProps().cards} />);

    const errorBtn = screen.getByText('Generate Error');
    expect(() => fireEvent.click(errorBtn)).toThrow('Test error');
  });
});
