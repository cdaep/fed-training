// CountriesService.tsx

const API_COUNTRIES_BASE_URL = "https://restcountries.com/v3.1";

const fetchFromApi = async (
  endpoint: string,
  fields?: string[],
): Promise<any> => {
  const urlParams = new URLSearchParams();

  // append if there are specific fields given
  if (fields && fields.length > 0) {
    urlParams.append("fields", fields.join(","));
  }

  //example: https://restcountries.com/v3.1/alpha/AFG?fields=name 
  // or https://restcountries.com/v3.1/alpha/AFG?codes=IRN,PAK?fields=name 
  const url = `${API_COUNTRIES_BASE_URL}/${endpoint}${
    urlParams.toString() ? "?" + urlParams.toString() : ""
  }`;
  
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  return response.json();
};

export default fetchFromApi;
