import React, {Component} from 'react'
import {ScrollView, View, Alert} from 'react-native'
import {
    Text,
    ListItem,
    FormLabel,
    FormInput,
    FormValidationMessage,
    Button,
    CheckBox,
    Card
} from 'react-native-elements'

class AssignmentWidget extends Component {
    static navigationOptions = {title: 'Assignment Editor'}

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: '',
            assignment: {},
            widgetId: '',
            assignmentDisplay: {},
            lessonId: ''

        }

        this.updateAssignment = this.updateAssignment.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const widgetId = navigation.getParam("widgetId")
        const lessonId = navigation.getParam("lessonId")
        this.setState({
            widgetId: widgetId,
            lessonId: lessonId,
            assignment: {title: this.state.title, description: this.state.description, points: this.state.points}

        })
        this.findAssignmentById(widgetId);
    }


    findAssignmentById = (widgetId) => {

        fetch("https://webdev-smr1.herokuapp.com/api/assignment/" + widgetId)
            .then(response => (response.json()))
            .then(assignmentDisplay => this.setState({assignmentDisplay}))

    }

    updateForm(newState) {
        this.setState(newState);
    }

    updateAssignment = () => {
        fetch("https://webdev-smr1.herokuapp.com/api/assignment/" + this.state.widgetId, {
            method: 'put',
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                points: this.state.points,
                lessonId: this.state.lessonId
            }),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(() => Alert.alert('Changed Saved'));

    }


    render() {
        return (
            <ScrollView>
                <Card>
                    <FormLabel style={{fontcolor: 'black'}}>Title</FormLabel>
                    <FormInput onChangeText={text => this.updateForm({title: text})}
                               value={this.state.assignmentDisplay.title}/>
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage>
                    <FormLabel>Description</FormLabel>
                    <FormInput onChangeText={text => this.updateForm({description: text})}
                               value={this.state.assignmentDisplay.description}/>
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage>
                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={text => this.updateForm({points: text})}
                               value={String(this.state.assignmentDisplay.points)}/>
                    <FormValidationMessage>
                        Points is required
                    </FormValidationMessage>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>

                    <View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: 100}}>
                                <Button
                                    color="white"
                                    title="Save"
                                    buttonStyle={{
                                        backgroundColor: "rgba(92, 99,216, 1)",
                                        width: 90,
                                        height: 45,
                                        borderColor: "transparent",
                                        borderWidth: 0,
                                        borderRadius: 5,
                                        marginBottom: 5
                                    }}
                                    onPress={() => this.updateAssignment()}/>
                            </View>
                            <View style={{width: 100}}>
                                <Button backgroundColor="red"
                                        color="white"
                                        title="Cancel"
                                        buttonStyle={{
                                            width: 90,
                                            height: 45,
                                            borderColor: "transparent",
                                            borderWidth: 0,
                                            borderRadius: 5,
                                            marginBottom: 5
                                        }}
                                        onPress={() => this.props.navigation
                                            .navigate('WidgetList')}/>
                            </View>

                            <View style={{width: 100}}>
                                <Button backgroundColor="#4CAF50"
                                        color="white"
                                        title="Preview"
                                        buttonStyle={{
                                            width: 90,
                                            height: 45,
                                            borderColor: "transparent",
                                            borderWidth: 0,
                                            borderRadius: 5,
                                            marginBottom: 5
                                        }}
                                        onPress={() => this.props.navigation
                                            .navigate("Preview", {assignmentDisplay: this.state.assignmentDisplay})}/>
                            </View>
                            <View style={{height:100}}>

                            </View>

                        </View>
                    </View>
                </Card>
            </ScrollView>

        )
    }
}

export default AssignmentWidget