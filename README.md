# React Pipeline Component

A component to declare really long nested components without going to component hell.

#### How to use

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
