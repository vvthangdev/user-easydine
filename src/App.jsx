import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './AppRoutes';
import { AppleThemeProvider } from './theme/theme-provider.jsx';
import './styles/global.css';

function App() {
  return (
    <AppleThemeProvider>
      <div className="App" style={{ textAlign: 'center' }}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{
            borderRadius: '8px',
            background: '#ffffff',
            color: '#1d1d1f',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        <AppRoutes />
      </div>
    </AppleThemeProvider>
  );
}

export default App;