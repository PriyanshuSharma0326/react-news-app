import React, { useContext, useEffect, useState } from 'react';
import './update-profile.style.scss';
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
import { PulseLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { validateUsername } from '../../lib/utils/utils';
import { UserContext } from '../../context/user-context';
import { updateUserProfile } from '../../lib/utils/firebase.utils';
import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component';

function UpdateProfile() {
    const navigate = useNavigate();

    const { userDoc } = useContext(UserContext);

    const goToAccountPage = () => {
        navigate('/account');
    }

    const [formInputs, setFormInputs] = useState({
        displayName: '',
        phoneNumber: '',
        photoURL: '',
        username: ''
    });

    const defaultFormErrors = {
        displayName: '',
        phoneNumber: '',
        username: '',
        image: ''
    };

    const [formErrors, setFormErrors] = useState(defaultFormErrors);

    const [isLoading, setIsLoading] = useState(false);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormInputs({...formInputs, [name]: value});
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const image = e.target[3].files[0];

        const validationErrors = {};

        if(!formInputs.displayName.trim()) {
            validationErrors.displayName = 'Display name is required';
        }

        if(!formInputs.phoneNumber.trim()) {
            validationErrors.phoneNumber = 'Phone number is required';
        }

        if(!formInputs.username.trim()) {
            validationErrors.username = 'username is required';
        }
        else if(!validateUsername(formInputs.username.trim())) {
            validationErrors.username = 'Special characters not allowed';
        }

        if(image && image.size > 1000000) {
            validationErrors.image = '*Please select a file less than 1MB';
        }

        if(Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        if(Object.keys(validationErrors).length === 0) {
            setFormErrors(defaultFormErrors);
            setIsLoading(true);
            try {
                await updateUserProfile(formInputs, image, userDoc.uid);
            }
            catch(err) {
                alert("Can't update user profile!");
            }
        }

        setIsLoading(false);
        navigate('/account');
    }

    useEffect(() => {
        try {
            setFormInputs({
                displayName: userDoc.displayName,
                phoneNumber: userDoc.phoneNumber,
                photoURL: userDoc.photoURL,
                username: userDoc.username
            });
        }
        catch(err) {
            alert('Error updating form!');
        }
    }, [])

    return (
        <div className='update-profile-page-container'>
            <div className='update-profile-form-container'>
                <h2>Update Profile</h2>

                <div className="user-image-container">
                    <img src={userDoc.photoURL} alt="" />
                </div>

                <form id='profile-update-form' onSubmit={submitHandler}>
                    <FormInput 
                        labelText='Display Name' 
                        errorText={formErrors.displayName} 
                        inputOptions={{
                            type: 'text',
                            id: 'displayName',
                            name: 'displayName',
                            onChange: changeHandler,
                            value: formInputs.displayName
                        }}
                    />

                    <FormInput 
                        labelText='Phone Number' 
                        errorText={formErrors.phoneNumber} 
                        inputOptions={{
                            type: 'number',
                            id: 'phoneNumber',
                            name: 'phoneNumber',
                            onChange: changeHandler,
                            value: formInputs.phoneNumber
                        }}
                    />

                    <FormInput 
                        labelText='Username' 
                        errorText={formErrors.username} 
                        inputOptions={{
                            type: 'text',
                            id: 'username',
                            name: 'username',
                            onChange: changeHandler,
                            value: formInputs.username
                        }}
                    />

                    <div className="image-input-group">
                        <div className="image-input-container">
                            <label htmlFor='image'>
                                <AddPhotoAlternateTwoToneIcon />
                                <span>Change profile photo</span>
                            </label>
                            <input 
                                className='image-input' 
                                type='file' 
                                id='image' 
                                name='image'
                            />
                            <span>*Max size: 1MB</span>
                        </div>
                        <span className="error">{formErrors.image}</span>
                    </div>
                </form>

                {isLoading ? 
                <div className="loader">
                    <PulseLoader size='6' color="#1DB954" />
                </div> : 
                <div className="buttons-container">
                    <Button 
                        buttonText='Cancel' 
                        type='button' 
                        buttonType='inverted' 
                        onClick={goToAccountPage} 
                    />
                    <Button 
                        form='profile-update-form' 
                        buttonText='Update' 
                        type='submit' 
                    />
                </div>}
            </div>
        </div>
    )
}

export default UpdateProfile;
