
import React,{Suspense} from "react"
import Layout from './hoc/Layout/Layout';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Spinner from './components/UI/Spinner/Spinner'
import Orders from "./containers/Orders/Orders";
/*import Checkout from "./containers/Checkout/Checkout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";*/
const Checkout=React.lazy(()=>import('./containers/Checkout/Checkout'));
const BurgerBuilder=React.lazy(()=>import("./containers/BurgerBuilder/BurgerBuilder"));


function App() {
    return (
            <Router >
                <Layout>
                        <Switch>
                            {
                                /*<Route path="/" exact component={BurgerBuilder}/>
                                  <Route path="/orders" component={Orders} />
                                  <Route path="/checkout" exact component={Checkout}/>*/
                                /*  with this methode u can get the history
                                    object inside the component but with Suspense component
                                    u should export the component inside withRouter HOC component
                                 */
                            }
                            <Route path="/orders" component={Orders} />
                            <Route path="/" exact render={()=><Suspense fallback={<Spinner/>}><BurgerBuilder/></Suspense>}/>
                            <Route path="/checkout"  render={()=><Suspense fallback={<Spinner/>}><Checkout/></Suspense>}/>
                        </Switch>
                </Layout>
            </Router>

    );
}

export default App;
