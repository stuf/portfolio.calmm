import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

import { getAlbums } from '../api';
import * as M from './meta';
import './album.css';

const overlayIdIn = U.view('overlay');

const AlbumScene = ({ match, history }, { state }) => {
  const slug = match.params.title;
  const album = U.view(['albums', L.find(R.whereEq({ slug }))], state);
  const images = M.imagesIn(album);

  const isNil = U.liftRec(R.isNil);

  const overlay = overlayIdIn(state);

  const findCurrentImage = (id, imgs) => L.get(L.find(R.whereEq({ id })), imgs);
  const overlayImage = U.combines(overlay, images, findCurrentImage);

  //

  const preventDefault = e => e.preventDefault();
  const setOverlay = U.liftRec(it => e => overlay.set(it.id));

  const ensureAlbums =
    U.seq(M.albumsIn(state),
          U.skipUnless(R.isEmpty),
          U.flatMapLatest(getAlbums),
          U.set(M.albumsIn(state)));

  return (
    <article className="album-detail content">
      {ensureAlbums}

      {U.unless(isNil(overlayImage),
        <React.Fragment>
          <div className="album-overlay-shadow"
               onClick={() => overlay.set(null)}>
            <div className="album-overlay-content">
              <picture>
                <img src={M.fileUrlIn(overlayImage)}
                     alt={M.nameIn(overlayImage)} />
              </picture>
            </div>
          </div>
        </React.Fragment>)}

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
                     <a href={U.string`${match.url}/${M.idIn(it)}`}
                        onClick={U.actions(preventDefault, setOverlay(it))}>
                       <figure>
                         <img src={M.lowQualityUrlIn(M.fileUrlIn(it))} alt={M.titleIn(it)} />
                       </figure>
                     </a>
                   </li>))}
         </ul>
       </div>

       <footer>

       </footer>
    </article>
  )
};

export default U.withContext(AlbumScene);
