import * as React from 'karet';
import * as U from 'karet.util';

import './async-image.css';

const AsyncImage = ({ url, hideFn, ref = U.variable(), imageLoaded = U.variable() }) =>
  <div className={U.cns('async-image-overlay-shadow')}
    onClick={() => hideFn()}>
    <div className="async-image-overlay-content">
      <picture className={U.cns('async-image')}>
        {U.seq(ref,
          U.flatMapLatest(n => {
            const bus = U.bus();

            n.onload = () => {
              bus.push({ loaded: 'true' });
              bus.end();
            };

            return bus;
          }),
          U.toProperty,
          U.set(imageLoaded))}
        <img src={url} ref={U.refTo(ref)} />
      </picture>
    </div>
  </div>;

export default AsyncImage;

