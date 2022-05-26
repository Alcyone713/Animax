import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { SnackbarProvider } from 'material-ui-snackbar-provider'
import HomePage from './Pages/HomePage/HomePage';
import WatchListPage from './Pages/WatchListPage/WatchListPage';
import CompletedListPage from './Pages/CompletedListPage/CompletedListPage';
import ForYouPage from './Pages/ForYouPage/ForYouPage';
import SignInPage from './Pages/SignInPage/SignInPage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';

function App() {

  return (
    <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/watchlist" element={<WatchListPage />} />
            <Route exact path="/completed" element={<CompletedListPage />} />
            <Route exact path="/recommendations" element={<ForYouPage />} />
            <Route exact path="/signin" element={<SignInPage />} />
            <Route exact path="/signup" element={<SignUpPage />} />
          </Routes>
        </Router >
      </div >
    </SnackbarProvider>
  );
}

export default App;
