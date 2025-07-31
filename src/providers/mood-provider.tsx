// src/contexts/MoodContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchMoods } from "../services/mood.service";

interface MoodContextType {
    moods: IMood[];
    setMoods: React.Dispatch<React.SetStateAction<IMood[]>>;
    refreshMoods: () => Promise<void>;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [moods, setMoods] = useState<IMood[]>([]);

    const refreshMoods = async () => {
        const fetched: IMood[] = await fetchMoods();
        setMoods(fetched);
    };

    useEffect(() => {
        refreshMoods();
    }, []);

    return (
        <MoodContext.Provider value={{ moods, setMoods, refreshMoods }}>
            {children}
        </MoodContext.Provider>
    );
};

export const useMoods = () => {
    const context = useContext(MoodContext);
    if (!context) {
        throw new Error("useMoods must be used within a MoodProvider");
    }
    return context;
};
