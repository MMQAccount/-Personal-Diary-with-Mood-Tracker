import { useContext, useState } from "react";
import { DiaryContext } from "../providers/diary-provider";

const useSearchByMood = () => {

    const [searchResultsByMood, setSearchResultsByMood] = useState<Store.IDayDiary[]>([]);
    const { diary } = useContext(DiaryContext);

    const handleSearchByMood = (mood: number) => {
        if (mood != 0 && mood != 1 && mood != 2 && mood != 3 && mood != 4) {
            setSearchResultsByMood([]);
            return;
        }
        const filtered = diary.filter(d =>
            d.state === mood
        );
        if (filtered)
            setSearchResultsByMood(filtered);
        else
            setSearchResultsByMood([]);
    };

    return {
        handleSearchByMood,
        searchResultsByMood
    }
}
export default useSearchByMood;