import * as L from 'partial.lenses';

export const imageL =
  L.pick({ title: ['fields', 'title'],
           file: ['fields', 'file'],
           id: ['sys', 'id'],
           createdAt: ['sys', 'createdAt'] });

export const albumL =
  ['fields',
    L.pick({ title: 'title',
             public: 'public',
             slug: 'slug',
             images: ['images', L.array(imageL)] })];
