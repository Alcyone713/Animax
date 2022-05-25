import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import HomePage from './Pages/HomePage/HomePage';
import WatchListPage from './Pages/WatchListPage/WatchListPage';
import CompletedListPage from './Pages/CompletedListPage/CompletedListPage';
import ForYouPage from './Pages/ForYouPage/ForYouPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/watchlist" element={<WatchListPage />} />
          <Route exact path="/completed" element={<CompletedListPage />} />
          <Route exact path="/recommendations" element={<ForYouPage />} />
        </Routes>
      </Router >
    </div >
  );
}

export default App;
