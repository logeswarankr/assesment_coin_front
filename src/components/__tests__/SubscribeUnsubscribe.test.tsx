import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SubscribeUnsubscribe from '../SubscribeUnsubscribe';

describe('SubscribeUnsubscribe Component', () => {
    const mockHandleSubscription = jest.fn();

    beforeEach(() => {
        render(
            <SubscribeUnsubscribe
                subscribedProducts={{ 'BTC-USD': false, 'ETH-USD': true }}
                handleSubscription={mockHandleSubscription}
            />
        );
    });

    it('should display all products with their subscription status', () => {
        expect(screen.getByText('BTC-USD')).toBeInTheDocument();
        expect(screen.getByText('ETH-USD')).toBeInTheDocument();
    });

    it('should display correct button text based on subscription status', () => {
        expect(screen.getAllByText('Subscribe')[0]).toBeInTheDocument(); // For BTC-USD
        expect(screen.getAllByText('Unsubscribe')[1]).toBeInTheDocument(); // For ETH-USD
    });

    it('should call handleSubscription with the correct arguments on Subscribe button click', () => {
        const subscribeButton = screen.getAllByText('Subscribe');
        fireEvent.click(subscribeButton[0]);
        expect(mockHandleSubscription).toHaveBeenCalledWith('BTC-USD', 'subscribe');
    });

    it('should call handleSubscription with the correct arguments on Unsubscribe button click', () => {
        const unsubscribeButton = screen.getAllByText('Unsubscribe');
        fireEvent.click(unsubscribeButton[1]);
        expect(mockHandleSubscription).toHaveBeenCalledWith('ETH-USD', 'unsubscribe');
    });
});
