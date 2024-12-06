import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
    it('should render the application title', () => {
        render(<App />);
        expect(screen.getByText(/Coinbase Pro WebSocket Feed/i)).toBeInTheDocument();
    });

    it('should render all key components', () => {
        render(<App />);
       /* expect(screen.getByText(/Subscribe/Unsubscribe/i)).toBeInTheDocument();*/
        expect(screen.getByText(/Price View/i)).toBeInTheDocument();
        expect(screen.getByText(/Match View/i)).toBeInTheDocument();
        expect(screen.getByText(/System Status/i)).toBeInTheDocument();
    });
});
