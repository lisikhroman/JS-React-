import React, {Component} from 'react';
import './itemList.css';
import Spinner from "../spinner";
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ItemListUl = styled.ul`
  cursor: pointer;
`;

const ItemListLi = styled.li`
  cursor: pointer;
`;

export default class ItemList extends Component {

    static defaultProps = {
        onItemSelected: () => {
        }
    }
    static propTypes = {
        onItemSelected: PropTypes.func
    }
    state = {
        itemList: null
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then((itemList) => {
                this.setState({
                    itemList
                })
            })
    }

    renderItems(arr) {
        return arr.map((item) => {

            const {id} = item;
            const label = this.props.renderItem(item);

            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        });
    }

    render() {
        const {itemList} = this.state;

        if (!itemList) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList);

        return (
            <ItemListUl className="list-group">
                {items}
            </ItemListUl>
        );
    }
}