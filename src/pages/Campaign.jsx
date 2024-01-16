import React, { useState } from 'react';
import { storage } from '../firebase'; // Update this import path
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const Campaign = () => {
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      const storageRef = ref(storage, 'images/' + image.name);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error(error.code, error.message);
        },
        () => {
          // Upload completed successfully, now get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
            setIsUploading(false);
          });
        }
      );

      setIsUploading(true);
    }
  };

  const handleGoBack = () => {
    navigate("/admin")
  }

  return (
    <div className="container mx-auto mt-8 p-8 bg-gray-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Upload Campaign Images</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Select Image:</label>
        <input type="file" onChange={handleFileChange} />
      </div>

      {isUploading && (
        <div className="mb-4">
          <p className="text-sm font-semibold">Uploading...</p>
          <progress value={progress} max="100" className="w-full h-2 bg-blue-200"></progress>
        </div>
      )}

      {imageUrl && (
        <div className="mb-4">
          <p className="text-sm font-semibold">Image Preview:</p>
          <img src={imageUrl} alt="Uploaded" className="max-w-full h-auto rounded-lg" />
        </div>
      )}

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handleUpload}
        disabled={isUploading}
      >
        Upload
      </button>
      <button
          onClick={handleGoBack}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}
        >
          Go Back to Admin Page
        </button>
    </div>
  );
};

export default Campaign;
