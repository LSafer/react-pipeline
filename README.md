# React Pipeline Component

A component to declare really long nested components without going to component hell.

#### How to use

This code:

```tsx
import {SomethingProvider, Something} from './something';
import {OtherthingProvider, Otherthing} from './otherthing';
import {ComplexProvider, Complex} from './complex';
import {MyLayout} from './layout';

function MyApp() {
    const mySomething = new Something()
    const myOtherthing = new Otherthing()
    const myFirstComplex = new Complex()
    const mySecondComplex = new Complex()

    return <SomethingProvider something={mySomething}>
        <OtherthingProvider otherthing={myOtherthing}>
            <Complex complex={myFirstComplex}>
                <Complex complex={mySecondComplex}>
                    {/* Ouch, too deep! */}
                    <MyLayout />
                </Complex>
            </Complex>
        </OtherthingProvider>
    </SomethingProvider>
}
```

Can be transformed into:

```tsx
import {Pipeline, Pipe} from "react-pipeline-component";
import {SomethingProvider, Something} from './something';
import {OtherthingProvider, Otherthing} from './otherthing';
import {ComplexProvider, Complex} from './complex';
import {MyLayout} from './layout';

function MyApp() {
    const mySomething = new Something()
    const myOtherthing = new Otherthing()
    const myFirstComplex = new Complex()
    const mySecondComplex = new Complex()

    return <Pipeline components={[
        // You can write your providers in one line for each provider
        <SomethingProvider something={mySomething} children={<Pipe />} />,
        <OtherthingProvider otherthing={myOtherthing} children={<Pipe />} />,
        // or you could nest some and keep the rest oneliners
        <Complex complex={myFirstComplex}>
            <Complex complex={mySecondComplex}>
                {/* Pipe holds the next component in the list */}
                <Pipe />
            </Complex>
        </Complex>,
        // now your main component can be written with less indentation
        <MyLayout />
    ]} />
}
```

Alternatively, you can write it this way:

```tsx
import {Pipeline, Pipe, pipe} from "react-pipeline-component";
import {SomethingProvider, Something} from './something';
import {OtherthingProvider, Otherthing} from './otherthing';
import {ComplexProvider, Complex} from './complex';
import {MyLayout} from './layout';

function MyApp() {
    const mySomething = new Something()
    const myOtherthing = new Otherthing()
    const myFirstComplex = new Complex()
    const mySecondComplex = new Complex()

    return <Pipeline>
        {/* You can write your providers in one line for each provider */}
        <SomethingProvider something={mySomething} {...pipe} />
        <OtherthingProvider otherthing={myOtherthing} {...pipe} />
        {/* or you could nest some and keep the rest oneliners */}
        <Complex complex={myFirstComplex}>
            <Complex complex={mySecondComplex}>
                {/* Pipe holds the next component in the list */}
                <Pipe />
            </Complex>
        </Complex>
        {/* now your main component can be written with less indentation */}
        <MyLayout />
    </Pipeline>
}
```

As you can see, the constant `pipe` is alternative to writing `<Pipe />`

```tsx
<Component children={<Pipe />} />
```

```tsx
<Component {...pipe} />
```

Also, passing your components as an array is alternative to passing them as children

```tsx
<Pipeline components={[
    <Component children={<Pipe />} />,
    <Component children={<Pipe />} />,
]} />
```

```tsx
<Pipeline>
    <Component children={<Pipe />} />
    <Component children={<Pipe />} />
</Pipeline>
```
