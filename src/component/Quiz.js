import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, DatePickerIOS } from "react-native";
import { deks } from "../utits/_DATA";

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            flip: false,
            Q_id: 0,
            Correct: 0,
            incorrect: 0,
        }
    }


    render() {
        const { deck } = this.props.route.params;
        let qustion = deck[this.state.Q_id]
        //TODO:
        //add no Answer text if no qustions
        if (typeof deck == undefined || null || deck.length == 0) {
            return (
                <View style={{ ...Styles.container, justifyContent: "center" }}>
                    <Text>  no qustions </Text>
                </View>
            )
        }
        if (this.state.Q_id >= deck.length) {
            return (
                <View style={{ ...Styles.container, justifyContent: "center" }}>
                    <Text style={Styles.TitelText}> retsult : {this.state.Correct} of {deck.length}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("home")
                        }}
                        style={{ ...Styles.Button, backgroundColor: "red", marginTop: 40 }} >
                        <Text style={{ color: "white" }}>Back To Home</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <View style={Styles.container}>
                <Text>{this.state.Q_id + 1 + " /  " + deck.length}</Text>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={Styles.TitelText}> {this.state.flip ? qustion.answer : qustion.qustion} </Text>
                    <Text
                        onPress={() => this.setState({ flip: !this.state.flip })}
                        style={Styles.SubTitleText} >{!this.state.flip ? "answer" : "qustion"}</Text>
                </View>

                <TouchableOpacity
                    onPress={() => this.setState({ Correct: this.state.Correct + 1, Q_id: this.state.Q_id + 1 })}
                    style={Styles.Button} >
                    <Text style={{ color: "white" }}>Correct </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.setState({ incorrect: this.state.incorrect + 1, Q_id: this.state.Q_id + 1 })}
                    style={{ ...Styles.Button, backgroundColor: "red" }} >
                    <Text style={{ color: "white" }}>incorrect</Text>
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
    SubTitleText: {
        marginTop: 15,
        color: "red",
        fontSize: 30,
        textAlign: "center"

    },
    Button: {
        width: 250,
        height: 50,
        borderRadius: 20,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green",
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