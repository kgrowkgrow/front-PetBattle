import React, { Component } from 'react';

class SignUpContainer extends Component {
    state = {
        name: "",
        password: "",
        alias: "",
        bio: "",
        gif_url: ""
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleSubmit(this.state)
      }
    
      handleChange = (e) => {
        let {title, value} = e.target
        this.setState({
          [title]: value
        })
      }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>{this.props.title}</h1>
                <label htmlFor="username">Name:</label>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <label htmlFor="alias">Alias:</label>
                <input type="alias" name="alias" value={this.state.alias} onChange={this.handleChange}/>
                <label htmlFor="bio">Bio:</label>
                <input type="bio" name="bio" value={this.state.bio} onChange={this.handleChange}/>
                <label htmlFor="gif_url">Gif:</label>
                <input type="gif_url" name="gif_url" value={this.state.gif_url} onChange={this.handleChange}/>
                
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

export default SignUpContainer;