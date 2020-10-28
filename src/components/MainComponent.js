import React, {Component} from 'react';
import {Container} from 'reactstrap';
import HomeComponent from "./HomeComponent";
import MenuComponent from "./MenuComponent";
import DishDetailComponent from "./DishDetailComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import ContactComponent from "./ContactComponent";
import AboutComponent from "./AboutComponent"

class MainComponent extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        const HomePage = () => {
            return (
                <HomeComponent
                    dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                    promotions={this.props.promotions.filter((promotions) => promotions.featured)[0]}
                    leaders={this.props.leaders.filter((leaders) => leaders.featured)[0]}
                />
            )
        }
        const DishWithId = ({match}) => {
            return(
                <DishDetailComponent dish={this.props.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]}
                                     comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                />
            )
        }
        return (
            <div>
                <HeaderComponent />
                <Container>
                    <Switch>
                        <Route path="/home" component={HomePage} />
                        <Route exact path="/menu" component={() => <MenuComponent dishes={this.props.dishes}/>} />
                        <Route path="/menu/:dishId" component={DishWithId}/>
                        <Route exact path="/contactus" component={ContactComponent } />
                        <Route exact path="/aboutus" component={() => <AboutComponent leaders={this.props.leaders} />} />
                        <Redirect to="/home" />
                    </Switch>
                </Container>
                <FooterComponent />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

export default withRouter(connect(mapStateToProps)(MainComponent));
