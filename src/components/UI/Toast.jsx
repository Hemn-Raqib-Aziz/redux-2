import React from 'react';
import { Toaster, toast } from 'react-hot-toast';

// Minimalistic toast component
export const Toast = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      // Styling for all toasts
      style: {
        borderRadius: '8px',
        background: '#333',
        color: '#fff',
        fontWeight: '500',
        fontSize: '14px',
        padding: '12px 16px',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
      },
      success: {
        iconTheme: {
          primary: '#4caf50',
          secondary: '#fff',
          borderRadius: '5px'
        },
      },
      error: {
        iconTheme: {
          primary: '#f44336',
          secondary: '#fff',
        },
      },
    }}
  />
);

// Export toast to use in your forms
export { toast };
