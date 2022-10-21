import React, {createContext, ReactElement, ReactNode, useContext} from "react";

/**
 * The context holding the component to be rendered on {@link Pipe}.
 */
const PipeContext = createContext<ReactNode>(null);

export type PipeProviderProps = {
    component: ReactNode
    children: ReactNode
}

/**
 * A provider providing the component to be rendered on {@link Pipe}.
 *
 * @since 1.0.0
 */
export function PipeProvider(props: PipeProviderProps) {
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
 * A shortcut to pass {@code <Pipe />} as the children prop.
 *
 * @since 1.0.0
 */
export const pipe = {
    children: <Pipe />
};

export type PipelineProps = {
    components?: ReactNode[]
    children?: ReactElement | ReactElement[]
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
export function Pipeline(props: PipelineProps) {
    const {components = [], children = []} = props;
    const pipe = usePipe();

    return createPipeline([
        ...components,
        ...Array.isArray(children) ? children : [children]
    ], pipe);
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
    components?: ReactNode[]
    children?: ReactElement | ReactElement[]
    fallback?: ReactNode
}) {
    const {components = [], children = []} = props;

    return createPipeline([
        ...components,
        ...Array.isArray(children) ? children : [children]
    ], props.fallback);
}

/**
 * Create a pipeline component from the provided components.
 *
 * Note: this component won't pass the current pipe.
 * If this was in another piping, The `<Pipe />` component
 * in this piping won't render the next component in the parent piping.
 *
 * @since 1.1.0
 */
export function createPipeline(components: ReactNode[], fallback?: ReactNode) {
    const [currentComponent, ...nextComponents] = components;

    return <PipeContext.Provider
        value={nextComponents.length > 0 ? createPipeline(nextComponents, fallback) : fallback ?? null}
        children={currentComponent}
    />;
}
