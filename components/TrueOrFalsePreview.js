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
        this.setState({
            questionId:questionId

        })
        this.findTrueOrFalseQuestionById(questionId)
    }

    findTrueOrFalseQuestionById = (questionId) => {

        fetch("https://webdev-smr1.herokuapp.com/api/base/"+questionId)
            .then(response => (response.json()))
            .then(trueOrFalse => this.setState({trueOrFalse}))

    }
    render() {
        return(
            <ScrollView style={{padding: 15}}>
                <Card>
                    <Text style={{fontSize:30}}> {this.state.trueOrFalse.title}  <Text style={{fontSize:20,textAlign: 'right'}}> {this.state.trueOrFalse.points} pts </Text> </Text>
                    <Text> </Text>
                    <Text style={{fontSize:20}}> {this.state.trueOrFalse.description} </Text>
                    <Text> </Text>
                    <CheckBox title='The answer is true' checked={this.state.trueOrFalse.true}/>
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
export default TrueOrFalsePreview