import { deleteObject, getStorage, ref } from 'firebase/storage';

export async function deleteStorageMedia(storageRef, MideaName) {
  const storage = getStorage();
  if (MideaName)
    try {
      const desertRef = ref(storage, `${storageRef}/${MideaName}`);
      await deleteObject(desertRef);
    } catch (error) {
      // 
    }
}
