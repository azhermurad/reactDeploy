import React, { Component } from "react";
import Card from "./Card";
import PropTypes from "prop-types";
import "./css/Dashboard.css";
import axios from "axios";
import Loading from "../images/loading.gif";
export default class Dashboard extends Component {
  state = {
    query: "",
    users: null,
    error: false,
    loading: true,
  };

  componentDidMount() {
    const getUsers = async () => {
      try {
        const res = await axios.get("https://api.github.com/users");
        this.setState({ users: res.data, loading: false });
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }
  componentWillUnmount() {
    this.setState({ users: null });
  }
  handleSearch = async (ev) => {
    ev.preventDefault();

    try {
      if (this.state.query === "") {
        this.setState({ error: true });
        setTimeout(() => {
          this.setState({ error: false });
        }, 5000);
        return;
      }

      this.setState({ loading: true });
      const res = await axios.get(
        `https://api.github.com/search/users?q=${this.state.query}`
      );

      this.setState({ users: res.data.items, loading: false });
    } catch {
      console.log("Error");
    }
  };
  render() {
    return (
      <>
        <h2>Dashboard</h2>
        <div className="searchBar">
          <form onSubmit={this.handleSearch}>
            <input
              className={
                this.state.error ? "search_input input_error" : "search_input"
              }
              value={this.state.query}
              onChange={(ev) => {
                this.setState({ query: ev.target.value });
              }}
              type="text"
              placeholder="Enter a keyword to search..."
            ></input>
          </form>
        </div>
        <div className="dashboardContainer">
          {this.state.loading ? (
            <img className="loadingImage" src={Loading} alt="Loading" />
          ) : (
            this.state.users
              ?.filter((user) => {
                return user.login.startsWith(this.state.query);
              })
              .map((user) => {
                return (
                  <Card
                    avatar_url={user.avatar_url}
                    login={user.login}
                    github_link={user.html_url}
                  />
                );
              })
          )}
        </div>
      </>
    );
  }
}
// Dashboard.propTypes = { users: PropTypes.object.isRequired };
