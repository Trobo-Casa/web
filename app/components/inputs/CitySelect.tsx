import React, { useState } from "react";
import Select from "react-select";
import useCities from "@/app/hooks/useCities";

interface CitySelectProps {
  value: any;
  onChange: (value: any) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({ value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: cities, loading: citiesLoading } = useCities(searchTerm);

  const handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, "");
    setSearchTerm(inputValue);
    return inputValue;
  };

  const handleCityChange = (value: any) => {
    onChange(value);
  };

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={cities}
        isLoading={citiesLoading}
        value={value}
        onChange={handleCityChange}
        onInputChange={handleInputChange}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CitySelect;
