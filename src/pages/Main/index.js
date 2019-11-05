import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { Container, Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    respositories: [],
    loading: false,
  };

  // Carregar dados do localstorage
  componentDidMount() {
    const respositories = localStorage.getItem('repositories');

    if (respositories) {
      this.setState({ respositories: JSON.parse(respositories) });
    }
  }

  // Salvar os dados do localstorage
  componentDidUpdate(_, prevState) {
    const { respositories } = this.state;

    if (prevState.respositories !== respositories) {
      localStorage.setItem('repositories', JSON.stringify(respositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, respositories } = this.state;

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    this.setState({
      respositories: [...respositories, data],
      newRepo: '',
      loading: false,
    });
  };

  render() {
    const { newRepo, respositories, loading } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {respositories.map(respository => (
            <li key={respository.name}>
              <span>{respository.name}</span>
              <Link to={`/repository/${encodeURIComponent(respository.name)}`}>
                DetLinklhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
