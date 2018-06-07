import React, {Component} from 'react'
import {View, Alert,TextInput,ScrollView,Picker} from 'react-native'
import {Text, ListItem, Card,FormLabel,FormInput,Button,CheckBox} from 'react-native-elements'
import  RadioForm, {RadioButton,  RadioButtonInput , RadioButtonLabel} from 'react-native-simple-radio-button';

class MultipleChoicePreview extends Component {
    static navigationOptions = {title: 'Multiple Choice'}
    constructor(props) {
        super(props)
        this.state = {
            questionId:'',
            multipleChoice:{options:''}

        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")
        const multipleChoice = navigation.getParam("multipleChoice")
        this.setState({
            questionId:questionId,
            multipleChoice:multipleChoice

        })

    }


    render() {
        var radioProps = []
        this.state.multipleChoice.options.split(",").map((i,index) => radioProps.push({label:i,value:index}))



        return(
            <ScrollView>
                <Card containerStyle={{width:350,marginLeft:20}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text h4>{this.state.multipleChoice.title}</Text>

                        <View style={{width:10}}/>
                        <Text style={{fontSize: 20,paddingTop:5}}>{this.state.multipleChoice.points} pts </Text>
                    </View>
                    <Text style={{fontSize:20}}> {this.state.multipleChoice.description} </Text>
                    <Text> </Text>

                        <RadioForm radio_props={radioProps}
                                   initial={0}
                                   animation={'bounceIn'}
                                   style={{alignItems:'flex-start'}}
                                   onPress={() => this.props.navigation
                                       .navigate("MultipleChoiceQuestionWidget")}
                        />



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
export default MultipleChoicePreview