import React, {Component} from 'react'
import {ScrollView,View, Alert,TextInput} from 'react-native'
import {Text, ListItem,FormLabel,FormInput,FormValidationMessage,Button,CheckBox,Card} from 'react-native-elements'

class EssayQuestionWidget extends Component {
    static navigationOptions = {title: 'Essay Question Editor'}
    constructor(props){
        super(props)
        this.state={
            qType:'',
            widgetId:'',
            title:'',
            description:'',
            points:'',
            essay:{}


        }

    }

    componentDidMount(){
        const{navigation} =this.props;
        const widgetId = navigation.getParam("widgetId")
        const qType = navigation.getParam("type")
        this.setState({
            widgetId:widgetId,
            qType:qType

        })

    }



    updateForm(newState){
        this.setState(newState);
    }

    addEssayWidget = () =>{
        fetch("https://webdev-smr1.herokuapp.com/api/exam/"+ this.state.widgetId +"/essay",{
            method:'post',
            body: JSON.stringify({
                title:this.state.title,
                description:this.state.description,
                points:this.state.points,
                widgetId:this.state.widgetId,
                type:this.state.qType

            }),
            headers:{
                'content-type': 'application/json'
            }
        }).then(function(response){
            return response.json();
        }).then(this.props.navigation
            .navigate('Widget',{widgetId: this.state.widgetId}))
            .then(() => Alert.alert('Question Added'));
    }


    render() {
        return(
            <ScrollView style={{marginLeft:15,marginRight:15}}>
              <Card>
                <FormLabel>Title</FormLabel>
                <FormInput  onChangeText={text => this.updateForm({title: text}) }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>
                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={text => this.updateForm({description: text}) }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>
                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={text => this.updateForm({points: text}) }/>
                <FormValidationMessage>
                    Points is required
                </FormValidationMessage>
                <Text/>
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
                               onPress={() => this.addEssayWidget()}
                    />

                </View>
              </Card>

            </ScrollView>
        )
    }
}
export default EssayQuestionWidget