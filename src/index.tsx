import App from "./components/App";
import TagManager from 'react-gtm-module'
import { createRoot } from "react-dom/client";

// if (window.location.hostname !== "localhost") {
    // TagManager.initialize({ gtmId: 'GTM-5LQBTT2V' });
// }

const container = document.getElementById("root");

const root = createRoot(container!);

root.render(<App />);
