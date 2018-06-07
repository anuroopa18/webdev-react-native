import React, {Component} from 'react'
import {ScrollView,View, Alert,TextInput} from 'react-native'
import {Text, ListItem,FormLabel,FormInput,FormValidationMessage,Button,CheckBox,Card} from 'react-native-elements'




class TrueOrFalseQuestionWidget extends Component {
    static navigationOptions = {title: 'True Or false Question Editor'}
    constructor(props){
        super(props)
        this.state={
            questionId:'',
            widgetId:'',
            title:'',
            description:'',
            points:'',
            trueOrFalse:{},
            isTrue:false

        }

    }

    componentDidMount(){
        const{navigation} =this.props;
        const widgetId = navigation.getParam("widgetId")
        const questionId = navigation.getParam("questionId")
        this.setState({
            widgetId:widgetId,
            questionId:questionId

        })

        this.findTrueOrFalseQuestionById(questionId)

    }

    findTrueOrFalseQuestionById = (questionId) => {

        fetch("https://webdev-smr1.herokuapp.com/api/base/"+questionId)
            .then(response => (response.json()))
            .then(trueOrFalse => this.setState({trueOrFalse}))
            .then(() => this.setState({isTrue:this.state.trueOrFalse.isTrue}))


    }

    updateForm(newState){
        this.setState(newState);
    }

    updateTrueOrFalseWidget = () =>{
        fetch("https://webdev-smr1.herokuapp.com/api/truefalse/"+ this.state.questionId,{
            method:'put',
            body: JSON.stringify({
                title:this.state.title,
                description:this.state.description,
                points:this.state.points,
                widgetId:this.state.widgetId,
                isTrue:this.state.isTrue

            }),
            headers:{
                'content-type': 'application/json'
            }
        }).then(function(response){
            return response.json();
        }).then(() => Alert.alert('Question Updated!'))
            .then(() => this.props.navigation
                .navigate('WidgetList',{widgetId: this.state.widgetId}));
    }


    render() {
        return(
            <ScrollView>
                <Card>
                <FormLabel>Title</FormLabel>
                <FormInput  onChangeText={text => this.updateForm({title: text}) } value={this.state.trueOrFalse.title}/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>
                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={text => this.updateForm({description: text}) } value={this.state.trueOrFalse.description}/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>
                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={text => this.updateForm({points: text}) } value={String(this.state.trueOrFalse.points)}/>
                <FormValidationMessage>
                    Points is required
                </FormValidationMessage>

                <Text/>

                    <CheckBox title='The answer is true' onPress={() => this.setState
                    ({isTrue: !this.state.isTrue})}
                              checked={this.state.isTrue}/>
                    <Text/>


                <View>

                    <Button
                               color="white"
                               title="Update"
                               buttonStyle= {{
                                   backgroundColor: "rgba(92, 99,216, 1)",
                                   width: 250,
                                   height: 45,
                                   borderColor: "transparent",
                                   borderWidth: 0,
                                   borderRadius: 5,
                                   marginBottom:5
                               }}
                               onPress={() => this.updateTrueOrFalseWidget()}
                    />
                    <Button	backgroundColor="red"
                               color="white"
                               title="Cancel"
                               buttonStyle= {{
                                   width: 250,
                                   height: 45,
                                   borderColor: "transparent",
                                   borderWidth: 0,
                                   borderRadius: 5,
                                   marginBottom:5
                               }}
                               onPress={() => this.props.navigation
                                   .navigate("ExamWidget")}
                    />
                    <Button	backgroundColor="#4CAF50"
                               color="white"
                               title="Preview"
                               buttonStyle= {{
                                   width: 250,
                                   height: 45,
                                   borderColor: "transparent",
                                   borderWidth: 0,
                                   borderRadius: 5,
                                   marginBottom:5
                               }}
                               onPress={() => this.props.navigation
                                   .navigate("TrueOrFalsePreview", {trueOrFalse:this.state.trueOrFalse})}/>
                </View>
                </Card>
            </ScrollView>
        )
    }
}
export default TrueOrFalseQuestionWidget