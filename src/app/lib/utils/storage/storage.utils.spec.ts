import { storage } from '@lib/utils';
import { StorageObjectType } from '@lib/utils/storage/storage.types';

describe('StorageUtils', () => {
    it('should store & retrieve item from local & session storage', () => {
        // LocalStorage
        storage.setItem(<StorageObjectType>'App/theme', 'dark');
        expect(storage.getItem(<StorageObjectType>'App/theme')).toBe('dark');

        // sessionStorage
        storage.setItem(<StorageObjectType>'App/theme', 'dark', { api: 'SessionStorage' });
        expect(storage.getItem(<StorageObjectType>'App/theme', { api: 'SessionStorage' })).toBe('dark');
    });

    it('should remove item from local & session storage', () => {
        // LocalStorage
        storage.setItem(<StorageObjectType>'App/theme', 'dark');
        expect(storage.getItem(<StorageObjectType>'App/theme')).toBe('dark');
        storage.removeItem(<StorageObjectType>'App/theme');
        expect(storage.getItem(<StorageObjectType>'App/theme')).toBeNull();

        // sessionStorage
        storage.setItem(<StorageObjectType>'App/theme', 'dark', { api: 'SessionStorage' });
        expect(storage.getItem(<StorageObjectType>'App/theme', { api: 'SessionStorage' })).toBe('dark');
        storage.removeItem(<StorageObjectType>'App/theme', { api: 'SessionStorage' });
        expect(storage.getItem(<StorageObjectType>'App/theme', { api: 'SessionStorage' })).toBeNull();
    });

    it('should clear all items from local & session storage', () => {
        // LocalStorage
        storage.clear();
        expect(localStorage.length).toBe(0);

        // sessionStorage
        storage.clear({ api: 'SessionStorage' });
        expect(localStorage.length).toBe(0);
    });
});
