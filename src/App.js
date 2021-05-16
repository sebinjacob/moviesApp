import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//redux config
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
// pages
import Login from './pages/login';
import Dash from './pages/dashboard'
//auth hoc
import AuthRoute from './utils/authRoute'

function App() {
  const store = configureStore({login:{token:null}})
  store.subscribe(()=>{
    console.log("subscribing store",store.getState())
  })
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Router>
            <Switch>
              
              <AuthRoute path='/home' component={Dash} />
              
              <AuthRoute path='/' component={Login} />

            </Switch>
          </Router>
        </header>
      </div>
    </Provider>
  );
}

export default App;
