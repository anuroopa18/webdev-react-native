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
        this.setState({
            questionId:questionId


        })
        this.findMultipleChoiceQuestionById(questionId)
    }

    findMultipleChoiceQuestionById = (questionId) => {

        fetch("https://webdev-smr1.herokuapp.com/api/base/"+questionId)
            .then(response => (response.json()))
            .then(multipleChoice => this.setState({multipleChoice}))


    }


    render() {
        var radioProps = []
        this.state.multipleChoice.options.split(",").map((i,index) => radioProps.push({label:i,value:index}))
        let pickerObjects = radioProps.map((item, i) =>  <Picker.Item  label={item.label} value={i.value}/>);


        return(
            <ScrollView style={{padding: 15}}>
                <Card>
                    <Text style={{fontSize:30}}> {this.state.multipleChoice.title}  <Text style={{fontSize:20,textAlign: 'right'}}> {this.state.multipleChoice.points} pts </Text> </Text>
                    <Text> </Text>
                    <Text style={{fontSize:20}}> {this.state.multipleChoice.description} </Text>
                    <Text> </Text>
                    <View>
                        <RadioForm radio_props={radioProps}
                                   initial={0}
                        />
                        <Picker  selectedValue={0}>

                            { pickerObjects}
                        </Picker>
                    </View>

                    <Text> </Text>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Button	backgroundColor="red"
                                   color="white"
                                   title="Cancel"
                                   style= {{
                                       width: 100,
                                       height: 45,
                                       borderColor: "transparent",
                                       borderWidth: 0,
                                       borderRadius: 10
                                   }}
                        />
                        <Button	backgroundColor="#1a75ff"
                                   color="white"
                                   title="Submit"
                                   style= {{
                                       backgroundColor: "rgba(92, 99,216, 1)",
                                       width: 100,
                                       height: 45,
                                       borderColor: "transparent",
                                       borderWidth: 0,
                                       borderRadius: 10
                                   }}
                        />
                    </View>
                </Card>
            </ScrollView>
        )
    }
}
export default MultipleChoicePreview