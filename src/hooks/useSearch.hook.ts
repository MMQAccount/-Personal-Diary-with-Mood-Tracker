import { useContext, useState } from "react";
import { DiaryContext } from "../providers/diary-provider";

const useSearch = () => {

    const [searchResults, setSearchResults] = useState<Store.IDiaryItem[]>([]);
    const { diary } = useContext(DiaryContext);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.toLowerCase();
        if (!val.trim()) {
            setSearchResults([]);
            return;
        }

        const filtered = diary.filter(d =>
            d.title.toLowerCase().includes(val) || d.notes.toLowerCase().includes(val)
        );
        setSearchResults(filtered);
    };

    return {
        handleSearch,
        searchResults
    }
}
export default useSearch;