export interface Country {
  flags: Flags;
  name: {
    common: string;
    official: string;
    nativeName: NativeName;
  };
  tld: string[];
  cca3: string;
  currencies: Currency;
  capital: string[];
  region: string;
  subregion: string;
  languages: {
    [key: string]: string;
  };
  population: number;
  borders: string[];
}

interface Flags {
  png: string;
  svg: string;
  alt: string;
}

interface NativeName {
  [key: string]: {
    official: string;
    common: string;
  };
}

interface Currency {
  [key: string]: {
    name: string;
    symbol: string;
  };
}

// Access First key
export const accessFirstKeyNativeName = (
  nativeName: NativeName
): { common: string } | undefined => {
  const keys = Object.keys(nativeName);
  if (keys.length > 0) {
    const firstKey = keys[0];
    return nativeName[firstKey];
  }
  return undefined;
};
