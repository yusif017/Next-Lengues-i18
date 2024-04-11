import api from "./api";

const uploadImage = async (file: File,token:string): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('upload/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`

      },
    });

    const responseData = response.data;
    const imageUrl: string = responseData.filePath;
    
    return imageUrl;

  } catch (error) {
    throw error;
  }
};

export default uploadImage;
