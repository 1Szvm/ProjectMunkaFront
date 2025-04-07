import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/userContext.jsx'
import { ConfirmProvider } from 'material-ui-confirm'
import { DarkModeProvider } from './components/DarkModeContext.jsx'


createRoot(document.getElementById('root')).render(
  <ConfirmProvider>
    <UserProvider>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
    </UserProvider>
  </ConfirmProvider>
)
