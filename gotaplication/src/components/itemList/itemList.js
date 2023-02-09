import React, {Component} from 'react';
import './itemList.css';
import Spinner from "../spinner";


export default class ItemList extends Component {

    state = {
        itemList: []
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then( (itemList) => {
                this.setState({
                    itemList
                });
            });
    }

     renderItems(arr) {
        return arr.map((item) => {
            return (
                <li
                    key={item.id}
                    className="list-group-item"
                    onClick={ () => this.props.onCharSelected(item.id)}
                >
                    {item.name}
                </li>
            )
        });
     }

    render() {
        const {itemList} = this.state;

        if (this.state.itemList.length === 0) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}