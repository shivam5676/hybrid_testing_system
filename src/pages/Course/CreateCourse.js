import React, { useEffect, useState } from "react"

import {
    Card,
    CardBody,
    Col,
    Row,
    CardTitle,
    FormGroup,
    Form,
    Label
} from "reactstrap"

import Select from "react-select"

import { connect } from "react-redux";
import { useDispatch } from 'react-redux';
// import { addClass, updateClass } from './actions';

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";
import { addClass, fetchClass } from "store/class/action";
import { useSelector } from "react-redux";
import classesReducer from '../../store/class/reducer';
import { addCourse } from "store/course/action";


const CreateCourse = (props) => {
    document.title = "Question Bank | Create Course";



    const breadcrumbItems = [
        { title: "Course", link: "#" },
        { title: "Create Course", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('Create Course', breadcrumbItems)
    })

    const [toggleSwitch, settoggleSwitch] = useState(true)
    const [toggleSwitchSize, settoggleSwitchSize] = useState(true)
    const [classs, setClasss] = useState(null);
    const [selectedclasss, setSelectedClasss] = useState(null);
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [spanDisplay, setSpanDisplay] = useState("none");
    const dispatch = useDispatch();
    const classes = useSelector(state => state.classesReducer)



    useEffect(() => {
        if (classes?.classes.length == 0) {
            dispatch(fetchClass());
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        let classId = classs?.id
        if (!courseName || !courseDescription || !courseCode || !classId) {
            setSpanDisplay("inline")

        }
        else {
            dispatch(addCourse({ courseName, courseDescription, courseCode, classId, classs }));
        }
    };

    const handleSelectClass = selectedOption => {
        setClasss(selectedOption);
        setSelectedClasss(selectedOption);
        console.log(selectedOption);
    };


    const checkResult = () => {

    }

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <CardBody className="col-lg-6 col-sm-12 col-xs-12">
                            <CardTitle className="h4">Create Course</CardTitle>
                            <form onSubmit={handleSubmit}>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Class Name
                                    </label>
                                    <div className="col-md-10">
                                        <Select

                                            value={selectedclasss}
                                            onChange={handleSelectClass}
                                            options={classes?.classes?.result}
                                            getOptionLabel={option => option?.className + " (" + option?.classCode + ")"}
                                            getOptionValue={option => option?.id?.toString()} // Convert to string if classId is a number
                                            classNamePrefix="select2-selection"
                                        />
                                        {!classs && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>

                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Course Name
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter new Course"
                                            value={courseName}
                                            onChange={(e) => setCourseName(e.target.value)} />
                                        {!courseName && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Course Description
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter New Description"
                                            value={courseDescription}
                                            onChange={(e) => setCourseDescription(e.target.value)} />
                                        {!courseDescription && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Course Code
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter Course Code"
                                            value={courseCode}
                                            onChange={(e) => setCourseCode(e.target.value)} />
                                        {!courseCode && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-primary w-md">Submit</button>
                                    </div>
                                </Row>
                            </form>

                        </CardBody>
                    </Card>
                </Col>
            </Row>



        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(CreateCourse);