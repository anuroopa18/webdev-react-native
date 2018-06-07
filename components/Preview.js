import React, {Component} from 'react'
import {View, Alert,TextInput,ScrollView} from 'react-native'
import {Text, ListItem, Card,FormLabel,FormInput,Button} from 'react-native-elements'

class Preview extends Component {
    static navigationOptions = {title: 'Preview'}
    constructor(props) {
        super(props)
        this.state = {
           assignment:{}
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const assignment = navigation.getParam("assignmentDisplay")
        this.setState({
            assignment:assignment

        })
    }
    render() {
        return(
            <ScrollView>
                <Card containerStyle={{width:350,marginLeft:20}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width:200}}>
                            <Text h4>{this.state.assignment.title}</Text>
                        </View>
                        <View style={{width:110}}>
                            <Text style={{fontSize: 20,paddingTop:5,marginLeft:40}}>{this.state.assignment.points} pts </Text>
                        </View>
                    </View>
                    <Text style={{fontSize:20}}> {this.state.assignment.description} </Text>
                    <Text> </Text>
                    <Text style={{fontSize:25}}> Essay Answer </Text>
                    <TextInput style={{height: 60, borderColor: 'gray', borderWidth: 1}}
                        multiline={true}
                        numberOfLines={6}
                        />
                    <Text> </Text>
                    <Text style={{fontSize:25}}> Choose file</Text>
                    <TextInput style={{height: 25, borderColor: 'gray', borderWidth: 1}}
                               multiline={true}
                               numberOfLines={4}
                    />
                    <Text> </Text>
                    <Text style={{fontSize:25}}> Submit a link </Text>
                    <TextInput style={{height: 25, borderColor: 'gray', borderWidth: 1}}
                               multiline={true}
                               numberOfLines={4} />
                    <Text> </Text>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                    <Button	backgroundColor="red"
                               color="white"
                               title="Cancel"
                               buttonStyle={{
                                   width: 100,
                                   height: 45,
                                   borderColor: "transparent",
                                   borderWidth: 0,
                                   borderRadius: 5
                               }}
                               />
                    <Button	backgroundColor="#1a75ff"
                               color="white"
                               title="Submit"
                               buttonStyle={{
                                   backgroundColor: "rgba(92, 99,216, 1)",
                                   width: 100,
                                   height: 45,
                                   borderColor: "transparent",
                                   borderWidth: 0,
                                   borderRadius: 5

                               }}
                              />
                    </View>
                </Card>
            </ScrollView>
        )
    }
}
export default Preview