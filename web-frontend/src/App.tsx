import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from './pages/Layout';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { SetToken } from './pages/SetToken';
import { CreateRoom } from './pages/CreateRoom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="setToken" element={<SetToken />} />
                    <Route path="createRoom" element={<CreateRoom />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
