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
    const pipe = usePipe()
    const [component, ...components] = props.components

    return <PipeProvider
        component={<Piping components={[...components, pipe]} />}
        children={component}
    />
}

export function Piping(props: {
    components: ReactNode[]
}) {
    const [component, ...components] = props.components

    return <PipeProvider
        component={<Piping components={components} />}
        children={component}
    />
}
