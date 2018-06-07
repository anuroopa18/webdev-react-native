import React, {Component} from 'react'
import {ScrollView,View, Alert,TextInput} from 'react-native'
import {Text, ListItem,FormLabel,FormInput,FormValidationMessage,Button,CheckBox,Card} from 'react-native-elements'




class FillInTheBlanksQuestionWidget extends Component {
    static navigationOptions = {title: 'FillInTheBlanks'}
    constructor(props){
        super(props)
        this.state={
            questionId:'',
            widgetId:'',
            title:'',
            description:'',
            points:'',
            variables:'',
            fillInTheBlanks:{}


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
        this.findFillInTheBlanksQuestionById(questionId)

    }

    findFillInTheBlanksQuestionById = (questionId) => {

        fetch("https://webdev-smr1.herokuapp.com/api/base/"+questionId)
            .then(response => (response.json()))
            .then(fillInTheBlanks => this.setState({fillInTheBlanks}))

    }

    updateForm(newState){
        this.setState(newState);
    }

    updateFillInTheBlanksQuestion = () =>{
        fetch("https://webdev-smr1.herokuapp.com/api/blanks/"+ this.state.questionId,{
            method:'put',
            body: JSON.stringify({
                title:this.state.title,
                description:this.state.description,
                points:this.state.points,
                widgetId:this.state.widgetId,
                variables:this.state.variables

            }),
            headers:{
                'content-type': 'application/json'
            }
        }).then(function(response){
            return response.json();
        }).then(() => Alert.alert('Question Added'))
            .then(() => this.props.navigation
                .navigate('WidgetList',{widgetId: this.state.widgetId}));
    }


    render() {
        return(
            <ScrollView>
                <Card>
                    <FormLabel>Title</FormLabel>
                    <FormInput  onChangeText={text => this.updateForm({title: text}) } value={this.state.fillInTheBlanks.title}/>
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage>
                    <FormLabel>Description</FormLabel>
                    <FormInput onChangeText={text => this.updateForm({description: text}) } value={this.state.fillInTheBlanks.description}/>
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage>
                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={text => this.updateForm({points: text}) } value={String(this.state.fillInTheBlanks.points)}/>
                    <FormValidationMessage>
                        Points is required
                    </FormValidationMessage>
                    <FormLabel>Variables</FormLabel>
                    <FormInput onChangeText={text => this.updateForm({variables: text}) }  value={this.state.fillInTheBlanks.variables}/>
                    <FormValidationMessage>
                        Variables is required
                    </FormValidationMessage>
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
                                   onPress={() => this.updateFillInTheBlanksQuestion()}
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
                                       .navigate("FillInTheBlanksPreview", {fillInTheBlanks:this.state.fillInTheBlanks})}/>
                    </View>
                </Card>
            </ScrollView>
        )
    }
}
export default FillInTheBlanksQuestionWidget