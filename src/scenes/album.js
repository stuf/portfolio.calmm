import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

import { getAlbums } from '../api';
import * as M from './meta';
import './album.css';

const AlbumScene = ({ match, history }, { state }) => {
  const album =
    U.view(['albums',
            L.find(R.whereEq({ slug: match.params.title }))], state);

  const images = M.imagesIn(album);

  const ensureAlbums =
    U.seq(M.albumsIn(state),
          U.skipUnless(R.isEmpty),
          U.flatMapLatest(getAlbums),
          U.set(M.albumsIn(state)));

  return (
    <article className="album-detail content">
      {ensureAlbums}

      <button className="go-back"
              onClick={() => history.goBack()}>
        Back
      </button>

      <header>
        <h1>{M.titleIn(album)}</h1>
      </header>

      <div>
        <ul>
          {U.seq(images,
                 U.skipUnless(R.identity),
                 U.mapElems((it, idx) =>
                   <li key={idx}>
                     <figure>
                       <img src={M.lowQualityUrlIn(M.fileUrlIn(it))} alt={M.titleIn(it)} />
                     </figure>
                   </li>))}
         </ul>
       </div>

       <footer>

       </footer>
    </article>
  )
};

export default U.withContext(AlbumScene);
