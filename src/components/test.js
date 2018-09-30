import React, { Component } from 'react'
import SignUp from 'SignUp'
import Login from 'Login'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
class Test extends Component {
  constructor(props){
    super(props)
  }
  render() {
    console.log(this.props)
    return (
      <div style={{ flex: 1 }}>

        {/* <button type="button" className="btn btn-success">button</button> */}

        {/* <TextInput placeholder="TestAddMongoose" /> */}

        {/* <span className="label label-success">CreateUser</span>
        
        <SignUp />

        <br />
        <br />
        <br /> */}

        <p>P</p>
       <Tabs>
          <TabList>
            <Tab>SignIn</Tab>
            <Tab>SignUp</Tab>
          </TabList>

          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <SignUp />
          </TabPanel>
        </Tabs>
        
      </div>
    )
  }
}

export default Test
