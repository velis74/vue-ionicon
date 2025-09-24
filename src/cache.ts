export type ResolvedIconGetResponse = { data: string };
export type IconGetResponse = Promise<{ data: string }>;
export type IconDefOrPromise = string | IconGetResponse;

class Cache {
  private cache: { [key: string]: IconDefOrPromise };

  constructor() {
    this.cache = {};
  }

  get(key: string) { return this.cache[key]; }

  set(key: string, value: IconDefOrPromise) { this.cache[key] = value; }

  clear() {
    for (const prop of Object.getOwnPropertyNames(this.cache)) {
      delete this.cache[prop];
    }
  }
}

export const globalCache = new Cache();
