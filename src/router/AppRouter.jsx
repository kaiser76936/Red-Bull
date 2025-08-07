import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EdicoesList from '../views/EdicoesList';
import EdicaoDetail from '../views/EdicaoDetail';
import AddEdicaoForm from '../views/AddEdicaoForm'; 

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EdicoesList />} />
        <Route path="/add-edicao" element={<AddEdicaoForm />} /> 
        <Route path="/edicoes/:id" element={<EdicaoDetail />} />
      </Routes>
    </Router>
  );
}
