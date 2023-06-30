interface CacheItem {
  data: any;
  expiration: number;
}

export class InternalCache {
  private cache: { [key: string]: CacheItem } = {};

  set(key: string, data: any, expirationTime: number): void {
    const expiration = Date.now() + expirationTime * 1000;
    this.cache[key] = { data, expiration };
  }

  get(key: string): any | null {
    const item = this.cache[key];
    if (item && item.expiration > Date.now()) {
      return item.data;
    }
    return null;
  }

  delete(key: string): void {
    delete this.cache[key];
  }

  cleanup(): void {
    const currentTime = Date.now();
    Object.keys(this.cache).forEach((key) => {
      if (this.cache[key].expiration <= currentTime) {
        this.delete(key);
      }
    });
  }

  clear(): void {
    this.cache = {};
  }

  getall(): any {
    return this.cache;
  }
}
