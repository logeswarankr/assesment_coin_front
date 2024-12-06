import React from 'react';
import { render, screen } from '@testing-library/react';
import MatchView from '../MatchView';

describe('MatchView Component', () => {
    it('should render the Match View header', () => {
        render(<MatchView matchData={[]} />);
        expect(screen.getByText('Match View')).toBeInTheDocument();
    });

    it('should render match data correctly with green text for buys and red text for sells', () => {
        const mockMatchData = [
            {
                time: '2024-12-04T10:15:00Z',
                product_id: 'BTC-USD',
                size: '0.5',
                price: '50000.00',
                side: 'buy',
            },
            {
                time: '2024-12-04T10:16:00Z',
                product_id: 'ETH-USD',
                size: '1.2',
                price: '4000.00',
                side: 'sell',
            },
        ];

        render(<MatchView matchData={mockMatchData} />);

        // Check that both match items are rendered
        expect(screen.getByText('2024-12-04T10:15:00Z | BTC-USD | 0.5 | 50000.00')).toBeInTheDocument();
        expect(screen.getByText('2024-12-04T10:16:00Z | ETH-USD | 1.2 | 4000.00')).toBeInTheDocument();

        // Check styles for buy (green) and sell (red)
        const buyItem = screen.getByText('2024-12-04T10:15:00Z | BTC-USD | 0.5 | 50000.00');
        expect(buyItem).toHaveStyle('color: green');

        const sellItem = screen.getByText('2024-12-04T10:16:00Z | ETH-USD | 1.2 | 4000.00');
        expect(sellItem).toHaveStyle('color: red');
    });

    it('should handle empty matchData gracefully', () => {
        render(<MatchView matchData={[]} />);

        // No list items should render
        const listItems = screen.queryAllByRole('listitem');
        expect(listItems.length).toBe(0);
    });
});
