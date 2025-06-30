import { useContext, useState } from "react";
import { DiaryContext } from "../providers/diary-provider";

const useSearchType = () => {

    const [searchResultsByType, setSearchResultsByType] = useState<Store.IDiaryItem[]>([]);
    const { diary } = useContext(DiaryContext);

    const handleSearchByType = (types:string[]) => {
        const val = types;
        if (!val.length) {
            setSearchResultsByType([]);
            return;
        }
        const filtered = diary.filter(d =>
            types.some(item => d.type.includes(item))
        );
        setSearchResultsByType(filtered);
    };

    return {
        handleSearchByType,
        searchResultsByType
    }
}
export default useSearchType;