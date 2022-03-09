import { Provider } from 'react-redux';
import Router from '../router/router';
import { store } from '../store';

export function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
