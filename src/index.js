import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { 
      messages: [],
      name: false, 
      active: []
    }
  }

  componentDidMount () {
    this.socket = io('/')
    this.socket.on('message', body => {
      // console.log(body)
      this.setState({ 
        messages: [body, ...this.state.messages]
      })
    })
    this.socket.on('active', active => {
      this.setState({
        active: [active, ...this.state.active]
      })
    })
  }

  handleSubmit = event =>{
    const body = event.target.value
    const data = {
      from: this.state.name,
      body : body
    }
    if (event.keyCode === 13 && body) {
      const message = {
        from: data.from,
        body: data.body
      }
      this.setState({ 
        messages: [message, ...this.state.messages]      
      })
      this.socket.emit('message', data)
      event.target.value = ''
    }
  }

  handleName = e =>{
    const yName = e.target.value
    if( e.keyCode === 13 && yName){
      // console.log(yName);
      
      if(this.state.name == false){
        this.socket.emit('active', yName);
      }

      this.setState({
        name: yName,
        active: [yName, ...this.state.active]
      })
      e.target.value = '';
    }
  }

  render () {
    // console.log(this.state.messages)
    const msgBody = this.state.messages;
    const messages = msgBody.map((message, index) => {
      return <li key={index}><b>{message.from}: </b>{message.body}</li>
    })
    const activeFriends = this.state.active.map((frnd, index) => {
 
      return <li key={index}><b>{frnd}</b></li>
    })
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2>Actieve Friends</h2>
            {activeFriends}
          </div>
          <div className="col-md-8">
            <h1>Socket IO Chat App</h1>
            <h2>Hello : {this.state.name ? this.state.name : <span className="text-danger">Enter Your Name First</span>}</h2>
            {this.state.name ? 
            <input type='text' placeholder='Enter a message...' onKeyUp={this.handleSubmit} />
            :
            <input type='text' placeholder='What is your name?' onKeyUp={this.handleName} />
            }
            {messages}
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
