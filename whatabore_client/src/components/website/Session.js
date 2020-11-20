import React, { Component } from 'react'

export default class Session extends Component {
    render() {
        return (
            <div>
                <h1>
                    Log In
                </h1>
                <form method="POST">
                    <label for="name">User Name:</label>
                    <input type="text" name="username" required/>
                    <label for="color">Password:</label>
                    <input type="password" name="password" />
                    <br/>
                    <input class="submit" type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}
