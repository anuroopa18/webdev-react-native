import React, {Component} from 'react'
import {ScrollView,View, Alert} from 'react-native'
import {ListItem,Text,Button,Card,FormLabel,FormInput,FormValidationMessage} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';


class ExamWidget extends Component {
    static navigationOptions = {title: 'Exam Editor'}
    constructor(props) {
        super(props)
        this.state = {
            widgetId:'',
            lessonId:'',
            questions:[],
            examTitle:'',
            essayQuestion:{}

        }

    }
    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId")
        const widgetId=navigation.getParam("widgetId")
        this.setState({
            lessonId:lessonId,
            widgetId:widgetId

        })
        fetch("https://webdev-smr1.herokuapp.com/api/exam/"+widgetId+"/base")
            .then(response => (response.json()))
            .then(questions => this.setState({questions}))


    }

    updateForm(newState){
        this.setState(newState);
    }

    updateExamTitle = () =>{
        fetch("http://192.168.0.12:8080/api/exam/"+ this.state.widgetId,{
            method:'put',
            body: JSON.stringify({
                examTitle:this.state.examTitle,
            }),
            headers:{
                'content-type': 'application/json'
            }
        }).then(function(response){
            return response.json();
        }).then(() => Alert.alert('Updated!'));
    }

    componentWillReceiveProps(){
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId")
        const widgetId=navigation.getParam("widgetId")
        this.setState({
            lessonId:lessonId,
            widgetId:widgetId

        })
        fetch("https://webdev-smr1.herokuapp.com/api/exam/"+widgetId+"/base")
            .then(response => (response.json()))
            .then(questions => this.setState({questions}))
    }

    findQuestionsForExam = (widgetId) =>{
        fetch("https://webdev-smr1.herokuapp.com/api/exam/"+widgetId+"/base")
            .then(response => (response.json()))
            .then(questions => this.setState({questions}))
    }




    deleteQuestion = (questionId) => {
        fetch("https://webdev-smr1.herokuapp.com/api/base/" + questionId,
            {
                method: 'DELETE'
            }).then(() => {
            this.findQuestionsForExam(this.state.widgetId);
        });
    }

    createEssayQuestion = () => {

    }



    render() {
        const questionTypes = ['Multiple Choice',
            'Fill in the blank',
            'Essay',
            'True or\nfalse']
        return(
            <ScrollView style={{padding: 15}}>


                <View >
                    <Button	backgroundColor="#ff1a66"
                               color="white"
                               title="MultipleChoice"
                               style= {{
                                   width: 300,
                                   height: 45,
                                   borderColor: "transparent",
                                   borderWidth: 0,
                                   borderRadius: 10
                               }}
                               onPress={() => this.props.navigation
                                   .navigate('MultipleChoiceQuestionWidget',{type:'MultipleChoice',widgetId:this.state.widgetId}) }
                    />

                    <Text> </Text>
                    <Button	backgroundColor="#ff1a66"
                               color="white"
                               title="FillInTheBlanks"
                               style= {{
                                   width: 300,
                                   height: 45,
                                   borderColor: "transparent",
                                   borderWidth: 0,
                                   borderRadius: 10
                               }}
                               onPress={() => this.props.navigation
                                   .navigate('FillInTheBlanksQuestionWidget',{type:'FillInTheBlanks',widgetId:this.state.widgetId}) }

                    />

                    <Text> </Text>
                    <Button	backgroundColor="#ff1a66"
                               color="white"
                               title="Essay"
                               style= {{
                                   width: 300,
                                   height: 45,
                                   borderColor: "transparent",
                                   borderWidth: 0,
                                   borderRadius: 10
                               }}
                               onPress={() => this.props.navigation
                                   .navigate('EssayQuestionWidget',{type:'Essay',widgetId:this.state.widgetId}) }
                    />
                    <Text> </Text>
                    <Button	backgroundColor="#ff1a66"
                               color="white"
                               title="TrueOrFalse"
                               style= {{
                                   width: 300,
                                   height: 45,
                                   borderColor: "transparent",
                                   borderWidth: 0,
                                   borderRadius: 10
                               }}
                               onPress={() => this.props.navigation
                                   .navigate('TrueOrFalseQuestionWidget',{type:'TrueOrFalse',widgetId:this.state.widgetId}) }
                    />
                    <Text> </Text>
                    <Card>
                    <FormLabel>Update Exam Title</FormLabel>

                    <FormInput onChangeText={text => this.updateForm({examTitle: text}) } value={this.state.examTitle}/>
                        <Text> </Text>
                        <Button	backgroundColor="#ff1a66"
                                   color="white"
                                   title="Update"
                                   style= {{
                                       width: 200,
                                       height: 45,
                                       borderColor: "transparent",
                                       borderWidth: 0,
                                       borderRadius: 10
                                   }}
                                   onPress={() => this.updateExamTitle() }
                        />
                        </Card>



                </View>
                <Text> </Text>

                <Text h3>Essay Questions</Text>
                    {this.state.questions
                    .filter(function(question){if(question.type == 'Essay') return question})
                    .map(
                        (question, index) => (
                            <ListItem
                                key={index}
                                onPress={() => this.props.navigation
                                    .navigate('EssayPreview',{questionId:question.id})}
                                title={question.title}
                                leftIcon={<Icon
                                    reverse
                                    name='trash'
                                    type='font-awesome'
                                    size={30}
                                    onPress={() => this.deleteQuestion(question.id)}
                                    style={{paddingRight:20}}
                                />}
                            />))}
                <Text> </Text>

                <Text h3>Fill In the blanks Questions</Text>
                {this.state.questions
                    .filter(function(question){if(question.type == 'FillInTheBlanks') return question})
                    .map(
                        (question, index) => (
                            <ListItem
                                key={index}
                                onPress={() => this.props.navigation
                                    .navigate('FillInTheBlanksPreview',{questionId:question.id})}
                                title={question.title}
                                leftIcon={<Icon
                                    reverse
                                    name='trash'
                                    type='font-awesome'
                                    size={30}
                                    onPress={() => this.deleteQuestion(question.id)}
                                    style={{paddingRight:20}}
                                />}
                            />))}
                <Text> </Text>

                <Text h3>True or False question</Text>
                {this.state.questions
                    .filter(function(question){if(question.type == 'TrueOrFalse') return question})
                    .map(
                        (question, index) => (
                            <ListItem
                                key={index}
                                onPress={() => this.props.navigation
                                    .navigate('TrueOrFalsePreview',{questionId:question.id})}
                                title={question.title}
                                leftIcon={<Icon
                                    reverse
                                    name='trash'
                                    type='font-awesome'
                                    size={30}
                                    onPress={() => this.deleteQuestion(question.id)}
                                    style={{paddingRight:20}}
                                />}
                            />))}
                <Text> </Text>

                <Text h3>Multiple Choice Question</Text>
                {this.state.questions
                    .filter(function(question){if(question.type == 'MultipleChoice') return question})
                    .map(
                        (question, index) => (
                            <ListItem
                                key={index}
                                onPress={() => this.props.navigation
                                    .navigate('MultipleChoicePreview',{questionId:question.id})}
                                title={question.title}
                                leftIcon={<Icon
                                    reverse
                                    name='trash'
                                    type='font-awesome'
                                    size={30}
                                    onPress={() => this.deleteQuestion(question.id)}
                                    style={{paddingRight:20}}
                                />}
                            />))}
                <Text> </Text>

            </ScrollView>
        )
    }
}
export default ExamWidget