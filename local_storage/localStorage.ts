import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
    // maximum capacity, default 1000 key-ids
    size: 1000,

    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage

    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: 1000 * 3600 * 24,

    // cache data in the memory. default is true.
    enableCache: false,
});

export default {
    saveStorage: (keyName: string, value: string) => {
        storage.save({
            key: keyName,
            data: value
        });
    },

    getStorage: (keyName: string) => {
        storage.load({
            key: keyName,
            autoSync: true,
            syncInBackground: true
        }).then((data) => {
            return data
        }).catch(error => {
            console.log(`Error is ${error}`)
            return ""
        })
    },

    removeStorage: (keyName: string) => {
        storage.remove({
            key: keyName
        });
    },
}
