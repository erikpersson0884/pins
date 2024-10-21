import React, { createContext, useState } from 'react';

import { Pin } from '../../types';

// Create the context
const PinsContext = createContext<{ pins: Pin[], setPins: React.Dispatch<React.SetStateAction<Pin[]>> }>({
    pins: [],
    setPins: () => { }
});

// Create a provider component
const PinsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [pins, setPins] = useState<Pin[]>([]);

    return (
        <PinsContext.Provider value={{ pins, setPins }}>
            {children}
        </PinsContext.Provider>
    );
};

export { PinsContext, PinsProvider };