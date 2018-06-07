import React, {Component} from 'react'
import {View, Alert,TextInput,ScrollView} from 'react-native'
import {Text, ListItem, Card,FormLabel,FormInput,Button,CheckBox} from 'react-native-elements'

class TrueOrFalsePreview extends Component {
    static navigationOptions = {title: 'True Or false Preview'}
    constructor(props) {
        super(props)
        this.state = {
            questionId:'',
            trueOrFalse:{}
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")
        const trueOrFalse = navigation.getParam("trueOrFalse")
        this.setState({
            questionId:questionId,
            trueOrFalse:trueOrFalse

        })

    }


    render() {
        return(
            <ScrollView>
                <Card containerStyle={{width:350,marginLeft:20}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width:200}}>
                        <Text h4>{this.state.trueOrFalse.title}</Text>
                    </View>
                    <View style={{width:110}}>
                        <Text style={{fontSize: 20,paddingTop:5,marginLeft:40}}>{this.state.trueOrFalse.points} pts </Text>
                    </View>
                    </View>


                    <Text> </Text>
                    <Text style={{fontSize:20}}> {this.state.trueOrFalse.description} </Text>
                    <Text> </Text>
                    <CheckBox title='The answer is true' checked={this.state.trueOrFalse.isTrue}/>
                    <Text> </Text>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Button	backgroundColor="red"
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
                        <Button	backgroundColor="#1a75ff"
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
export default TrueOrFalsePreview