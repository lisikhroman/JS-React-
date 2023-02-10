import React, {Component} from 'react';
import './randomChar.css';
import GotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";
import styled from 'styled-components';
import PropTypes from 'prop-types';

const RandomBlock = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
`;

const RandomBlockHeader = styled.h4`
  margin-bottom: 20px;
  text-align: center;
`;

const Term = styled.span`
  font-weight: bold;
`;

export default class RandomChar extends Component {

    static defaultProps = {
        interval: 15000
    }
    gotService = new GotService();
    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateCharacter();
        this.timerId = setInterval(this.updateCharacter, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
        });
    }

    updateCharacter = () => {
        const id = Math.floor(Math.random() * 140 + 25);
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    render() {

        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <RandomBlock className="rounded">
                {errorMessage}
                {spinner}
                {content}
            </RandomBlock>
        );
    }
}

RandomChar.propTypes = {
    interval: PropTypes.number
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;

    return (
        <>
            <RandomBlockHeader>Random Character: {name}</RandomBlockHeader>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Gender </Term>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Born </Term>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Died </Term>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Culture </Term>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}
