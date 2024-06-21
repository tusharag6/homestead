import { FC, ReactNode, createContext, useState } from "react";

interface FilterContextProps {
  isGridMode: boolean;
  toggleGridMode: () => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isGridMode, setIsGridMode] = useState<boolean>(false);

  const toggleGridMode = () => {
    setIsGridMode(!isGridMode);
  };

  return (
    <FilterContext.Provider value={{ isGridMode, toggleGridMode }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
