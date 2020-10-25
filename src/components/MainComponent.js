import React, {Component} from 'react';
import {Container} from 'reactstrap';
import HomeComponent from "./HomeComponent";
import MenuComponent from "./MenuComponent";
import DishDetailComponent from "./DishDetailComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import { dishes } from "../shared/dishes";
import { comments } from "../shared/comments";
import { leaders } from "../shared/leaders";
import { promotions } from "../shared/promotions";
import { Switch, Route, Redirect } from "react-router-dom"
import ContactComponent from "./ContactComponent";
import AboutComponent from "./AboutComponent"

class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: dishes,
            comments: comments,
            promotions: promotions,
            leaders: leaders
        }
    }
    render(){
        const HomePage = () => {
            return (
                <HomeComponent
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotions={this.state.promotions.filter((promotions) => promotions.featured)[0]}
                    leaders={this.state.leaders.filter((leaders) => leaders.featured)[0]}
                />
            )
        }
        const DishWithId = ({match}) => {
            return(
                <DishDetailComponent dish={this.state.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]}
                                     comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                />
            )
        }
        return (
            <div>
                <HeaderComponent />
                <Container>
                    <Switch>
                        <Route path="/home" component={HomePage} />
                        <Route exact path="/menu" component={() => <MenuComponent dishes={this.state.dishes}/>} />
                        <Route path="/menu/:dishId" component={DishWithId}/>
                        <Route exact path="/contactus" component={ContactComponent } />
                        <Route exact path="/aboutus" component={() => <AboutComponent leaders={this.state.leaders} />} />
                        <Redirect to="/home" />
                    </Switch>
                </Container>
                <FooterComponent />
            </div>
        );
    }
}

export default MainComponent;
