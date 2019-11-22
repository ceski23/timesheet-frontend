import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useThunkDispatch, RootState } from './store';
import { fetchArticles } from './features/test/testSlice';
import { useSelector } from 'react-redux';

const App: React.FC = () => {
  const dispatch = useThunkDispatch();
  const { articles } = useSelector((state: RootState) => state.test.data)

  useEffect(() => {
    dispatch(fetchArticles()).then(console.log)
  }, [dispatch]);

  useEffect(() => {
    console.log(`Pobrano ${articles.length} artykulow`);
  }, [articles.length])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
