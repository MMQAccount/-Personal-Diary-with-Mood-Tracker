import { useContext, useState } from "react";
import { DiaryContext } from "../providers/diary-provider";

const useSearchType = () => {
  const [searchResultsByType, setSearchResultsByType] = useState<Store.IDayDiary[]>([]);
  const { diary } = useContext(DiaryContext);

  const handleSearchByType = (types: string[]) => {
    if (!types.length) {
      setSearchResultsByType([]);
      return;
    }

    const filtered = diary.filter(d =>
      d.type?.some(t => types.includes(t))
    );

    setSearchResultsByType(filtered);
  };

  return {
    handleSearchByType,
    searchResultsByType,
  };
};

export default useSearchType;
