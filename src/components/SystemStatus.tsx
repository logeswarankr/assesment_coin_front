import React from 'react';

interface Channel {
    name: string;
    product_ids?: string[];
}

interface SystemStatusProps {
    systemStatus: Channel[];
}

const SystemStatus: React.FC<SystemStatusProps> = ({ systemStatus }) => {
    return (
        <div>
            <h2>System Status</h2>
            <ul>
                {systemStatus.map((channel, index) => (
                    <li key={index}>
                        {`Channel: ${channel.name}, Product: ${channel.product_ids?.join(', ') || 'N/A'}`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SystemStatus;