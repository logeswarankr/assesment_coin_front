import React from 'react';
import { render, screen } from '@testing-library/react';
import PriceView from '../PriceView';

describe('PriceView Component', () => {
    it('should render the Price View header', () => {
        render(<PriceView level2Data={{}} />);
        expect(screen.getByText('Price View')).toBeInTheDocument();
    });

    it('should render product names with their bids and asks', () => {
        const mockLevel2Data = {
            'BTC-USD': {
                bids: [['50000.00', '0.5'], ['49900.00', '1.0']],
                asks: [['50100.00', '0.3'], ['50200.00', '0.4']],
            },
            'ETH-USD': {
                bids: [['4000.00', '1.2'], ['3950.00', '0.8']],
                asks: [['4050.00', '0.7'], ['4100.00', '0.6']],
            },
        };

        render(<PriceView level2Data={mockLevel2Data} />);

        // Check for product headers
        expect(screen.getByText('BTC-USD')).toBeInTheDocument();
        expect(screen.getByText('ETH-USD')).toBeInTheDocument();

        // Check for bid and ask data
        expect(screen.getAllByText('Bids:')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Asks:')[1]).toBeInTheDocument();

        // Check for JSON-rendered bids and asks
        // expect(screen.getByText(JSON.stringify(mockLevel2Data['BTC-USD'].bids, null, 2))).toBeInTheDocument();
        // expect(screen.getByText(JSON.stringify(mockLevel2Data['BTC-USD'].asks, null, 2))).toBeInTheDocument();

        // expect(screen.getByText(JSON.stringify(mockLevel2Data['ETH-USD'].bids, null, 2))).toBeInTheDocument();
        // expect(screen.getByText(JSON.stringify(mockLevel2Data['ETH-USD'].asks, null, 2))).toBeInTheDocument();
    });

    it('should handle empty level2Data gracefully', () => {
        render(<PriceView level2Data={{}} />);

        // No products should render
        const productHeaders = screen.queryAllByRole('heading', { level: 3 });
        expect(productHeaders.length).toBe(0);
    });
});
