import React from 'react';

interface PriceViewProps {
    level2Data: Record<string, { bids: string[][]; asks: string[][] }>;
}

const PriceView: React.FC<PriceViewProps> = ({ level2Data }) => {
    return (
        <div>
            <h2>Price View</h2>
            {Object.entries(level2Data).map(([product, data]) => (
                <div key={product}>
                    <h3>{product}</h3>
                    <div>
                        <strong>Bids:</strong>
                        <pre>{JSON.stringify(data.bids, null, 2)}</pre>
                    </div>
                    <div>
                        <strong>Asks:</strong>
                        <pre>{JSON.stringify(data.asks, null, 2)}</pre>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PriceView;
