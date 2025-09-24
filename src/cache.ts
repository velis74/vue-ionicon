export type ResolvedIconGetResponse = { data: string };
export type IconGetResponse = Promise<{ data: string }>;
export type IconDefOrPromise = string | IconGetResponse;

class Cache {
  private cache: { [key: string]: IconDefOrPromise };

  constructor() {
    this.cache = {};
  }

  check(key: string) {
    const res = this.cache[key];
    return !!res;
  }

  async get(key: string) {
    const res = this.cache[key];
    if (!res || typeof res === 'string') return res; // undefined & already loaded resource

    return (await res).data;
  }

  set(key: string, value: IconDefOrPromise) {
    this.cache[key] = value;
  }

  clear() {
    for (const prop of Object.getOwnPropertyNames(this.cache)) {
      delete this.cache[prop];
    }
  }
}

export const globalCache = new Cache();
