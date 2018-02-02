import React, { Component } from 'react';
import './App.css';
import './ui-toolkit/css/nm-cx/main.css'
import { connect } from 'react-redux';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Row">
          <div className="medium-2 columns">&nbsp;</div>
          <div className="medium-8 columns">
            <h1 className="header">User Dashboard</h1>
            <table className="table" summary="This summary is for screen readers and should summarize the structure of the table headers and rows">
              <caption className="show-for-sr">Basic Table</caption>
              <thead>
                <tr>
                  <th width="400">Name</th>
                  <th width="400">Email</th>
                  <th width="400">Created</th>
                  <th width="400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.props.users.map((user) => (                  
                  <tr key={user.id}>
                  <td>{user.firstName}<span> </span>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.createdAt}</td>
                  <td>Actions</td>
                </tr>
                ))
              }  
              </tbody>
            </table>
          </div>
          <div className="medium-2 columns">&nbsp;</div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    selectedUser: state.selectedUser,
    currentView: state.currentView
  }
}


export default connect(mapStateToProps)(App);
