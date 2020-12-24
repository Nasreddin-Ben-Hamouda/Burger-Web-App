import React from "react"
import Aux from "../../hoc/Aux"
import classes from "./Layout.module.css"
const layout=(props)=>(
    <Aux>
        <h1>layout here</h1>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);
export default layout;
