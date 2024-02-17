import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TextInput, FileInput, Button, Alert } from "flowbite-react";

export default function Album() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const [ file, setFile ] = useState(null);
  const [ formData, setFormData ] = useState({});
  const [ imageUploadError, setImageUploadError ] = useState(null);
  const [ publishError, setPublishError ] = useState(null);
  const [ publishSuccess, setPublishSuccess ] = useState(null);

  const handleImagUpload = async (e) => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      setFormData({ ...formData, userId: currentUser._id, file})
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) {
      setPublishSuccess(null);
      setPublishError('Error! Please try again!');
      return;
    }
    try {
      const res = await fetch('/api/album/create', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryBODBNK9vWWeDNOP1'},
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishSuccess(null);
        setPublishError(data.message);
      } else {
        setPublishError(null);
        setPublishSuccess('Huraay! Album publish!')
        navigate(`/album/${data.slug}`);
      }
      console.log(formData.title);
    } catch (error) {
      setPublishError('Oops! Something went wrong');
    }
  };
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className="text-center text-3xl my-7 font-bold">Create an Album</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="">
          <TextInput
          type="text"
          placeholder="Title"
          required
          id='title'
          name='title'
          className="flex-1"
          onChange={(e) => setFormData({ ...formData, title: e.target.value})} />
        </div>
        <div className="flex gap-4 items-center justify-between border-4
        border-teal-500 border-dotted p-3">
          <FileInput
          type='file'
          accept='image/*'
          name='image'
          onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))} />
          <Button type='button' gradientDuoTone='purpleToBlue'
          size='sm' outline onClick={handleImagUpload}>Upload</Button>
        </div>
        { imageUploadError && (
          <Alert color='failure' className="mt-5">
            {imageUploadError}
          </Alert>
        )}
        {formData.file && (
          <img 
          src={formData.file}
          alt='upload'
          className="w-full h-72 object cover" />
        )}
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
        {
          publishError && <Alert color='failure' className="mt-5">
            {publishError}
          </Alert>
        }
        {
          publishSuccess && <Alert color='failure' className="mt-5">
            {publishSuccess}
          </Alert>
        }
      </form>
    </div>
  )
}
