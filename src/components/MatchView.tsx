import React from 'react';

interface Match {
    time: string;
    product_id: string;
    size: string;
    price: string;
    side: string;
}

interface MatchViewProps {
    matchData: Match[];
}

const MatchView: React.FC<MatchViewProps> = ({ matchData }) => {
    return (
        <div>
            <h2>Match View</h2>
            <ul>
                {matchData.map((match, index) => (
                    <li
                        key={index}
                        style={{
                            color: match.side === 'buy' ? 'green' : 'red',
                        }}
                    >
                        {`${match.time} | ${match.product_id} | ${match.size} | ${match.price}`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MatchView;
