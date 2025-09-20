import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/components/HomePage';
import { SettingsPage } from '@/components/SettingsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}

export default App;