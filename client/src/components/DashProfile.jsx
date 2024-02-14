import { useSelector } from 'react-redux';
import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { app } from '../firebase';
import {
    updateStart,
    updateSuccess,
    updateFail,
    signoutSuccess,
} from '../redux/user/userSlice';
import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';


export default function DashProfile() {
    const { currentUser, error, loading } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [ imageFile, setImageFile ] = useState(null);
    const [ imageFileUrl, setImageFileUrl ] = useState(null);
    const [ imageFileUploadProgress, setImageFileUploadProgress ] = useState(null);
    const [ imageFileUploading, setImageFileUploading ] = useState(false);
    const [ imageFileUploadError, setImageFileUploadError] = useState(null);
    const [ updateUserSuccess, setUpdateUserSuccess ] = useState(null);
    const [ updateUserError, setUpdateUserError ] = useState(null);
    const [ formData, setFormData ] = useState({});
    const filePickerRef = useRef();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };
    
    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {
        setImageFileUploading(true);
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError('Error! File must be less than 2MB');
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
                setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({ ...formData, profilePicture: downloadURL });
                    setImageFileUploading(false);
                });
            }
        );
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserSuccess(null);
        setUpdateUserError(null);
        if (Object.keys(formData).length === 0) {
            setUpdateUserError('No changes detected');
            return;
        }
        if (imageFileUploading) {
            setUpdateUserError('Please wait...');
            return;
        }
        try {
            dispatch(updateStart);
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(updateFail(data.message));
                setUpdateUserError(data.message);
            } 
            if (res.ok) {
                dispatch(updateUserSuccess(data));
                setUpdateUserSuccess('Update successful!');

            }
        } catch (error) {
            dispatch(updateFail(error.message));
            setUpdateUserError(data.message);
        }
    };

    const handleSignOut = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST'
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(error.message)
            } else {
                dispatch(signoutSuccess);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-bold text-3xl'>My Profile</h1>
            <form></form>
        </div>
    )
}
