import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from "../errorMessage";
import GotService from "../../services/gotService";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import styled from 'styled-components';
import {BooksItem, BooksPage, CharacterPage, HousesPage} from '../pages';

const ToggleButton = styled.button`
  padding: 12px;
  background-color: #1e2edb;
  border: none;
  border-radius: 4px;
  color: #fff;
  margin-bottom: 40px;
  outline: none;
  box-shadow: 0px 0px 30px rgba(256, 256, 256, .1);
  cursor: pointer;
`;

export default class App extends Component {

    gotService = new GotService();

    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    };

    render() {

        const char = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
                <div className='app'>
                    <Container>
                        <Header/>
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <ToggleButton
                                    onClick={this.toggleRandomChar}>Toggle random character</ToggleButton>
                            </Col>
                        </Row>
                        <Route path='/' exact component={() => <h1>Welcome to GOT DB</h1>}/>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousesPage}/>
                        <Route path='/books' exact component={BooksPage}/>
                        <Route path='/books/:id' render={({match}) => {
                            const {id} = match.params;
                            return <BooksItem bookId={id}/>
                        }}/>
                    </Container>
                </div>
            </Router>
        )
    }
}