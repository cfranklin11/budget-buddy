import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

// import css
// import css from './styles/style.styl';

// Components
import App from './components/app';
import Departments from './components/departments';
import Programs from './components/programs';


// import react router deps
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Departments} />
        <Route path="/programs" component={Programs} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('root'));
