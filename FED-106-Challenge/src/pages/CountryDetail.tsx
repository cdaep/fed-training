// CountryDetail.tsx
import React, { useState, useEffect } from "react";

// Import Tailwind CSS base styles
import "tailwindcss/tailwind.css";

// Import components

import Navigation from "../components/Navigation/NavigationBar";
import { useColor } from "../components/ColorMode/ColorMode";
import { NavigationVariant } from "../enums/NavigationVariant";
import InformationRow from "../components/Information/InformationRow";
import { useParams } from "react-router-dom";
import { Country, accessFirstKeyNativeName } from "../api/CountryModel";
import {
  getCountryByCCA3,
  getBorderCountries,
} from "../api/CountriesEndpoints";

const CountryDetail: React.FC = () => {
  const { textColor, otherBgColor } = useColor();
  const [country, setCountry] = useState<Country | null>(null);
  const [borderCountries, setBorderCountries] = useState<Country[]>([]);
  const { cca3 } = useParams<{ cca3: string }>();
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        if (cca3) {
          const fields = [
            "name",
            "population",
            "region",
            "subregion",
            "capital",
            "flags",
            "tld",
            "currencies",
            "borders",
            "languages",
          ];
          const countryData = await getCountryByCCA3(`${cca3}`, fields);
          setCountry(countryData);

          // Fetch border countries based on borders from the country data
          if (countryData.borders && countryData.borders.length > 0) {
            const borderNameField = ["name"]; // Adjust fields as needed
            const borderCountriesData = await getBorderCountries(
              countryData.borders,
              borderNameField
            );
            setBorderCountries(borderCountriesData);
          }
        }
      } catch (error) {
        console.log("Error fetching country details.");
        // setError('Error fetching country details.');
      }
    };

    fetchCountryData();
  }, [cca3]);

  if (!country) {
    return <div>Loading...</div>;
  }

  const getFirstNativeName = accessFirstKeyNativeName(country.name.nativeName);
  const getCurrencyNames = Object.keys(country.currencies)
    .map((key) => country.currencies[key].name)
    .join(", ");
  const getLanguages = Object.values(country.languages).join(", ");

  const leftColumnData = [
    { label: "Native Name:", value: getFirstNativeName?.common },
    { label: "Population:", value: country.population.toLocaleString() },
    { label: "Region:", value: country.region },
    { label: "Sub Region:", value: country.subregion },
    { label: "Capital:", value: country.capital[0] },
  ];

  const rightColumnData = [
    { label: "Top Level Domain:", value: country.tld },
    { label: "Currencies:", value: getCurrencyNames },
    { label: "Languages:", value: getLanguages },
  ];

  return (
    <div>
      <Navigation variant={NavigationVariant.Detail} />
      <main className="pt-12 px-[10rem] max-xs:px-[1rem]">
        <div
          className={`bg-transparent ${textColor} rounded w-full h-50% flex gap-[5rem] max-xs:flex-col max-xs:gap-[2rem]`}
        >
          {/* Image section */}
          <div className="lg:w-[50%] h-full md:w-[50%] sm:w-[50%] max-xs:w-full ">
            <img
              src={country.flags.svg}
              alt="Flag"
              className="w-[60rem] h-[25rem] lg:w-50% md:w-50% max-xs:h-[50%]  lg:object-cover sm:object-contain  max-xs:object-cover "
            />
          </div>

          {/* Text section */}
          <div className="flex-1 p-4 text-left flex flex-col justify-center">
            <p className="font-nunito-sans font-bold text-xl pb-3">
              {country.name.common}
            </p>
            <div className="flex flex-row font-nunito-sans text-sm gap-[10rem] sm:gap-[3rem] max-xs:flex-col max-xs:gap-[3rem]">
              <div>
                {leftColumnData.map((item, index) => (
                  <InformationRow
                    key={index}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>
              <div>
                {rightColumnData.map((item, index) => (
                  <InformationRow
                    key={index}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>
            </div>
            <div className="font-nunito-sans flex flex-col items-start pt-8 text-sm ">
              <div className="flex items-center 2xl:flex-row xl:flex-row sm:flex-col sm:items-start sm:gap-[1rem] max-xs:flex-col max-xs:items-start max-xs:gap-[1rem]">
                <p className="font-normal gap mr-6 whitespace-nowrap">
                  Border Countries:
                </p>
                <div className="flex flex-wrap gap-5 max-xs:gap-3">
                  {borderCountries.length > 0 ? (
                    borderCountries.map((country, index) => (
                      <div
                        key={index}
                        className={`${otherBgColor} inline-flex justify-center min-w-[5rem] max-w-[15rem] font-light shadow-custom p-2 rounded text-center`}
                      >
                        <p className="whitespace-nowrap">
                          {country.name?.common}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="font-light">No border countries available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CountryDetail;
