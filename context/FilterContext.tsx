import { ReactNode, createContext, useEffect, useState } from "react";

interface FilterContextProps {
  isGridMode: boolean;
  toggleGridMode: () => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  useEffect(() => {}, []);

  const [isGridMode, setIsGridMode] = useState<boolean>(false);

  const toggleGridMode = () => {
    setIsGridMode((prev) => !prev);
  };

  return (
    <FilterContext.Provider value={{ isGridMode, toggleGridMode }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
