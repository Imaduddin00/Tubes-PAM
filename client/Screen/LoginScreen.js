import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Loader from './Components/Loader';

const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);

    fetch('https://server-buat-react.herokuapp.com/login.php', {
      method: 'POST',
      body:JSON.stringify({
				email: userEmail,
				password: userPassword
			}),
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        if (responseJson === 'ok') {
          alert("Successfully Login");
          navigation.replace('DrawerNavigationRoutes');
        } else {
          setErrortext(responseJson.msg);
          console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.container} transparent>
      <Loader loading={loading} />
      <View style={styles.viewTitle}>
        <Text style={styles.textTitle}>Aplikasi Buku Pegawai</Text>
      </View>
      <Image source={require('../assets/Images/Collect.png')} style={styles.viewImage} />
      <KeyboardAvoidingView>
        <View style={styles.SectionStyle}>
          <Text style={styles.textLogin}>Masuk</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(UserEmail) =>
              setUserEmail(UserEmail)
            }
            placeholder="Email"
            placeholderTextColor="#0C4569"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() =>
              passwordInputRef.current &&
              passwordInputRef.current.focus()
            }
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.inputStyle}
            onChangeText={(UserPassword) =>
              setUserPassword(UserPassword)
            }
            placeholder="Enter Password"
            placeholderTextColor="#0C4569"
            keyboardType="default"
            ref={passwordInputRef}
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={true}
            returnKeyType="next"
          />
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitPress}>
                <Text style={styles.buttonTextStyle}>Masuk</Text>
              </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ACF8FF',
  },
  SectionStyle: {
    flexDirection: 'column',
    height: '100%',
    marginLeft: 1,
    backgroundColor: '#F5FCFE',
    borderRadius: 30
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: '#0C4569',
    height: 50,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: '50.93%',
    marginRight: '11.73%',
    marginTop: 50,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#0C4569',
    paddingVertical: 10,
    fontSize: 18,
  },
  inputStyle: {
    marginLeft: 26,
    marginRight: 40,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 17,
    marginBottom: 13,
    borderColor: '#0C4569',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'crimson',
    color: '#0C4569',
    textAlign: 'center'
  },
  viewTitle: {
    marginBottom: 1,
  },
  viewImage: {
    marginLeft: 38,
    marginRight: 19,
    marginBottom: 8,
    width: 318,
    height: 216
  },
  textLogin: {
    fontFamily: 'poppins',
    fontSize: 24,
    fontStyle: 'normal',
    textAlign: 'center',
    marginTop: 41,
    color: '#296F63',
    fontWeight: 'bold'
  }
});

export default LoginScreen;