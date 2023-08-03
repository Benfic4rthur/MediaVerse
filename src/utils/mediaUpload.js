
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { generateRandomName } from "./generateRandomName";
import { storage } from "../firebase/config";


export function mediaUpload(
  media,
  storageRef,
  setProgress = () => {},
  // eslint-disable-next-line no-unused-vars
  callback = ({ mediaURL =  '', name = '' }) => {},
) {
  const randomNameThumb = generateRandomName(media.name);
  const mediaStoraThumbRef = ref(storage, `${storageRef}/${randomNameThumb}`);
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

      callback({ mediaURL, name: randomNameThumb });
    },
  );
}
