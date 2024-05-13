// @ts-nocheck
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../components/card/Card';

const mockLaunch = {
  name: 'Test Launch',
  date_utc: '2024-05-13T08:00:00.000Z',
  success: true,
  links: {
    patch: {
      small: 'https://example.com/patch.png',
    },
  },
  failures: [],
};

const mockCore = {
  serial: 'B1077',
};

const mockPayloads = [
  { id: '62dd73ed202306255024d145', type: 'Crew Dragon' },
  { id: '630f63bf18702d4844fb5391', type: 'Satellite' },
];

describe('Card component', () => {
  it('renders with provided data', () => {
    const { getByText, getByTestId } = render(
      <Card
        data={{
          launch: mockLaunch,

          core: mockCore,

          payloads: mockPayloads,
        }}
      />
    );

    expect(getByText('Test Launch')).toBeInTheDocument();
    expect(getByTestId('date')).toHaveTextContent('May 13th, 2024 9:00 AM');
    expect(getByTestId('core')).toHaveTextContent('B1077');
    // Check payloads
    expect(getByText('62dd73ed202306255024d145')).toBeInTheDocument();
    expect(getByText('630f63bf18702d4844fb5391')).toBeInTheDocument();
  });

  it('displays success icon for successful launch', () => {
    const { getByTestId } = render(
      <Card
        data={{
          launch: { ...mockLaunch, success: true },
          core: null,
          payloads: [],
        }}
      />
    );

    expect(getByTestId('success-icon')).toBeInTheDocument();
  });

  it('displays error icon for failed launch', () => {
    const { getByTestId } = render(
      <Card
        data={{
          launch: { ...mockLaunch, success: false },
          core: null,
          payloads: [],
        }}
      />
    );

    expect(getByTestId('error-icon')).toBeInTheDocument();
  });
});
