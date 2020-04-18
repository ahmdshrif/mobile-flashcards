import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native";
// import { deks } from "../utits/_DATA";
import { saveDeckTitle, getDecks } from "../utits/api"

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            decks: {}
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
    openDeck = (deck, I_key) => {
        this.props.navigation.navigate("deckDerails", {
            deck,
            I_key
        })
    }
    Item = ({ I_key, decks }) => (
        <TouchableOpacity
            onPress={() => this.openDeck(decks[I_key], I_key)}
            style={{ marginTop: 10, marginHorizontal: "auto", padding: 40, borderWidth: 1, width: "95%" }}>
            <Text style={Styles.TitelText}>{I_key} </Text>
            <Text style={Styles.SubTitleText}>{typeof decks[I_key] === undefined ? " " : decks[I_key].length + " card"}</Text>
        </TouchableOpacity>

    )

    render() {
        const { decks } = this.state
        if (typeof decks == undefined) {

            return (
                <View />
            )
        }
        const keys = Object.keys(decks)
        return (
            <FlatList
                data={keys}
                renderItem={({ item }) => <this.Item I_key={item} decks={decks} />} />
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
        fontSize: 30,
        textAlign: "center"
    },
    SubTitleText: {
        marginTop: 15,
        color: "black",
        fontSize: 20,
        textAlign: "center"
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