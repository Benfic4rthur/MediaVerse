import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { generateRandomName } from "./generateRandomName";
import { storage } from "../firebase/config";

export function mediaUpload(media, setProgress = () => {}, callback = () => {}) {
  const randomNameThumb = generateRandomName(media.name);
  const mediaStoraThumbRef = ref(storage, `posts/${randomNameThumb}`);
  const mediaUploadTask = uploadBytesResumable(mediaStoraThumbRef, media);

  mediaUploadTask.on(
    'state_changed',
    snapshot => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress?.(progress);
    },
    error => console.error(error),
    async () => {
      const mediaURL = await getDownloadURL(mediaUploadTask.snapshot.ref);

      callback(mediaURL);
    },
  );
}
