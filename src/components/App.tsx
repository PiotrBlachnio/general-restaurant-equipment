import "../assets/scss/styles.scss";
import "@carybit/lead-generation-form/dist/index.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainComponent from './MainComponent';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<MainComponent />} />
            </Routes>
        </Router>
    );
};

export default App;
