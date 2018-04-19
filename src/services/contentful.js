import { createClient } from 'contentful';
import { fromPromise } from 'kefir';
import { space, accessToken } from '../auth';

const client = createClient({ space, accessToken });

export const getEntry = (id, q) => fromPromise(client.getEntry(id, q));
export const getEntries = q => fromPromise(client.getEntries(q));
export const getContentType = q => fromPromise(client.getContentType(q));
export const getContentTypes = q => fromPromise(client.getContentTypes(q));

