import React, { useState, useEffect } from 'react';
import SubscribeUnsubscribe from './components/SubscribeUnsubscribe';
import PriceView from './components/PriceView';
import MatchView from './components/MatchView';
import SystemStatus from './components/SystemStatus';

interface Level2Data {
  bids: string[][];
  asks: string[][];
}

interface Match {
  time: string;
  product_id: string;
  size: string;
  price: string;
  side: string;
}

interface Channel {
  name: string;
  product_ids?: string[];
}

const ws = new WebSocket('ws://localhost:8081');

const App: React.FC = () => {
  const [subscribedProducts, setSubscribedProducts] = useState<Record<string, boolean>>({});
  const [level2Data, setLevel2Data] = useState<Record<string, Level2Data>>({});
  const [matchData, setMatchData] = useState<Match[]>([]);
  const [systemStatus, setSystemStatus] = useState<Channel[]>([]);

  useEffect(() => {
    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      handleWebSocketData(data);
    };

    return () => ws.close();
  }, []);

  const handleWebSocketData = (data: any) => {
    if (data.type === 'snapshot' || data.type === 'l2update') {
      setLevel2Data((prev) => ({
        ...prev,
        [data.product_id]: data,
      }));
    }

    if (data.type === 'match') {
      setMatchData((prev) => [data, ...prev.slice(0, 49)]);
    }

    if (data.type === 'subscriptions') {
      setSystemStatus(data.channels);
    }
  };

  const handleSubscription = (product: string, action: 'subscribe' | 'unsubscribe') => {
    ws.send(JSON.stringify({ type: action, product }));
    setSubscribedProducts((prev) => ({
      ...prev,
      [product]: action === 'subscribe',
    }));
  };

  return (
    <div className="App">
      <h1>Coinbase Pro WebSocket Feed</h1>
      <SubscribeUnsubscribe
        subscribedProducts={subscribedProducts}
        handleSubscription={handleSubscription}
      />
      <PriceView level2Data={level2Data} />
      <MatchView matchData={matchData} />
      <SystemStatus systemStatus={systemStatus} />
    </div>
  );
};

export default App;
