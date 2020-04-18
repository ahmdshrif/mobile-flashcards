import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, DatePickerIOS } from "react-native";
import { saveDeckTitle } from "../utits/api";

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
    }
    addDeck = async () => {
        await saveDeckTitle(this.state.value)
        this.props.navigation.navigate("Home")
    }

    render() {

        return (
            <View style={Styles.container}>

                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={Styles.TitelText}> {"enter the name of your new deck"} </Text>
                    <TextInput
                        value={this.state.value}
                        onChangeText={value => this.setState({ value })}
                        placeholder="   deck name"
                        style={Styles.input} />
                </View>

                <TouchableOpacity
                    onPress={this.addDeck}
                    style={Styles.Button} >
                    <Text style={{ color: "white" }}>Add deck </Text>
                </TouchableOpacity>

            </View >
        );
    }
}


const Styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        marginTop: 20,
        alignItems: "center"
    },
    TitelText: {
        color: "black",
        fontSize: 50,
        textAlign: "center"
    },
    input: {
        marginTop: 40,
        borderColor: "red",
        borderWidth: 2,
        marginHorizontal: 20,
    },
    Button: {
        width: 250,
        height: 50,
        borderRadius: 20,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
    }
})

function getAnsweared(o1, o2) {

    return Object.keys(o1).filter(k => (k in o2))
        .reduce((obj, key) => {
            obj[key] = o1[key];
            return obj;
        }, {});

}

export default Home