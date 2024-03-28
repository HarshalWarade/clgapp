import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './store/auth';
import { DarkModeProvider } from './context/DarkModeContext';
// import { UserProvider } from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
      <DarkModeProvider>
        {/* <UserProvider> */}
          <App />
        {/* </UserProvider> */}
      </DarkModeProvider>
    </React.StrictMode>
  </AuthProvider>,
);
