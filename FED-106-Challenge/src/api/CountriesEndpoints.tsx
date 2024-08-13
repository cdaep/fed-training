import fetchFromApi from "./CountriesService";
import { Country } from "./CountryModel";

// Function to get all countries
export const getAllCountries = async (
  fields?: string[]
): Promise<Country[]> => {
  return fetchFromApi("all", fields);
};

// Function to get a country by cca3 code
export const getCountryByCCA3 = async (
  cca3: string,
  fields?: string[]
): Promise<Country> => {
  return fetchFromApi(`alpha/${cca3}`, fields);
};

// Function to get a border countries by cca3 codes
export const getBorderCountries = async (
  cca3Codes: string[],
  fields?: string[]
): Promise<Country[]> => {
  const codesParam = cca3Codes.join(",");
  const endpoint = `alpha?codes=${codesParam}`;
  return fetchFromApi(endpoint, fields);
};
