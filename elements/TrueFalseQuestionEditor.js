import React from 'react'
import {FormLabel,FormInput,FormValidationMessage,Text,Button,CheckBox} from 'react-native-elements'
import {View} from 'react-native'

class TrueFalseQuestionEditor extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            description:'',
            points:0,
            isTrue:true
        }
    }

    updateForm(newState){
        this.setState(newState);
    }
    render()
    {
        return(
            <View>
                <Text h3>Editor</Text>
            <FormLabel>Title</FormLabel>
            <FormInput onChangeText={text => this.updateForm({title: text}) }/>
            <FormValidationMessage>
            Title is required
            </FormValidationMessage>
                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={text => this.updateForm({description: text}) }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>
                <CheckBox title='The answer is true' onPress={() => this.updateForm
                ({isTrue: !this.state.isTrue})}
                          checked={this.state.isTrue}/>
                <Button	backgroundColor="green"
                           color="white"
                           title="Save"/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>

                <Text h3>Preview</Text>
                <Text h2>{this.state.title}</Text>
                <Text>{this.state.description}</Text>
            </View>

    )
    }
}

export default TrueFalseQuestionEditor