export class SimpleCache<T = any> {
    private store = new Map<string, { data: T; expires: number }>();

    set(key: string, data: T, ttlMs: number) {
        const expires = Date.now() + ttlMs;
        this.store.set(key, { data, expires });
    }

    get(key: string): T | null {
        const record = this.store.get(key);
        if (!record) return null;

        if (Date.now() > record.expires) {
            this.store.delete(key);
            return null;
        }

        return record.data;
    }

    delete(key: string) {
        this.store.delete(key);
    }

    clear() {
        this.store.clear();
    }
}

