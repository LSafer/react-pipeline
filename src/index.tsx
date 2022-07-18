import React, {createContext, ReactNode, useContext} from "react";

/**
 * The context holding the component to be rendered on {@link Pipe}.
 */
const PipeContext = createContext<ReactNode>(<></>);

/**
 * A provider providing the component to be rendered on {@link Pipe}.
 *
 * @since 1.0.0
 */
export function PipeProvider(props: {
    component: ReactNode,
    children: ReactNode
}) {
    return <PipeContext.Provider value={props.component}>
        {props.children}
    </PipeContext.Provider>;
}

/**
 * Return the component to be rendered on {@link Pipe}.
 *
 * @since 1.0.0
 */
export function usePipe() {
    return useContext(PipeContext);
}

/**
 * Render the next component in the pipeline.
 *
 * @since 1.0.0
 */
export function Pipe() {
    const pipe = usePipe();

    return <>{pipe}</>;
}

/**
 * Render the provided components with the last
 * component's pipe being the current pipe.
 *
 * Note: this component will add the current pipe
 * to the components list, enabling the last given
 * component to render the next component in the
 * parent pipeline.
 *
 * @since 1.0.0
 */
export function Pipeline(props: {
    components: ReactNode[]
}) {
    const pipe = usePipe();
    const [component, ...components] = props.components;

    return <PipeProvider
        component={<Piping components={[...components, pipe]} />}
        children={component}
    />;
}

/**
 * Render the provided components.
 *
 * Note: this component won't pass the current pipe.
 * If this was in another piping, The `<Pipe />` component
 * in this piping won't render the next component in the parent piping.
 *
 * @since 1.0.0
 */
export function Piping(props: {
    components: ReactNode[]
}) {
    const [component, ...components] = props.components;

    return <PipeProvider
        component={<Piping components={components} />}
        children={component}
    />;
}
