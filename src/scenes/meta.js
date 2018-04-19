import * as U from 'karet.util';
import * as L from 'partial.lenses';

export const slugIn = U.view('slug');
export const nameIn = U.view('name');
export const titleIn = U.view('title');
export const imagesIn = U.view('images');
export const firstImageIn = U.view(['images', L.first]);
export const coverImageIn =
  U.view(['file',
          'url',
          L.reread(x => `${x}?fm=jpg&q=40`)]);

export const albumsIn = U.view(['albums', L.valueOr([])]);

// Images

export const fileUrlIn = U.view(['file', 'url']);
export const lowQualityUrlIn = U.view(L.reread(x => `${x}?fm=jpg&q=60`))
