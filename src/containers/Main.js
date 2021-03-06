import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import LoginContainer from '../mainContainers/LoginContainer';
import MainMenuContainer from '../mainContainers/MainMenuContainer';
import ChooseTeamContainer from '../mainContainers/ChooseTeamContainer';
import BattleContainer from '../mainContainers/BattleContainer';
import SignUpContainer from '../mainContainers/SignUpContainer';
import EditUserContainer from '../mainContainers/EditUserContainer'
import Winner from '../components/Winner'
import GameOver from '../components/GameOver'

class Main extends Component {

    state= {name: ""}

    winner = (routerProps) => {
        if(routerProps.location.pathname === "/winner"){
            return <Winner 
            setPageState={this.props.setPageState}
            history={this.props.history}
            /> 
        }
    }

    gameOver = (routerProps) => {
        if(routerProps.location.pathname === "/gameover"){
            return <GameOver 
            setPageState={this.props.setPageState}
            history={this.props.history}
            />
        }
    }

    renderForm = (routerProps) => {
        if(routerProps.location.pathname === "/"){
          return <LoginContainer history={this.props.history} setPageState={this.props.setPageState} handleLogin={this.handleLogin} />
        } else if (routerProps.location.pathname === "/signup"){
            return <SignUpContainer history={this.props.history} setPageState={this.props.setPageState} handleSubmit={this.handleSignup} /> 
        }
    }
    chooseTeam = (routerProps) => {
        const {pets, team, addPet, removePet, hoveredPet, setHoveredPet, setPageState, page} = this.props

        if(routerProps.location.pathname === "/chooseTeam"){
          return <ChooseTeamContainer 
                setPageState={this.props.setPageState}
                addPet={addPet} 
                removePet={removePet} 
                team={team} 
                pets={pets}
                hoveredPet={hoveredPet} //state
                setHoveredPet={setHoveredPet}
            />
        } 
    }
    main = (routerProps) => {
        if(routerProps.location.pathname === "/main"){
            return <MainMenuContainer 
                setPageState={this.props.setPageState}
                clearTeamState={this.props.clearTeamState}
                history={this.props.history}
            />
        }   
    }
    battle = (routerProps) => {
        const {history, currentGame, setAttackingPetMoves, setHoveredPet, battleButtonPressed,setBattleButtonState, setAppMovesState} = this.props
        if(routerProps.location.pathname === "/battle"){
            return <BattleContainer 
                setPageState={this.props.setPageState}
                history={history}
                currentGame={currentGame}
                setAttackingPetMoves={setAttackingPetMoves}
                setHoveredPet={setHoveredPet}
                battleButtonPressed={battleButtonPressed}
                doNothing={this.doNothing}
                setBattleButtonState={setBattleButtonState}
                setAppMovesState={setAppMovesState}
              />
        } 
    }
    doNothing = (thing) => {
        return null
    }
    editUser = (routerProps) => {
        if(routerProps.location.pathname === "/editUser"){
            return <EditUserContainer 
                setPageState={this.props.setPageState}
                history={this.props.history}
                userID={this.props.userID}
              />
        } 
    }
    handleLogin = (info) => {
        this.handleAuthFetch(info, 'http://localhost:3000/login')
    }
    handleAuthFetch = (info, request) => {  
        fetch(request, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
                name: info.name,
                password: info.password
            })
        })
        .then(res => res.json())
        .then(data => {
            this.setState({name: data.name},() => {
                localStorage.setItem('jwt', data.token)
                this.props.history.push('/main')
            })
            this.props.setUserIDState(data.user.id)
        })
        .then(() => this.props.setAPIPetsState())
    }
    handleSignup = (info) => {
        this.handleSignUpFetch(info, 'http://localhost:3000/users')
      }
    handleSignUpFetch = (info, request) => {  
        fetch(request, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
          },
          body: JSON.stringify({
            user:{
                name: info.name,
                password: info.password,
                alias: info.alias,
                bio: info.bio,
                gif_url: info.gif_url
            }
          })
        })
        .then(res => res.json())
        .then(data => {
          this.setState({name: data.user.name}, () => {
            localStorage.setItem('jwt', data.token)
            this.props.history.push('/main')
          })
        this.props.setUserIDState(data.user.id)
        })
        .then(() => {
            this.props.setAPIPetsState()
        })
      }
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" exact component={this.renderForm} />
                    <Route path="/signup" exact component={this.renderForm} />
                    <Route path="/battle" exact component={this.battle} />
                    <Route path="/main" exact component={this.main} />
                    <Route path="/chooseTeam" exact component={this.chooseTeam} />
                    <Route path="/editUser" exact component={this.editUser} />
                    <Route path="/winner" exact component={this.winner} />
                    <Route path="/gameover" exact component={this.gameOver} />
                </Switch>
            </div>
        );
    }
}
export default withRouter(Main);