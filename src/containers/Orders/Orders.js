import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import {withRouter} from "react-router-dom";
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    async componentDidMount() {
        await this.getOrders();
    }
    getOrders=()=>{
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }
    deleteOrderHandler=(id)=>{
        //this.setState({loading: true});
        axios.delete("/orders/"+id+".json")
            .then(response=>{
                console.log(response);
                let orders=[...this.state.orders];
                let updatedOrders=orders.filter(order=>order.id!==id);
                this.setState({orders:updatedOrders});
                //this.setState({loading: false});
              //this.getOrders();
            })
            .catch(error=>{
                console.log(error);
                //this.setState({loading: false});
            });
    }
    render () {
        return (
            <div>
                {this.state.loading?
                    <Spinner/>
                    :
                    this.state.orders.map(order => (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                            delete={()=>this.deleteOrderHandler(order.id)}
                        />
                    ))
                }
            </div>
        );
    }
}

export default withRouter(withErrorHandler(Orders, axios));
