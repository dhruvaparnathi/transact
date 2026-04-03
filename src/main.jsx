import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TransactionContext from './contexts/TransactionContext.jsx'

createRoot(document.getElementById('root')).render(
    <TransactionContext>
        <App />
    </TransactionContext>
)
