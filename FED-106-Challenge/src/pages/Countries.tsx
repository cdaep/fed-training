// Countries.tsx
import React, { useState, useEffect } from "react";

// Import Tailwind CSS base styles
import "tailwindcss/tailwind.css";

// Import api related stuff
import { Country } from "../api/CountryModel";
import { getAllCountries } from '../api/CountriesEndpoints'; 

// Import components
import Navigation from "../components/Navigation/NavigationBar"
import { NavigationVariant } from "../enums/NavigationVariant";
import { useColor } from "../components/ColorMode/ColorMode";
import { useLocation, useNavigate } from "react-router-dom";
import InformationRow from "../components/Information/InformationRow";

const Countries: React.FC = () => {
  const {textColor, otherBgColor } = useColor();
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const filter = query.get('filter') || "";
    const region = query.get('region') || selectedRegion || "";

    setSearchQuery(filter);
    setSelectedRegion(region);
  }, [location.search, selectedRegion]);


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const fields = ['name', 'population', 'region', 'capital', 'flags', 'cca3'];
        const data =  await getAllCountries(fields);

        let filteredData = data;

        // Apply search query filter
        if (searchQuery) {
          filteredData = filteredData.filter(country =>
            country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        // Apply region filter
        if (selectedRegion) {
          filteredData = filteredData.filter(country =>
            country.region === selectedRegion
          );
        }

        const sortedData = filteredData.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedData);
        // console.log(data);
      } catch (error) {
        console.log('Error fetching countries.');
      }
    };
    fetchCountries();
  }, [searchQuery, selectedRegion]);

  // Navigate to the route with cca3 parameter
  const handleImageClick = (cca3: string) => {
    navigate(`/country/${cca3}`); 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    const query = new URLSearchParams({ filter: newValue, ...(selectedRegion && { region: selectedRegion }),
    }).toString();
    navigate(`?${query}`, { replace: true });
    console.log(query)
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const query = new URLSearchParams({ filter: searchQuery, ...(selectedRegion && { region: selectedRegion }),
    }).toString();
      navigate(`?${query}`, { replace: true });
    }
  };

  const handleFilterChange = (region: string) => {
    setSelectedRegion(region);
    const query = new URLSearchParams({ filter: searchQuery,region,
    }).toString();
    navigate(`?${query}`, { replace: true });
  };

  return (
    <div>
      <Navigation query={searchQuery} variant={NavigationVariant.Main} onInputChange={handleInputChange} onKeyPress={handleKeyPress} onFilterChange={handleFilterChange}/>
      <main className="pt-10 px-custom-7rem lg:w-[100vw] md:w[100vw] max-xs:w-[100vw]">
        <div className="flex flex-wrap">
          {countries.length > 0 ? (
            countries.map((country, index) => (
              <div key={index}  className="bg-transparent mb-4 pb-10 pl-12 pr-custom-4rem 2xl:w-[25%] xl:w-[25%] lg:w-[50%] md:w-[50%] sm:w-[100vw] max-xs:px-0 max-xs:w-[100vw] ">
                <div
                  onClick={() => handleImageClick(country.cca3)} 
                  className={`${otherBgColor} ${textColor} text-center shadow-custom rounded w-full h-[19rem] cursor-pointer`}
                >
                  {/* Image Section */}
                  <div className="w-full h-custom-10rem overflow-hidden">
                    <img
                      src={country.flags.svg}
                      alt={`Flag of ${country.name.common}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Text Section */}
                  <div className="p-4">
                    <div className="text-left">
                      <p className="font-nunito-sans font-bold text-base pb-2">
                        {country.name.common}
                      </p>
                    </div>
                    <div className="flex flex-col font-nunito-sans text-sm">
                      <InformationRow label="Population: " value={country.population.toLocaleString()} />
                      <InformationRow label="Region: " value={country.region} />
                      <InformationRow label="Capital: " value={country.capital[0]} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-[3.5rem] justify-center">
            <p className="font-nunito-sans font-bold text-center text-base">No countries found.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Countries;

