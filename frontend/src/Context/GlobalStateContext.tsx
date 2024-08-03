import React, { ReactNode, createContext, useContext, useState } from 'react'


interface GlobalState {
    isEnabled: boolean;
    setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

// ? create context with default values
const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

interface GlobalStateProviderProps {
    children : ReactNode;
}


// ? create provider component
export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({children}) => {
    const [isEnabled,setIsEnabled] = useState<boolean>(false)
    return(
        <GlobalStateContext.Provider value={{isEnabled,setIsEnabled}}>
            {children}
        </GlobalStateContext.Provider>
    )
}

// ? custom hook to use the context

export const useGlobalState = (): GlobalState => {
    const context = useContext(GlobalStateContext);
    if(context === undefined) {
        throw new Error("use globalstate within globalstateprovider")
    }
    return context
}