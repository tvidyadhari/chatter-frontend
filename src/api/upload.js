import { toast } from "react-toastify";

export default async function uploadImage(file) {
  let id = null;
  try {
    id = toast.info("Uploading", {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
    const res = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: "POST",
      body: data,
    });
    const img = await res.json();
    return img.secure_url;
  } catch (error) {
    throw error;
  } finally {
    toast.dismiss(id);
  }
}
