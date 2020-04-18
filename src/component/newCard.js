import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, DatePickerIOS } from "react-native";
import { addCardToDeck } from "../utits/api";

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            qustion: "",
            answear: ''
        }
    }

    addCard = async (id) => {
        const { qustion, answear } = this.state
        const { I_key } = this.props.route.params;

        await addCardToDeck(I_key, { qustion, answear })
        this.props.navigation.goBack()


    }

    render() {
        //TODO :
        // get data from navigation.state.prams
        return (
            <View style={Styles.container}>

                <View style={Styles.inputsContainer}>
                    <TextInput
                        value={this.state.qustion}
                        onChangeText={(qustion) => this.setState({ qustion })}
                        placeholder="   qustion"
                        style={Styles.input} />
                    <TextInput
                        value={this.state.answear}
                        onChangeText={(answear) => this.setState({ answear })}
                        placeholder="   answear"
                        style={Styles.input} />
                </View>

                <TouchableOpacity
                    onPress={this.addCard}
                    style={Styles.Button} >
                    <Text style={{ color: "white" }}>Add card </Text>
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
    inputsContainer: {
        flex: 1,
        width: "100%",
        justifyContent: "center"
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