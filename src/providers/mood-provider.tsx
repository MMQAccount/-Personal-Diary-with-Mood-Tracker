// src/contexts/MoodContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchMoods } from "../services/mood.service";
import { toast } from "react-toastify";

interface MoodContextType {
    moods: IMood[];
    setMoods: React.Dispatch<React.SetStateAction<IMood[]>>;
    refreshMoods: () => Promise<void>;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [moods, setMoods] = useState<IMood[]>([]);

    const refreshMoods = async () => {
        try {

            const fetched: IMood[] = await fetchMoods();
            setMoods(fetched);
        } catch (error: any) {
            toast.error(error)
        }
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
