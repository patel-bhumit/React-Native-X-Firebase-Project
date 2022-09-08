import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import firebase from '@react-native-firebase/app'


const LoginScreen = () => {

    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const navigation = useNavigation()

    useEffect(() => {
        const sub = firebase.auth().onAuthStateChanged(function(user) {
             if (user){
            navigation.navigate("Home");
            // User is signed in. 
            }
        //Runs only on the first render 
      })
      return sub
    }, []);

const LoginHandle = () => {

    auth()
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials =>{
        const user = userCredentials.user;
        alert('Logged in Succesfull With ' + user.email );
    })
    .catch(error => alert(error.message))
    }

const SignupHandle = () => {
auth()
  .createUserWithEmailAndPassword(email, password)
  .then(userCredentials =>{
    const user = userCredentials.user;
    alert('Registred Succesfull With :' + user.email);
})
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      alert('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      alert('That email address is invalid!');
    }

    console.error(error);
  });
}


  return (
    <KeyboardAvoidingView
    style= {styles.container}
    behavior='height'
    >
        <View style= {styles.inputContainer}>
            <TextInput
            placeholder='Email'
            value={email}
            onChangeText={text => setEmail(text)}
            style= {styles.input}
            
            />
            <TextInput                   
            placeholder='Password'
            value={password}
            onChangeText={text => setPassword(text)}
            style= {styles.input}
            secureTextEntry
            />
        </View>

        <View style= {styles.buttoncontainer}>
            <TouchableOpacity 
            onPress= {LoginHandle}
            style= {styles.button}
            >
                <Text style= {styles.buttonText}>
                    Login
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style= {[styles.button, styles.buttonOutline]}
            onPress= {SignupHandle}
            >
                <Text style= {styles.buttonOutlineText}>
                    Register
                </Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer: {
        width:  '80%'
    },

    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 5,
    },

    buttoncontainer:{
        width: '60%',
        justifyContent: 'center',
        marginTop: 40,
    },

    button:{
        backgroundColor: '#0782F9',
        width: '100%',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },

    buttonText:{
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },

    buttonOutline:{
        backgroundColor: 'white',
        borderColor: '#0782F9',
        borderWidth: 1,
        marginTop: 5,
    },

    buttonOutlineText:{
        color: '#0782F9',
        fontSize: 16,
        fontWeight: '700',
    }

})