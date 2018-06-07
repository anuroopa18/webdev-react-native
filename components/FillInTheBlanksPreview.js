import React, {Component} from 'react'
import {View, Alert, TextInput, ScrollView} from 'react-native'
import {Text, ListItem, Card, FormLabel, FormInput, Button, CheckBox} from 'react-native-elements'

class FillInTheBlanksPreview extends Component {
    static navigationOptions = {title: 'FillInTheBlanks'}

    constructor(props) {
        super(props)
        this.state = {
            questionId: '',
            fillInTheBlanks: {}
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")
        const fillInTheBlanks = navigation.getParam("fillInTheBlanks")
        this.setState({
            questionId: questionId,
            fillInTheBlanks: fillInTheBlanks

        })

    }


    render() {
        return (
            <ScrollView >
                <Card containerStyle={{width:350,marginLeft:20}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text h4>{this.state.fillInTheBlanks.title}</Text>
                           <View style={{width:10}}/>
                            <Text style={{fontSize: 20,paddingTop:5}}>{this.state.fillInTheBlanks.points} pts </Text>
                        </View>
                    <Text> </Text>
                    <Text style={{fontSize: 20}}> {this.state.fillInTheBlanks.description} </Text>
                    <Text> </Text>
                    <View>
                        <Text> 2 + 2 = [four=4]</Text>
                        <Text>[two=2]+ 2 = 4</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Button backgroundColor="red"
                                color="white"
                                title="Cancel"
                                buttonStyle={{
                                    width: 100,
                                    height: 45,
                                    borderColor: "transparent",
                                    borderWidth: 0,
                                    borderRadius: 5
                                }}
                        />
                        <Button
                                color="white"
                                title="Submit"
                                buttonStyle={{
                                    backgroundColor: "rgba(92, 99,216, 1)",
                                    width: 100,
                                    height: 45,
                                    borderColor: "transparent",
                                    borderWidth: 0,
                                    borderRadius: 5

                                }}
                        />
                    </View>
                </Card>
            </ScrollView>
        )
    }
}

export default FillInTheBlanksPreview