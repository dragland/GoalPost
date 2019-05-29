import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import Cloud from "../components/database";
import {facebookService} from '../services/FacebookService';

export default class Login extends React.Component {

    static navigationOptions = {
        title: "Login"
    };

    render() {
        return (
            <View style={styles.container}>
                {facebookService.makeLoginButton((accessToken) => {
                    this.login()
                })}
            </View>
        )
    }

    async login() {
        const profile = await facebookService.fetchProfile();
        const login = await Cloud.loginUser(profile.id, profile.name, profile.avatar);
        alert(profile.avatar);
        this.props.navigation.navigate("Home", {userID: profile.id});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
})
