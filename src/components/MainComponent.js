import React, {Component} from 'react';
import {Container} from 'reactstrap';
import MenuComponent from "./MenuComponent";
import DishDetailComponent from "./DishDetailComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
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
                <HeaderComponent />
                <Container>
                    <MenuComponent
                        dishes={this.state.dishes}
                        onClick={(dishId) => this.onDishSelect(dishId)}
                    />
                    <DishDetailComponent dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
                </Container>
                <FooterComponent />
            </div>
        );
    }
}

export default MainComponent;
