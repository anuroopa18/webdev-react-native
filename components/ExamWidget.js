import React, {Component} from 'react'
import {ScrollView, View, Alert} from 'react-native'
import {ListItem, Text, Button, Card, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';


class ExamWidget extends Component {
    static navigationOptions = {title: 'Exam Editor'}

    constructor(props) {
        super(props)
        this.state = {
            widgetId: '',
            lessonId: '',
            questions: [],
            examTitle: '',
            essayQuestion: {},
            multipleChoice: {},
            trueOrFalse: {},
            fillInTheBlanks: {}

        }
        this.createEssayQuestion = this.createEssayQuestion.bind(this);
        this.createMultipleQuestion = this.createMultipleQuestion.bind(this);
        this.createTrueOrFalseQuestion = this.createTrueOrFalseQuestion.bind(this);

    }

    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId")
        const widgetId = navigation.getParam("widgetId")
        this.setState({
            lessonId: lessonId,
            widgetId: widgetId,
            essayQuestion: {id: 1, title: "New Essay Question", type: "Essay", points: 0},
            multipleChoice: {id: 1, title: "New Multiple Choice Question", type: "MultipleChoice", points: 0,options:"No Options"},
            trueOrFalse: {id: 1, title: "New TrueOrFalse Question", type: "TrueOrFalse", points: 0, isTrue: false},
            fillInTheBlanks: {id: 1, title: "New FillInTheBlanks Question", type: "FillInTheBlanks", points: 0}
        })
        fetch("https://webdev-smr1.herokuapp.com/api/exam/" + widgetId + "/base")
            .then(response => (response.json()))
            .then(questions => this.setState({questions}))


    }

    updateForm(newState) {
        this.setState(newState);
    }

    updateExamTitle = () => {
        fetch("http://192.168.0.12:8080/api/exam/" + this.state.widgetId, {
            method: 'put',
            body: JSON.stringify({
                examTitle: this.state.examTitle,
            }),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(() => Alert.alert('Updated!'));
    }

    componentWillReceiveProps() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId")
        const widgetId = navigation.getParam("widgetId")
        this.setState({
            lessonId: lessonId,
            widgetId: widgetId

        })
        fetch("https://webdev-smr1.herokuapp.com/api/exam/" + widgetId + "/base")
            .then(response => (response.json()))
            .then(questions => this.setState({questions}))
    }

    findQuestionsForExam = (widgetId) => {
        fetch("https://webdev-smr1.herokuapp.com/api/exam/" + widgetId + "/base")
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
        fetch("https://webdev-smr1.herokuapp.com/api/exam/" + this.state.widgetId + "/essay", {
            method: 'post',
            body: JSON.stringify(this.state.essayQuestion),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(() => Alert.alert('Question Added')).then(() => {
            this.findQuestionsForExam(this.state.widgetId);
        });
    }

    createMultipleQuestion = () => {
        fetch("https://webdev-smr1.herokuapp.com/api/exam/" + this.state.widgetId + "/choice", {
            method: 'post',
            body: JSON.stringify(this.state.multipleChoice),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(() => Alert.alert('Question Added')).then(() => {
            this.findQuestionsForExam(this.state.widgetId);
        });
    }

    createTrueOrFalseQuestion = () => {
        fetch("https://webdev-smr1.herokuapp.com/api/exam/" + this.state.widgetId + "/truefalse", {
            method: 'post',
            body: JSON.stringify(this.state.trueOrFalse),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(() => Alert.alert('Question Added')).then(() => {
            this.findQuestionsForExam(this.state.widgetId);
        });
    }

    createFillInTheBlanksQuestion = () => {
        fetch("https://webdev-smr1.herokuapp.com/api/exam/" + this.state.widgetId + "/blanks", {
            method: 'post',
            body: JSON.stringify(this.state.fillInTheBlanks),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(() => Alert.alert('Question Added')).then(() => {
            this.findQuestionsForExam(this.state.widgetId);
        });
    }


    render() {
        const questionTypes = ['Multiple Choice',
            'Fill in the blank',
            'Essay',
            'True or\nfalse']
        return (
            <ScrollView>
                <View>
                    <Card title="Exam Title">
                        <FormLabel>Update Exam Title</FormLabel>

                        <FormInput onChangeText={text => this.updateForm({examTitle: text})}
                                   value={this.state.examTitle}/>
                        <Text> </Text>
                        <View>
                        <Button
                                color="white"
                                title="Update"
                                buttonStyle={{
                                    width: 250,
                                    height: 45,
                                    borderColor: "transparent",
                                    backgroundColor: "rgba(92, 99,216, 1)",
                                    borderWidth: 0,
                                    borderRadius: 5,
                                    marginLeft:10
                                }}
                                onPress={() => this.updateExamTitle()}
                        />
                        </View>
                    </Card>

                </View>
                <Text> </Text>
                <Card>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: 200}}>
                            <Text h4>Essay Questions</Text>
                        </View>
                        <View style={{width: 100, marginLeft: 75}}>
                            <Icon
                                onPress={() => this.createEssayQuestion()}
                                reverse
                                name='plus-circle'
                                type='font-awesome'
                                size={40}
                            />
                        </View>
                    </View>
                    {this.state.questions
                        .filter(function (question) {
                            if (question.type == 'Essay') return question
                        })
                        .map(
                            (question, index) => (
                                <ListItem
                                    key={index}
                                    onPress={() => this.props.navigation
                                        .navigate('EssayQuestionWidget', {
                                            questionId: question.id,
                                            widgetId: this.state.widgetId
                                        })}
                                    title={question.title}
                                    leftIcon={<Icon
                                        reverse
                                        name='trash'
                                        type='font-awesome'
                                        size={30}
                                        onPress={() => this.deleteQuestion(question.id)}
                                        style={{paddingRight: 20}}
                                    />}
                                />))}
                </Card>
                <Card>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: 200}}>
                            <Text h4>Fill in the Blanks Questions</Text>
                        </View>
                        <View style={{width: 100, marginLeft: 75}}>
                            <Icon
                                onPress={() => this.createFillInTheBlanksQuestion()}
                                reverse
                                name='plus-circle'
                                type='font-awesome'
                                size={40}
                            />
                        </View>
                    </View>
                    {this.state.questions
                        .filter(function (question) {
                            if (question.type == 'FillInTheBlanks') return question
                        })
                        .map(
                            (question, index) => (
                                <ListItem
                                    key={index}
                                    onPress={() => this.props.navigation
                                        .navigate('FillInTheBlanksQuestionWidget', {
                                            questionId: question.id,
                                            widgetId: this.state.widgetId
                                        })}
                                    title={question.title}
                                    leftIcon={<Icon
                                        reverse
                                        name='trash'
                                        type='font-awesome'
                                        size={30}
                                        onPress={() => this.deleteQuestion(question.id)}
                                        style={{paddingRight: 20}}
                                    />}
                                />))}
                    <Text> </Text>
                </Card>
                <Card>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: 200}}>
                            <Text h4>True Or False Questions</Text>
                        </View>
                        <View style={{width: 100, marginLeft: 75}}>
                            <Icon
                                onPress={() => this.createTrueOrFalseQuestion()}
                                reverse
                                name='plus-circle'
                                type='font-awesome'
                                size={40}
                            />
                        </View>
                    </View>
                    {this.state.questions
                        .filter(function (question) {
                            if (question.type == 'TrueOrFalse') return question
                        })
                        .map(
                            (question, index) => (
                                <ListItem
                                    key={index}
                                    onPress={() => this.props.navigation
                                        .navigate('TrueOrFalseQuestionWidget', {
                                            questionId: question.id,
                                            widgetId: this.state.widgetId
                                        })}
                                    title={question.title}
                                    leftIcon={<Icon
                                        reverse
                                        name='trash'
                                        type='font-awesome'
                                        size={30}
                                        onPress={() => this.deleteQuestion(question.id)}
                                        style={{paddingRight: 20}}
                                    />}
                                />))}

                </Card>
                <Card>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: 200}}>
                            <Text h4>Multiple choice Questions</Text>
                        </View>
                        <View style={{width: 100, marginLeft: 75}}>
                            <Icon
                                onPress={() => this.createMultipleQuestion()}
                                reverse
                                name='plus-circle'
                                type='font-awesome'
                                size={40}
                            />
                        </View>
                    </View>
                    {this.state.questions
                        .filter(function (question) {
                            if (question.type == 'MultipleChoice') return question
                        })
                        .map(
                            (question, index) => (
                                <ListItem
                                    key={index}
                                    onPress={() => this.props.navigation
                                        .navigate('MultipleChoiceQuestionWidget', {
                                            questionId: question.id,
                                            widgetId: this.state.widgetId
                                        })}
                                    title={question.title}
                                    leftIcon={<Icon
                                        reverse
                                        name='trash'
                                        type='font-awesome'
                                        size={30}
                                        onPress={() => this.deleteQuestion(question.id)}
                                        style={{paddingRight: 20}}
                                    />}
                                />))}
                </Card>

            </ScrollView>
        )
    }
}

export default ExamWidget