import React, {Component} from 'react'
import {View, Alert,TextInput,ScrollView} from 'react-native'
import {Text, ListItem, Card,FormLabel,FormInput,Button,CheckBox} from 'react-native-elements'

class FillInTheBlanksPreview extends Component {
    static navigationOptions = {title: 'FillInTheBlanks'}
    constructor(props) {
        super(props)
        this.state = {
            questionId:'',
            fillInTheBlanks:{}
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")
        this.setState({
            questionId:questionId

        })
        this.findFillInTheBlanksQuestionById(questionId)
    }

    findFillInTheBlanksQuestionById = (questionId) => {

        fetch("https://webdev-smr1.herokuapp.com/api/base/"+questionId)
            .then(response => (response.json()))
            .then(fillInTheBlanks => this.setState({fillInTheBlanks}))

    }
    render() {
        return(
            <ScrollView style={{padding: 15}}>
                <Card>
                    <Text style={{fontSize:30}}> {this.state.fillInTheBlanks.title}  <Text style={{fontSize:20,textAlign: 'right'}}> {this.state.fillInTheBlanks.points} pts </Text> </Text>
                    <Text> </Text>
                    <Text style={{fontSize:20}}> {this.state.fillInTheBlanks.description} </Text>
                    <Text> </Text>
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
export default FillInTheBlanksPreview