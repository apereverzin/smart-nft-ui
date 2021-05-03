import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { smartRegisterAbi, smartRegisterAddress } from './config'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const smartRegisterContract = new web3.eth.Contract(smartRegisterAbi, smartRegisterAddress)
    let count = await smartRegisterContract.methods.getCount().call()
    this.setState({ count })
  }

  constructor(props) {
    super(props)
    this.state = { account: '' }
  }

  render() {
    return (
      <div className="container">
        <p>Your current account: {this.state.account}</p>
        <p>Count: {this.state.count}</p>
      </div>
    );
  }
}

export default App;
