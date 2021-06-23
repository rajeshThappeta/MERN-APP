import {createContext} from 'react'

export const TestContext=createContext()

function TestContextProvider(props){
    return(
        <TestContext.Provider value={{x:100}}>
            {props.children}
        </TestContext.Provider>
    )
}

export default  TestContextProvider;