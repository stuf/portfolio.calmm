import * as U from 'karet.util';
import * as L from 'partial.lenses';
import { getEntries } from './services/contentful';
import { albumL } from './meta';

export const getAlbums = () =>
  U.seq(getEntries({ content_type: 'album' }),
        U.liftRec(L.get(['items', L.array(albumL)])));

