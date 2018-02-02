import React, { Component } from 'react';
import './App.css';
import './ui-toolkit/css/nm-cx/main.css'
import { connect } from 'react-redux';
import { fetchUserData, switchView, createUser } from './state/actions';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
    }
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchUserData();
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleAddUser (e) {
    e.preventDefault()
    const UserObj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    }
    this.props.createUser(UserObj)
    this.setState({ firstName: '', lastName: '', email: ''})
  }

  render() {
    return (
      <div className="App">
        <div className="Row">
          <div className="medium-2 columns">&nbsp;</div>
          <div className="medium-8 columns">
            {this.props.currentView === 'list' &&
              <div>
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
                        <td>{Date(user.createdAt)}</td>
                        <td>Actions</td>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>
                <button id="add" onClick={this.props.switchView}>Add a new User</button>
              </div>
            }
            {this.props.currentView === 'add' &&
              <div>
                <h1>Add a New User</h1>
                <form>
                  <input type="text" placeholder='First Name' name="firstName" value={this.state.firstName} onChange={this.handleTextChange} />
                  <input type="text" placeholder='Last Name' name="lastName" value={this.state.lastName} onChange={this.handleTextChange} />
                  <input type="text" placeholder='Email' name="email" value={this.state.email} onChange={this.handleTextChange} />
                  <button id="create" onClick={this.handleAddUser.bind(this)}>Create</button>
                  <button id="list" onClick={() => {
                    this.props.switchView; 
                    this.setState({firstName: '', lastName: '', email: ''})
                  }}>Go Back</button>
                </form>
              </div>
            }
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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserData: () => dispatch(fetchUserData()),
    switchView: (e) => dispatch(switchView(e.target.id)),
    createUser: (UserObj) => dispatch(createUser(UserObj))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
