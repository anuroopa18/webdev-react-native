import React, {Component} from 'react'
import {View, Alert,TextInput,ScrollView} from 'react-native'
import {Text, ListItem, Card,FormLabel,FormInput,Button} from 'react-native-elements'

class EssayPreview extends Component {
    static navigationOptions = {title: 'Essay Preview'}
    constructor(props) {
        super(props)
        this.state = {
            questionId:'',
            essay:{}
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")
        this.setState({
            questionId:questionId

        })
        this.findEssayQuestionById(questionId)
    }

    findEssayQuestionById = (questionId) => {

        fetch("https://webdev-smr1.herokuapp.com/api/base/"+questionId)
            .then(response => (response.json()))
            .then(essay => this.setState({essay}))

    }
    render() {
        return(
            <ScrollView style={{padding: 15}}>
                <Card>
                    <Text style={{fontSize:30}}> {this.state.essay.title}  <Text style={{fontSize:20,textAlign: 'right'}}> {this.state.essay.points} pts </Text> </Text>
                    <Text> </Text>
                    <Text style={{fontSize:20}}> {this.state.essay.description} </Text>
                    <Text> </Text>
                    <Text style={{fontSize:25}}> Essay Answer </Text>
                    <TextInput style={{height: 60, borderColor: 'gray', borderWidth: 1}}
                               multiline={true}
                               numberOfLines={6}
                    />
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
export default EssayPreview