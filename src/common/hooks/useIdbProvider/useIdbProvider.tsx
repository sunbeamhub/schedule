import { IdbProvider, IdbProviderProps } from 'common/interface';
import { openDB } from 'idb';
import { useEffect, useState } from 'react';
import { Cache } from 'swr';

async function createIdbProvider<Data>({
  dbName,
  storeName,
  version,
}: IdbProviderProps) {
  const db = await openDB(dbName, version, {
    upgrade(database) {
      if (!database.objectStoreNames.contains(storeName)) {
        database.createObjectStore(storeName);
      }
    },
  });
  let cursor = await db.transaction(storeName, 'readwrite').store.openCursor();
  const map = new Map();

  while (cursor) {
    map.set(cursor.key, cursor.value);
    cursor = await cursor.continue();
  }

  return (cache: Readonly<Cache<Data>>): Cache<Data> => ({
    delete: (key: string) => {
      if (map.delete(key) && !key.startsWith('$')) {
        db.delete(storeName, key);
      }
    },
    get: (key: string) => map.get(key),
    set: (key: string, value: Data) => {
      map.set(key, value);

      if (!key.startsWith('$')) {
        db.put(storeName, value, key);
      }
    },
  });
}

function useIdbProvider<Data = Object>({
  dbName,
  storeName,
  version,
}: IdbProviderProps) {
  const [idbProvider, setIdbProvider] = useState<IdbProvider>();

  useEffect(() => {
    createIdbProvider<Data>({ dbName, storeName, version }).then((value) => {
      setIdbProvider(() => value);
    });
  }, [dbName, storeName, version]);

  return { idbProvider };
}

export default useIdbProvider;
