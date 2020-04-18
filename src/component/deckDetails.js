import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, DatePickerIOS } from "react-native";
import { getDecks, deletDeck } from "../utits/api";

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            decks: null
        }
    }
    async componentDidMount() {
        let decks = await getDecks()
        this.setState({ decks })
    }
    async componentDidUpdate() {
        let decks = await getDecks()
        this.setState({ decks })
    }

    render() {
        const { I_key } = this.props.route.params;

        return (
            <View style={Styles.container}>

                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={Styles.TitelText}> {I_key} </Text>
                    <Text style={Styles.SubTitleText} >
                        {this.state.decks !== null && this.state.decks[I_key] !== undefined ? this.state.decks[I_key].length + " card" : " "}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'home' }],
                        });
                        deletDeck(I_key)
                    }}
                    style={Styles.Button} >
                    <Text style={{ color: "white" }}>delet deck </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate("newCard", { I_key })
                    }}
                    style={Styles.Button} >
                    <Text style={{ color: "white" }}>Add Card </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate("quiz", {
                            deck: this.state.decks[I_key]
                        })
                    }}
                    style={{ ...Styles.Button, backgroundColor: "red" }} >
                    <Text style={{ color: "white" }}>Start Quize</Text>
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
        color: "black",
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