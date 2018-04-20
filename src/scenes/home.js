import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';

import { Link } from '../components/router';
import * as M from './meta';
import './home.css';

const coverImageUrl = R.compose(M.coverImageIn, M.firstImageIn);
const coverImageTitle = R.compose(M.titleIn, M.firstImageIn);

const HomeScene = ({ match, history }, { state }) =>
  <section className="albums content">
    <ul className="album-list">
      {U.seq(M.albumsIn(state),
             U.mapElems((it, idx) =>
               <li key={idx}
                   className="album-item">
                 <picture className="cover">
                   <img src={coverImageUrl(it)}
                        alt={coverImageTitle(it)} />
                 </picture>
                 <Link to={M.slugIn(it)}
                       className="album-link">
                   <em>{M.titleIn(it)}</em>
                 </Link>
               </li>))}
    </ul>
  </section>;

export default U.withContext(HomeScene);
