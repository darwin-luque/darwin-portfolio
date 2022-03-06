import { Route, Routes } from 'solid-app-router';
import Home from './screens/home/home.screen';
import Library from './screens/library/library.screen';
import Track from './screens/track/track.screen';

function App() {
  return (
    <Routes>
      <Route path="/" element={Home} />
      <Route path="/library" element={Library} />
      <Route path="/track/:id" element={Track} />
    </Routes>
  );
}

export default App;
