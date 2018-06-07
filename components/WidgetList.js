import React, {Component} from 'react'
import {ScrollView,View, Alert} from 'react-native'
import {ListItem,Text,Card} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';


class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'}
    constructor(props) {
        super(props)
        this.state = {
            widgets: [],
            courseId: '',
            moduleId: '',
            lessonId:'',
            assignment:{},
            exam:{}

        }
        this.deleteAssignmentWidget = this.deleteAssignmentWidget.bind(this);
        this.createAssignment = this.createAssignment.bind(this);
        this.createExam = this.createExam.bind(this);
    }
    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId")
        this.setState({
            lessonId:lessonId,
            assignment:{id:1,title:"New Assignment",typ:"Assignment",points:0},
            exam:{id:10,examTitle:"New Exam",typ:"Exam"}
        })

        fetch("https://webdev-smr1.herokuapp.com/api/lesson/"+lessonId+"/widget")
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets}))
        this.findWidgetsForLesson(lessonId)
    }

     deleteAssignmentWidget = (widgetId) => {
         fetch("https://webdev-smr1.herokuapp.com/api/assignment/" + widgetId,
             {
                 method: 'DELETE'
             }).then(() => {
             this.findWidgetsForLesson(this.state.lessonId);
         });
     }

    deleteExamWidget = (widgetId) => {
        fetch("https://webdev-smr1.herokuapp.com/api/exam/" + widgetId,
            {
                method: 'DELETE'
            }).then(() => {
            this.findWidgetsForLesson(this.state.lessonId);
        });
    }


    createAssignment = () =>{
        fetch("https://webdev-smr1.herokuapp.com/api/lesson/"+ this.state.lessonId +"/assignment",{
            method:'post',
            body: JSON.stringify(this.state.assignment),
            headers: {
                'content-type' : 'application/json'
            }}) .then(response => (response.json()))
            .then(() => {
                this.findWidgetsForLesson(this.state.lessonId);
            });
    }

    createExam = () =>{
        fetch("https://webdev-smr1.herokuapp.com/api/lesson/"+ this.state.lessonId +"/exam",{
            method:'post',
            body: JSON.stringify(this.state.exam),
            headers: {
                'content-type' : 'application/json'
            }}) .then(response => (response.json()))
            .then(() => {
                this.findWidgetsForLesson(this.state.lessonId);
            });
    }

     findWidgetsForLesson = (lessonId) =>{
         fetch("https://webdev-smr1.herokuapp.com/api/lesson/"+lessonId+"/widget")
             .then(response => (response.json()))
             .then(widgets => this.setState({widgets}))
     }





    render() {
        return(
            <ScrollView>
                <Card>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width:200}}>
                        <Text h4>Assignments</Text>
                    </View>
                    <View style={{width:100,marginLeft:70}}>
                        <Icon
                            onPress={() => this.createAssignment() }
                            reverse
                            name='plus-circle'
                            type='font-awesome'
                            size={40}
                        />
                    </View>
                </View>

                {this.state.widgets
                    .filter(function(widget){if(widget.typ == 'Assignment') return widget})
                    .map(
                    (widget, index) => (
                        <ListItem
                            key={index}
                            onPress={() => this.props.navigation
                                .navigate('AssignmentWidget',{widgetId: widget.id,lessonId:this.state.lessonId})}
                            title={widget.title}
                           leftIcon={<Icon
                                reverse
                                name='trash'
                                type='font-awesome'
                                size={30}
                                onPress={() => this.deleteAssignmentWidget(widget.id)}
                                style={{paddingRight:20}}
                           />}
                        />))}

                </Card>
                <Card>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width:200}}>
                        <Text h4>Exams</Text>
                    </View>
                    <View style={{width:100,marginLeft:70}}>
                        <Icon
                            onPress={() => this.createExam() }
                            reverse
                            name='plus-circle'
                            type='font-awesome'
                            size={40}
                        />
                    </View>
                </View>
                 {this.state.widgets
                    .filter(function(widget){if(widget.typ == 'Exam') return widget})
                    .map(
                        (widget, index) => (
                            <ListItem
                                key={index}
                                onPress={() => this.props.navigation
                                    .navigate('ExamWidget',{widgetId: widget.id,lessonId:this.state.lessonId}) }
                                title={widget.examTitle}
                                leftIcon={<Icon
                                    reverse
                                    name='trash'
                                    type='font-awesome'
                                    size={30}
                                    onPress={() => this.deleteExamWidget(widget.id)}
                                    style={{paddingRight:20}}/>}
                            />
                           ))}
                </Card>
            </ScrollView>
        )
    }
}
export default WidgetList