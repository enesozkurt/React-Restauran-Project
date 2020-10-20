import React, {Component} from 'react';
import {
    Navbar,
    NavbarBrand,
    Container
} from 'reactstrap';
import MenuComponent from "./MenuComponent";
import DishDetailComponent from "./DishDetailComponent";
import { dishes } from "../shared/dishes";

class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: dishes,
            selectedDish: null
        }
    }
    onDishSelect(dishId) {
        this.setState({
            selectedDish: dishId
        })
    }
    render(){
        return (
            <div>
                <Navbar dark color="primary" expand="md">
                    <div className="container">
                        <NavbarBrand href="/" >Restaurant</NavbarBrand>
                    </div>
                </Navbar>
                <Container>
                <MenuComponent
                    dishes={this.state.dishes}
                    onClick={(dishId) => this.onDishSelect(dishId)}
                />
                <DishDetailComponent dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
                </Container>
            </div>
        );
    }
}

export default MainComponent;
