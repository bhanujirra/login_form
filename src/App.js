import Login from "./pages/Login";
import Mri from "./pages/Mri";
import './css/Login.css';
import './css/Mri.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return(
        <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/mri-auto" element={<Mri />} />
        </Routes>
        </Router>
    );
}

export default App;
