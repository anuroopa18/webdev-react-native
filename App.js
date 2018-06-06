import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import FixedHeader from './elements/FixedHeader'
import { createStackNavigator } from 'react-navigation'
import {Button} from 'react-native-elements'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import AssignmentWidget from './components/AssignmentWidget'
import ExamWidget from './components/ExamWidget'
import Preview from './components/Preview'
import MultipleChoiceQuestionWidget from './components/MultipleChoiceQuestionWidget'
import EssayQuestionWidget from './components/EssayQuestionWidget'


class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    }
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <ScrollView>
                <StatusBar barStyle="light-content"/>
                <FixedHeader/>

                <Button title="Courses"
                        onPress={() => this.props.navigation
                            .navigate('CourseList') } />


            </ScrollView>
        )
    }
}


const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    WidgetList,
    AssignmentWidget,
    ExamWidget,
    Preview,
    MultipleChoiceQuestionWidget,
    EssayQuestionWidget



});

export default App;