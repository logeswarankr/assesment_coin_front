import React from 'react';
import { render, screen } from '@testing-library/react';
import SystemStatus from '../SystemStatus';

describe('SystemStatus Component', () => {
    it('should render the System Status header', () => {
        render(<SystemStatus systemStatus={[]} />);
        expect(screen.getByText('System Status')).toBeInTheDocument();
    });

    it('should display all provided channels and their product IDs', () => {
        const mockSystemStatus = [
            { name: 'level2', product_ids: ['BTC-USD', 'ETH-USD'] },
            { name: 'matches', product_ids: ['XRP-USD'] },
        ];

        render(<SystemStatus systemStatus={mockSystemStatus} />);

        expect(screen.getByText('Channel: level2, Product: BTC-USD, ETH-USD')).toBeInTheDocument();
        expect(screen.getByText('Channel: matches, Product: XRP-USD')).toBeInTheDocument();
    });

    it('should display "N/A" if no product IDs are provided', () => {
        const mockSystemStatus = [{ name: 'ticker' }];

        render(<SystemStatus systemStatus={mockSystemStatus} />);

        expect(screen.getByText('Channel: ticker, Product: N/A')).toBeInTheDocument();
    });

    it('should handle an empty systemStatus array gracefully', () => {
        render(<SystemStatus systemStatus={[]} />);

        const listItems = screen.queryAllByRole('listitem');
        expect(listItems.length).toBe(0);
    });
});
