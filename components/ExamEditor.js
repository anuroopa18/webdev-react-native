import React, {Component} from 'react'
import {ScrollView, Alert} from 'react-native'
import {ListItem,Text} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';


class ExamEditor extends Component {
    static navigationOptions = {title: 'Exam Editor'}
    constructor(props) {
        super(props)
        this.state = {
            widgetId:'',
            lessonId:'',

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

    }


    render() {
        return(
            <ScrollView style={{padding: 15}}>
                <Text h3>Questions<Icon
                    reverse
                    name='plus-circle'
                    type='font-awesome'
                    size={40}

                    style={{marginLeft:20}}
                /></Text>
            </ScrollView>
        )
    }
}
export default ExamEditor