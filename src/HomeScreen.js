import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {

    const navigation = useNavigation()

    const SignOutHandle = () => {
       auth()
        .signOut()
        .then(() => navigation.navigate("Login") + alert('Logged Out successfully'))
        .catch(error => alert(error.message))
    }
  return (
    <View style= {styles.container}>
            <Text style = {styles.Text}>
                Email: {firebase.auth().currentUser?.email}
            </Text>
            <TouchableOpacity 
            onPress= {SignOutHandle}
            style= {styles.button}>
                <Text style= {styles.buttonText}>
                    Sign out
                </Text>
            </TouchableOpacity>
        </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    
    container:{
        flex: 1,
        justifyContent: 'center',
        marginTop: 40,
        alignItems: 'center',
    },

    Text:{
        fontWeight: '700',
        fontSize: 16,
        marginBottom: 10,
    },
    buttonText:{
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },

    button:{
        backgroundColor: '#0782F9',
        width: '60%',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },

})