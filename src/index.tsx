import React, {createContext, ReactNode, useContext} from "react";

const PipeContext = createContext<ReactNode>(<></>)

export function PipeProvider(props: {
    component: ReactNode,
    children: ReactNode
}) {
    return <PipeContext.Provider value={props.component}>
        {props.children}
    </PipeContext.Provider>
}

export function usePipe() {
    return useContext(PipeContext)
}

export function Pipe(props: {}) {
    const pipe = usePipe()

    return <>{pipe}</>
}

export function Pipeline(props: {
    components: ReactNode[]
}) {
    const [component, ...components] = props.components

    return <PipeProvider
        component={<Pipeline components={components} />}
        children={component}
    />
}
