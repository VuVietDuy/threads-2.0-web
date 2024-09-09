import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react'

function usePreviewImg() {
    const [imgUrl, setImgUrl] = useState(null);
    const toast = useToast()

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImgUrl(reader.result);
            }
            reader.readAsDataURL(file);
        } else {
            toast({
                title: 'Invalid File',
                description: 'Please select an image file (JPG, PNG, GIF)',
                status: 'error',
            })
            setImgUrl(null);
        }
    }
    return { handleImageChange, imgUrl, setImgUrl }
}

export default usePreviewImg