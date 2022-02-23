import { Route, Routes } from 'react-router-dom';
import Home from '@v/home';

function App() {
  return (
    <div className="App">
      React
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
