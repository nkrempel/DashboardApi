import React, { Component } from 'react'
import './App.css'
import './ui-toolkit/css/nm-cx/main.css'
import { connect } from 'react-redux'
import {
  fetchUserData,
  switchView,
  createUser,
  selectUser,
  deleteUser
} from './state/actions'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleShowUser = this.handleShowUser.bind(this)
  }

  componentDidMount () {
    this.props.fetchUserData()
  }

  handleTextChange (e) {
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
    this.setState({ firstName: '', lastName: '', email: '' })
  }

  handleShowUser (e) {
    e.preventDefault()
    console.log(e)
    this.props.selectUser(e.target.id)
    this.props.showUser('show')
  }

  render () {
    return (
      <div className='App'>
        <div className='Row'>
          <div className='medium-2 columns'>&nbsp;</div>
          <div className='medium-8 columns'>

            {/*   This is the "LIST" Render     */}
            {this.props.currentView === 'list' &&
              <div>
                <h1 className='header'>User Dashboard</h1>
                <table
                  className='table'
                  summary='This summary is for screen readers and should summarize the structure of the table headers and rows'
                >
                  <caption className='show-for-sr'>Basic Table</caption>
                  <thead>
                    <tr>
                      <th width='400'>Name</th>
                      <th width='400'>Email</th>
                      <th width='400'>Created</th>
                      <th width='400'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.users.map(user => (
                      <tr key={user.id}>
                        <td>{user.firstName}<span />{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{Date(user.createdAt)}</td>
                        <td>
                          <button
                            name='show'
                            id={user.id}
                            onClick={this.handleShowUser}
                          >
                            Show
                          </button>
                        </td>
                        <td>
                          <button
                            name='edit'
                            id={user.id}
                            onClick={this.handleShowUser}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            name='delete'
                            id={user.id}
                            onClick={ (e) => {
                              e.preventDefault;
                              this.props.deleteUser
                            }
                          }
                          >
                            Delete
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
                <button id='add' onClick={this.props.switchView}>
                  Add a new User
                </button>
              </div>}

            {/*   This is the "ADD" Render     */}
            {this.props.currentView === 'add' &&
              <div>
                <h1>Add a New User</h1>
                <form>
                  <input
                    type='text'
                    placeholder='First Name'
                    name='firstName'
                    value={this.state.firstName}
                    onChange={this.handleTextChange}
                  />
                  <input
                    type='text'
                    placeholder='Last Name'
                    name='lastName'
                    value={this.state.lastName}
                    onChange={this.handleTextChange}
                  />
                  <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    value={this.state.email}
                    onChange={this.handleTextChange}
                  />
                  <button id='create' onClick={this.handleAddUser.bind(this)}>
                    Create
                  </button>
                  <button
                    id='list'
                    onClick={() => {
                      this.props.switchView
                      this.setState({ firstName: '', lastName: '', email: '' })
                    }}
                  >
                    Go Back
                  </button>
                </form>
              </div>}

            {/*   This is the "SHOW" Render     */}
            {this.props.currentView === 'show' &&
              <div>
                {this.props.users.map(user => {
                  if (user.id === this.props.selectedUser) {
                    return (
                      <div>
                        <h1>User ID : {user.id}</h1>
                        <h2>
                          Full Name : {user.firstName + ' ' + user.lastName}
                        </h2>
                        <h2>Email : {user.email}</h2>
                        <h2>Created At : {user.createdAt}</h2>
                        <button
                          id='list'
                          onClick={this.props.switchView}
                        >
                          Go Back
                        </button>
                        <button
                          name='Edit'
                          id={user.id}
                          onClick={this.handleShowUser}
                        >
                          Edit
                        </button>
                        <button
                          name='Delete'
                          id={user.id}
                          onClick={this.props.deleteUser}
                        >
                          Delete
                        </button>
                      </div>
                    )
                  }
                })}
              </div>}

          </div>

          <div className='medium-2 columns'>&nbsp;</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    selectedUser: state.selectedUser,
    currentView: state.currentView
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserData: () => dispatch(fetchUserData()),
    switchView: e => dispatch(switchView(e.target.id)),
    createUser: UserObj => dispatch(createUser(UserObj)),
    selectUser: id => dispatch(selectUser(id)),
    showUser: show => dispatch(switchView(show)),
    deleteUser: e => dispatch(deleteUser(e.target.id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
