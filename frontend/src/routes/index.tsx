import React from 'react';
import { useLocation, Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Landing from '../pages/Landing/index';
import OrphanagesMap from '../pages/OrphanagesMap/index';
import Orphanages from '../pages/Orphanages/index';
import CreateOrphanages from '../pages/CreateOrphanages/index';




function Routes() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="transition" timeout={600}>
        <Switch location={location}>
          <Route path="/" exact component={Landing} />
          <Route path="/home" component={OrphanagesMap} />
          <Route path="/orphanages/create" component={CreateOrphanages} />
          <Route path="/orphanages/:id" component={Orphanages} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default Routes;