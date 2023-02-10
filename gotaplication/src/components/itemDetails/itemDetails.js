import React, {Component} from 'react';
import styled from "styled-components";

const CharDetailsBlock = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
`;

const CharDetailsTitle = styled.h4`
  margin-bottom: 20px;
  text-align: center;
`;

const SelectError = styled.span`
  color: #fff;
  text-align: center;
  font-size: 26px;
`;

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
};

export default class ItemDetails extends Component {

    state = {
        item: null
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const {itemId, getData} = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({item})
            })
    }

    render() {
        if (!this.state.item) {
            return <span className='select-error'>Please select item in the list</span>
        }
        const {item} = this.state;
        const {name} = item;

        return (
            <CharDetailsBlock className="rounded">
                <CharDetailsTitle>{name}</CharDetailsTitle>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </CharDetailsBlock>
        );
    }
}