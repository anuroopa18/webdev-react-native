import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem,FormLabel,FormInput,FormValidationMessage,Button,CheckBox} from 'react-native-elements'

class AssignmentWidget extends Component {
    static navigationOptions = {title: 'Assignment Editor'}
    constructor(props){
        super(props)
        this.state={
            title:'',
            description:'',
            points:'',
            assignment:{},
            widgetId:'',
            assignmentDisplay:{},
            lessonId:''

        }

        this.updateAssignment = this.updateAssignment.bind(this);
    }

    componentDidMount(){
        const{navigation} =this.props;
        const widgetId = navigation.getParam("widgetId")
        const lessonId = navigation.getParam("lessonId")
        this.setState({
            widgetId:widgetId,
            lessonId:lessonId,
            assignment:{title:this.state.title,description:this.state.description,points:this.state.points}

        })
        this.findAssignmentById(widgetId);
    }


    findAssignmentById = (widgetId) => {

        fetch("https://webdev-smr1.herokuapp.com/api/assignment/"+widgetId)
            .then(response => (response.json()))
            .then(assignmentDisplay => this.setState({assignmentDisplay}))

    }

    updateForm(newState){
        this.setState(newState);
    }

    updateAssignment = () => {
        fetch("https://webdev-smr1.herokuapp.com/api/assignment/"+ this.state.widgetId,{
            method:'put',
            body: JSON.stringify({
                title:this.state.title,
                description:this.state.description,
                points:this.state.points,
                lessonId:this.state.lessonId
            }),
            headers:{
                'content-type': 'application/json'
            }
        }).then(function(response){
            return response.json();
        });

    }



    render() {
        return(
            <View style={{marginLeft:15,marginRight:15}}>
                <FormLabel style={{fontcolor:'black'}}>Title</FormLabel>
                <FormInput onChangeText={text => this.updateForm({title: text}) } value={this.state.assignmentDisplay.title}/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>
                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={text => this.updateForm({description: text}) } value={this.state.assignmentDisplay.description}/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>
                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={text => this.updateForm({points: text}) } value={String(this.state.assignmentDisplay.points)}/>
                <FormValidationMessage>
                    Points is required
                </FormValidationMessage>
                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                onPress={() => this.updateAssignment()}/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"
                           onPress={() => this.props.navigation
                               .navigate('WidgetList')}/>

                <Button	backgroundColor="#1a75ff"
                           color="white"
                           title="Preview"
                           onPress={() => this.props.navigation
                    .navigate("Preview", {assignmentDisplay:this.state.assignmentDisplay})}/>
            </View>
        )
    }
}
export default AssignmentWidget