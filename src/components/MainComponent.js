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
import { addComment, fetchDishes, fetchComments, fetchPromos } from "../redux/ActionCreators";
import { actions } from "react-redux-form";

class MainComponent extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    render(){
        const HomePage = () => {
            return (
                <HomeComponent
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotions={this.props.promotions.promotions.filter((promotions) => promotions.featured)[0]}
                    promosLoading={this.props.promotions.isLoading}
                    promosErrMess={this.props.promotions.errMess}
                    leaders={this.props.leaders.filter((leaders) => leaders.featured)[0]}
                />
            )
        }
        const DishWithId = ({match}) => {
            return(
                <DishDetailComponent dish={this.props.dishes.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]}
                                     isLoading={this.props.dishes.isLoading}
                                     errMess={this.props.dishes.errMess}
                                     comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                                     commentsErrMess={this.props.comments.errMess}
                                     addComment={this.props.addComment}
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
                        <Route exact path="/contactus" component={() => <ContactComponent resetFeedbackForm={this.props.resetFeedbackForm} /> } />
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

const mapDispatchToProps = (dispatch) => ({
   addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));
