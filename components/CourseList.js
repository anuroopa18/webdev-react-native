import React, {Component} from 'react'
import {View, Alert,ScrollView} from 'react-native'
import {Text, ListItem,Card} from 'react-native-elements'

class CourseList extends Component {
    static navigationOptions = {title: 'Courses'}
    constructor(props) {
        super(props)
        fetch('https://webdev-smr1.herokuapp.com/api/course')
            .then(response => (response.json()))
            .then(courses => {
                this.setState({courses: courses})
            })
        this.state = {
            courses: []
        }
    }
    render() {
        return(
            <ScrollView style={{padding: 15}}>

                {this.state.courses.map((course, index) => (
                    <ListItem
                        onPress={() => this.props.
                        navigation.navigate("ModuleList",
                            {courseId: course.id})}
                        title={course.title}
                        key={index}/>
                ))}

            </ScrollView>
        )
    }
}
export default CourseList