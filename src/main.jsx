import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource/cormorant-garamond/latin-600.css';
import '@fontsource/cormorant-garamond/latin-600-italic.css';
import '@fontsource/eb-garamond/latin-400.css';
import '@fontsource/eb-garamond/latin-400-italic.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import '@fontsource/italiana/latin-400.css';
import App from './App.jsx';
import './styles.css';

const container = document.getElementById('root');
const app = <App initialPath={window.location.pathname} />;

if (container.children.length > 0) hydrateRoot(container, app);
else createRoot(container).render(app);
