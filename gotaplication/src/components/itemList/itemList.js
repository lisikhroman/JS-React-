import React, {Component} from 'react';
import GotService from "../../services/gotService";
import './itemList.css';
import Spinner from "../spinner";


export default class ItemList extends Component {

    gotService = new GotService();

    state = {
        charList: []
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then( (charList) => {
                this.setState({
                    charList
                });
            });
    }

     renderItems(arr) {
        return arr.map((item, i) => {
            return (
                <li
                    key={i}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(41 + i)}
                >
                    {item.name}
                </li>
            )
        });
     }

    render() {
        const {charList} = this.state;

        // const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = !charList ? <Spinner/> : null;
        // const content = !(loading || error) ? <View char={char}/> : null;

        const items = this.renderItems(charList);

        return (
            <ul className="item-list list-group">
                {spinner}
                {items}
            </ul>
        );
    }
}