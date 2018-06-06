import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

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
            <View style={{padding: 15}}>
                <Text style={{fontSize:30}}> {this.state.assignment.title} </Text>
                <Text style={{fontSize:30}}> {this.state.assignment.description} </Text>
                <Text style={{fontSize:30}}> {this.state.assignment.points} pts </Text>
            </View>
        )
    }
}
export default Preview