import { dishes } from "../shared/dishes";
import { comments } from "../shared/comments";
import { leaders } from "../shared/leaders";
import { promotions } from "../shared/promotions";

export const initialState = {
    dishes: dishes,
    comments: comments,
    promotions: promotions,
    leaders: leaders
}

export const  Reducer = (state = initialState, action) => {
    return state;
};