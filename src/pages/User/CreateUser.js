import React, { useEffect, useState } from "react"

import {
    Card,
    CardBody,
    Col,
    Row,
    CardTitle,
    FormGroup,
    Form
} from "reactstrap"

import { connect } from "react-redux";
import { useDispatch } from 'react-redux'
import Select from "react-select";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";
import { fetchOtp, getOtp, getUserType, verifyOtp } from "helpers/user_helper";
import { toast } from "react-toastify";
import { addUser } from "store/user/action";






const CreateUser = (props) => {
    document.title = "Question Bank | Create User";
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [grandFatherName, setGrandFatherName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [type, setType] = useState("");
    const [position, setPosition] = useState("");
    const [verify, setVerify] = useState(false);
    const [otpFeildDisplay, setOtpFeildDisplay] = useState(false);
    const [otpButtonDisplay, setOtpButtonDisplay] = useState(true);
    const [allUserTypes, setAllUserTypes] = useState([]);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [spanDisplay, setSpanDisplay] = useState("none");
    const dispatch = useDispatch();




    const breadcrumbItems = [
        { title: "User", link: "#" },
        { title: "Create User", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('Create User', breadcrumbItems)
    })

    useEffect(() => {
        fetchUserTypes();
    }, [])

    const fetchUserTypes = async () => {
        const result = await getUserType();
        console.log(result);
        setAllUserTypes(result?.result);
    }

    const sendOtp = async () => {
        if (!email) {
            toast.error("Enter email id");
        }
        else {
            const result = await fetchOtp({ email });
            if (result.success) {
                toast.success(result.message);
                setOtpFeildDisplay(true);
            }
            else {
                toast.error(result.message);
            }
        }
    }

    const handleOtpChange = async (e) => {
        setOtp(e.target.value);
        let otp = e.target.value;
        let emailId = email;

        const result = await verifyOtp({ otp, emailId });
        if (result.success) {
            toast.success(result.message);
            setVerify(true);
            setOtpButtonDisplay(false);
            setIsReadOnly(true)
        }
        else {
            toast.error(result.message);
        }
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !phoneNumber || !fatherName || !grandFatherName || !position || !type || !password || !confirmPassword) {
            setSpanDisplay("inline")

        }
        else {
            if (password !== confirmPassword) {
                toast.error("Pasword and confirm password did not match");
            }
            else {
                // dispatch(add)
                let userType = type.typeName
                dispatch(addUser({ name, email, phoneNumber, fatherName, grandFatherName, position, userType, password, confirmPassword }));
            }
        }
    };


    const handleSelectType = selectedValue => {
        // console.log(selectedValue);
        setType(selectedValue);
    }





    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <CardBody className="col-lg-6 col-sm-12 col-xs-12">
                            <CardTitle className="h4">Create User</CardTitle>
                            <form onSubmit={handleSubmit}>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Name
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter User Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)} />
                                        {!name && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}

                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Email
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter Email Id"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} readOnly={isReadOnly} />
                                        {!email && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                                {/* {otpButtonDisplay && <Row className="mb-3">
                                    <div className="mt-4">
                                        <button type="button" className="btn btn-primary w-md" onClick={sendOtp}>Send Otp</button>
                                    </div>
                                </Row>}

                                {otpFeildDisplay && <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Otp
                                    </label>
                                    <div className="col-md-10">
                                        <input type="number"
                                            className='form-control'
                                            placeholder="Enter Otp"
                                            value={otp}
                                            onChange={(e) => handleOtpChange(e)} readOnly={isReadOnly} />
                                    </div>
                                </Row>} */}
                                {/* {verify &&
                                    <> */}
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Phone Number
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter Phone Number"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)} />
                                        {!phoneNumber && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Father Name
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter Father Name"
                                            value={fatherName}
                                            onChange={(e) => setFatherName(e.target.value)} />
                                        {!fatherName && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Grand Father Name
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter Grand Father Name"
                                            value={grandFatherName}
                                            onChange={(e) => setGrandFatherName(e.target.value)} />
                                        {!grandFatherName && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Position
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter Position"
                                            value={position}
                                            onChange={(e) => setPosition(e.target.value)} />
                                        {!position && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        User Type
                                    </label>
                                    <div className="col-md-10">
                                        <Select

                                            value={type}
                                            onChange={handleSelectType}
                                            options={allUserTypes}
                                            getOptionLabel={option => option.typeName}
                                            getOptionValue={option => option.id.toString()}
                                            classNamePrefix="select2-selection"
                                        />
                                        {!type && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>

                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Password
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} />
                                        {!password && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Confirm Password
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="Enter Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)} />
                                        {!confirmPassword && <span style={{ color: "red", display: spanDisplay }}>This feild is required</span>}
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-primary w-md">Submit</button>
                                    </div>
                                </Row>
                                {/* </>} */}
                            </form>

                        </CardBody>
                    </Card>
                </Col>
            </Row>



        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(CreateUser);