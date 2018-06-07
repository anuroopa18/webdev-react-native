import React, {Component} from 'react'
import {ScrollView,View, Alert,Picker} from 'react-native'
import {Text, ListItem,FormLabel,FormInput,FormValidationMessage,Button,CheckBox,Card} from 'react-native-elements'



class MultipleChoiceQuestionWidget extends Component {
    static navigationOptions = {title: 'Multiple Choice Question Editor'}
    constructor(props){
        super(props)
        this.state={
            questionId:'',
            widgetId:'',
            title:'',
            description:'',
            points:'',
            options:'',
            correctOption:'',
            multipleChoice:{}

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
        this.findMultipleChoiceQuestionById(questionId)

    }

    findMultipleChoiceQuestionById = (questionId) => {

        fetch("https://webdev-smr1.herokuapp.com/api/base/"+questionId)
            .then(response => (response.json()))
            .then(multipleChoice => this.setState({multipleChoice}))
            .then(() => this.setState({options:this.state.multipleChoice.options}))
            .then(() => this.setState({correctOption:this.state.multipleChoice.correctOption}))


    }

    updateForm(newState){
        this.setState(newState);
    }

    updateMultipleChoiceWidget = () =>{
        fetch("https://webdev-smr1.herokuapp.com/api/choice/"+ this.state.questionId,{
            method:'put',
            body: JSON.stringify({
                title:this.state.title,
                description:this.state.description,
                points:this.state.points,
                widgetId:this.state.widgetId,
                options:this.state.options,
                correctOption:this.state.correctOption
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
        var mappingOptions = []
        this.state.options.split(",").map((i,index) => mappingOptions.push({'label':i,'value':index}))
        let pickerObjects = mappingOptions.map((i, index) =>  <Picker.Item  key={index} label={i.label} value={index}/>);




        return(
            <ScrollView>
                <Card>
                <FormLabel>Title</FormLabel>
                <FormInput  onChangeText={text => this.updateForm({title: text}) } value={this.state.multipleChoice.title}/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>
                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={text => this.updateForm({description: text}) } value={this.state.multipleChoice.description}/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>
                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={text => this.updateForm({points: text}) } value={String(this.state.multipleChoice.points)}/>
                <FormValidationMessage>
                    Points is required
                </FormValidationMessage>

                <FormLabel>Options</FormLabel>
                <FormInput onChangeText={text => this.updateForm({options: text}) } value={this.state.multipleChoice.options}/>
                <FormValidationMessage>
                    Please provide options as option1,option2,option3
                </FormValidationMessage>

                    <Text/>
                    <FormLabel>Correct Option</FormLabel>
                    <Picker  iosHeader="Select option"
                             mode="dropdown" selectedValue={this.state.correctOption}
                            onValueChange={index => this.updateForm({correctOption: index})}>
                        { pickerObjects}
                    </Picker>
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
                               onPress={() => this.updateMultipleChoiceWidget()}
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
                                   .navigate("MultipleChoicePreview", {multipleChoice:this.state.multipleChoice})}/>
                </View>
                </Card>
            </ScrollView>
        )
    }
}
export default MultipleChoiceQuestionWidget