import React from 'react';

interface SubscribeUnsubscribeProps {
    subscribedProducts: Record<string, boolean>;
    handleSubscription: (product: string, action: 'subscribe' | 'unsubscribe') => void;
}

const PRODUCTS = ['BTC-USD', 'ETH-USD', 'XRP-USD', 'LTC-USD'];

const SubscribeUnsubscribe: React.FC<SubscribeUnsubscribeProps> = ({ subscribedProducts, handleSubscription }) => {
    return (
        <div>
            <h2>Subscribe/Unsubscribe</h2>
            {PRODUCTS.map((product) => (
                <div key={product}>
                    <span>{product}</span>
                    <button onClick={() => handleSubscription(product, 'subscribe')}>
                        Subscribe
                    </button>
                    <button onClick={() => handleSubscription(product, 'unsubscribe')}>
                        Unsubscribe
                    </button>
                    <span>{subscribedProducts[product] ? 'Subscribed' : 'Unsubscribed'}</span>
                </div>
            ))}
        </div>
    );
};

export default SubscribeUnsubscribe;
