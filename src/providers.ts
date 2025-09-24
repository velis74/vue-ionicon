export type IconProvidersRegistry = Record<string, (name: string) => string>;

export const iconProviders: IconProvidersRegistry = {
  ion: (name: string) => `https://cdn.jsdelivr.net/npm/ionicons@latest/dist/svg/${name}.svg`,
  mdi: (name: string) => `https://cdn.jsdelivr.net/npm/@mdi/svg@latest/svg/${name}.svg`,
  fa: (name: string) => `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@latest/svgs/solid/${name}.svg`,
};

export function registerIconProvider(prefix: string, urlBuilder: (name: string) => string) {
  iconProviders[prefix] = urlBuilder;
}

/**
 * Returns URL for the prefixed icon name
 * @param name name of icon with provider prefix. if no provider is registered for the prefix (or there is no prefix)
 * it will return the name itself as we assume it's url to the icon
 */
export function resolveProviderUrl(name: string): string {
  const dashIndex = name.indexOf('-');
  if (dashIndex === -1) return name;
  const prefix = name.substring(0, dashIndex);
  const res = iconProviders[prefix];
  if (res == null) return name;
  const iconName = name.substring(dashIndex + 1);
  return res(iconName);
}
