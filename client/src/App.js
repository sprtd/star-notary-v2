import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { RootInterface } from './components/global-style/global-style'
import Navbar from './components/navbar/navbar.component'
import MainLayout from './components/main-layout/main-layout.component'
const App = () => {
  return (
    <RootInterface>
      <Router>
        <Navbar />
        <Switch>
            <Route exact  path='/' component={ MainLayout } />
            <Route exact  path='/transaction' component={ MainLayout } />
        </Switch>

      </Router>
    </RootInterface>
   
  );
}

export default App;
