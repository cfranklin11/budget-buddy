import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// import css
// import css from './styles/style.styl';

// Components
import App from './components/app';
import InfographicSingle from './components/infographic-single';
// import InfographicGrid from './components/infographicGrid';

import Departments from './components/departments';
import Programs from './components/programs';


// import react router deps
import store, { history } from './store';

const router = (
  // <Provider store={store}>
  //   <Router history={history}>
  //     <Route path="/" component={App}>
  //     <IndexRoute component={InfographicGrid}></IndexRoute>
  //     <Route path="/view/:infographicId" component={InfographicSingle}></Route>
  //     </Route>
  //   </Router>
  // </Provider>
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Departments} />
        <Route path="/programs" component={Programs} />
        <Route path="/infographic" component={InfographicSingle} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('root'));
