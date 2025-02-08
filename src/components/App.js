import React from 'react';
import { Provider } from 'react-redux';
import store from '../store.js';
import BooksList from './BooksList';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BooksList />
      </div>
    </Provider>
  );
}

export default App;
