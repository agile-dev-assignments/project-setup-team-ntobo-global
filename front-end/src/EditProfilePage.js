import './EditProfilePage.css'
import { useEffect, useState } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import bsCustomFileInput from 'bs-custom-file-input'
import InputGroup from 'react-bootstrap/InputGroup'
import { At } from 'react-bootstrap-icons'

// TODO: Validate inputs

const EditProfilePage = (props) => {

    // State variables for each respective text field
    const [firstNameVal, setFirstNameVal] = useState(props.user.firstName)
    const [lastNameVal, setLastNameVal] = useState(props.user.lastName)
    const [userNameVal, setUserNameVal] = useState(props.user.username)
    const [bioVal, setBioVal] = useState(props.user.bio)

    // Display file name when uploaded [taken from NewRecipePage.js]
    useEffect(() => {bsCustomFileInput.init()}, [])

    return (
        <>

            <div className="editProfilePageBody">

                <Form className="editProfilePageForm">

                    <Form.Group>
                    <div className="centerPhoto">
                        <img src={props.user.imagePath} alt="Current Profile Picture"></img>
                        <br />
                        <Form.File id="custom-file" className="uploadPhotoButton" label="Change Photo" custom />
                    </div>
                    </Form.Group>

                    <Form.Group>
                        
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" value={firstNameVal} onChange={(event) => setFirstNameVal(event.target.value)} />

                        <br />
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" value={lastNameVal} onChange={(event) => setLastNameVal(event.target.value)} />
                        <br/>

                        <Form.Label>Username</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="atIcon"><i><At /></i></InputGroup.Text>
                                
                            </InputGroup.Prepend>
                                <Form.Control type="text" value={userNameVal} onChange={(event) => setUserNameVal(event.target.value)} />
                        </InputGroup>
                        <br />

                        <Form.Label>Bio</Form.Label>
                        <Form.Control as="textarea" rows={4} value={bioVal} onChange={(event) => setBioVal(event.target.value)} />
                        <br />

                        <Button className="submitButton" variant="info" type="submit"> {/* TODO: Handle submit via backend vodoo onSubmit="funcName" */}
                            Save Changes
                        </Button>
                    </Form.Group>

                    </Form>
            </div>
        </>
    )
}

export default EditProfilePage