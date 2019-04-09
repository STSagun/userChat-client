import React, { Component }  from 'react';
import { ApolloProvider } from "react-apollo";
import { client } from './apolloClient';
import AddUser from './components/AddUser';
import {
  Route, BrowserRouter as Router, Switch,
} from 'react-router-dom';
import NoMatch from './components/NoMatch';
import UserChat from './pages/UserChat/UserChat';
import UserLists from './components/UserLists';
import UserDetails from './components/UserDetails';
import Start from './components/Start';

const App = () => (
  <ApolloProvider client={client}>
   <Router>
            <Switch>
              <Route exact path="/" component={UserChat} />
              <Route path="/Start/:from/:to" component={UserDetails} />
              <Route exact path="/Start" component={Start} />
              <Route path="/AddUser" component={AddUser} />
              <Route path="/Start/:from" component={UserLists} />
              <Route component={NoMatch} />
            </Switch>
        </Router>
  </ApolloProvider> 
);
export default App;
