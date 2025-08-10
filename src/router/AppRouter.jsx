import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EdicoesList from '../views/EdicoesList';
import EdicaoDetail from '../views/EdicaoDetail';
import AddEdicaoForm from '../views/AddEdicaoForm';
import EditEdicaoForm from '../views/EditEdicaoForm';
import Navbar from '../components/Navbar';

export default function AppRouter() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: '60px' }}>
        <Routes>
          <Route path="/" element={<EdicoesList />} />
          <Route path="/add-edicao" element={<AddEdicaoForm />} />
          <Route path="/edicoes/:id" element={<EdicaoDetail />} />
          <Route path="/edicoes/:id/edit" element={<EditEdicaoForm />} />
        </Routes>
      </div>
    </Router>
  );
}
