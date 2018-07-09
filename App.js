import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {ReactNativeAD, ADLoginView, Logger} from 'react-native-azure-ad';


Logger.setLevel('VERBOSE')

const config = {
  client_id : 'put-your-azure-registered-app-id-here',
  redirectUrl : 'http://localhost',
  // authorityHost : 'https://login.microsoftonline.com/<tenant id>/oauth2/authorize',
  tenant  : 'microsoft.onmicrosoft.com',
  // client_secret : 'client-secret-of-your-app(optional)',
  response_type : 'code',
  resources : [
    // 'https://graph.microsoft.com',
    // 'https://outlook.office.com',
    // 'https://outlook.office365.com',
    // 'https://wiadvancetechnology.sharepoint.com',
    'https://graph.windows.net',
  ]
}

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         <Text>Changes for authentication.</Text>
//         <Text>Shake your phone to open the developer menu.</Text>
//       </View>
//     );
//   }
// }


export default class App extends React.Component {
  constructor(props) {
    super(props)
    new ReactNativeAD(config)
  }

  render() {
    return (
      <View style={styles.container}>
        <ADLoginView context={ReactNativeAD.getContext(config.client_id)}
          // needLogout={this.state.logout}
          needLogout={true}
          hideAfterLogin={true}
          onSuccess={this.onLoginSuccess.bind(this)}
        />
        {/* <Button onPress={(e) => this.logout()} title="logout"/>  */}
      </View>
    )
  }

  logout(e){
    this.setState({
      logout:true
    })
  }
  
  onLoginSuccess(cred) {
    console.log(cred)
  }

  apiCall() {

    ReactNativeAD.getContext(config.client_id).then((token) => {
      fetch({
        method : 'GET',
        url : 'some-api-url',
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      .then((resp) => {
        return resp.text()
      })
      .catch((err) => {
        console.log(err.stack)
      })
    })
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});