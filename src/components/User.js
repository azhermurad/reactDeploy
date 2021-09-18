import React, { Component } from "react";
import axios from "axios";
import RepoItem from "./RepoItem";
import "./css/User.css";
export default class User extends Component {
  state = {
    repos: [],
    user: {},
  };
  async componentDidMount() {
    const username = this.props.params.username;

    const data = await Promise.all([
      axios.get(
        `https://api.github.com/users/${username}/repos?page=1&per_page=5`
      ),
      axios.get(`https://api.github.com/users/${username}`),
    ]);
    this.setState({ repos: data[0].data, user: data[1].data });
  }
  render() {
    return (
      <>
        {/* {JSON.stringify(this.state.user, null, 2)} */}

        <div className="userContainer">
          <h1>{this.state.user.login}</h1>
          <h2>{this.state.user.name}</h2>
          <h2>Public Gists: {this.state.user.public_gists}</h2>
          <h2>Location: {this.state.user.location}</h2>{" "}
          <h2>Public Repos: {this.state.user.public_repos}</h2>
        </div>
        <div className="repoContainer">
          {this.state.repos?.map((repo) => {
            return (
              <RepoItem
                fullName={repo.full_name}
                link={repo.html_url}
                repoName={repo.name}
              />
            );
          })}
        </div>
        {/* {JSON.stringify(this.state.repos, null, 2)} */}
      </>
    );
  }
}
