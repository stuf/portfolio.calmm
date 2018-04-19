import * as React from 'karet';
import * as U from 'karet.util';
import * as L from 'partial.lenses';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import HomeScene from './scenes/home';
import AlbumScene from './scenes/album';
import { getAlbums } from './api';

import './app.css';

const albumsIn = U.view(['albums', L.valueOr([])]);

const App = ({ state }) =>
  <div className="app-root">
    {U.sink(U.seq(getAlbums(),
                  U.set(albumsIn(state))))}

    <U.Context context={{ state }}>
      <Router>
        <div>
          <Switch>
            <Route path="/:title" component={AlbumScene} />
            <Route path="/" exact component={HomeScene} />
            <Route render={() => <div>Not found</div>} />
          </Switch>
        </div>
      </Router>
    </U.Context>

    <footer>
			© 2018 Stefan Rimaila
    </footer>
  </div>;

export default App;

