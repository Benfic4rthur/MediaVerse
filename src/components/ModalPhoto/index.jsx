import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { LuX } from 'react-icons/lu';

import { UseAuthValue } from '../../context/AuthContext';
import { DialogOverlay, IconButton } from '../../styles/styledDialog';
import { Subtitle } from '../../styles/styledGlobal';
import {
  ButtonActive,
  ButtonAvatar,
  ContainerButtonAvatar,
  DialogContent,
  ImageAvatar,
} from './styled';
import { mediaUpload } from '../../utils/mediaUpload';
import { deleteObject, ref, getStorage } from 'firebase/storage';


  const { imgUser } = UseAuthValue();

  const [open, setOpen] = useState(false);
  const [userImage, setUserImage] = useState('');

  useEffect(() => {
    const func = async () => {
      const ImageUrl = await Promise.all(
        imgUser?.[userGender]?.map(async image => {
          try {
            const url = await import(`../../assets/avatares/${userGender}/${image}.jpg`);

            return { url: url.default, nameImage: image };
          } catch (error) {
            console.log(error);
          }
        }),
      );
      setImages(ImageUrl.filter(e => e?.url));
    };

    func();
  }, [userGender]);

  function handleGetUserImage(event) {
    setUserImage(URL.createObjectURL(event.target.files[0]));
    setImages(prevState => [
      ...prevState,
      { url: URL.createObjectURL(event.target.files[0]), nameImage: event.target.files[0].name },
    ]);
    console.log(Images);
  }

  async function handlePhoto() {
    const mediaThumb = document.getElementById('mediaThumb')?.files?.[0];
    const storage = getStorage();
    if (avatarName) {
      const desertRef = ref(storage, `avatars/${avatarName}`);
      await deleteObject(desertRef);
    }

    try {
      console.log(mediaThumb);
      mediaUpload(mediaThumb, 'avatars', null, ({ mediaURL, name }) => {
        setPhotoURL(mediaURL);
        setAvatarName(name);
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <ButtonActive {...rest}>{children}</ButtonActive>
        </Dialog.Trigger>
        <Dialog.Portal>
          <DialogOverlay />

          <DialogContent>
            <Subtitle as={Dialog.Title} className='DialogTitle'>
              Escolha seu Avatar:
            </Subtitle>

            <ContainerButtonAvatar>
              {imageURL.map((e, i) => (
                <ButtonAvatar
                  key={i}
                  onClick={() => {
                    setPhotoURL(e?.nameImage);
                    setOpen(false);
                  }}
                >
                  <ImageAvatar src={e?.url} alt='' />
                </ButtonAvatar>
              ))}
              <input type="file"  />
            </ContainerButtonAvatar>

            <form>
              <label htmlFor='img'>Selecione sua foto</label>
              <input type='file' id='mediaThumb' accept='image/*' onChange={handleGetUserImage} />
              <button onClick={handlePhoto} type='button'>
                Alterar
              </button>
            </form>

            <Dialog.Close asChild>
              <IconButton aria-label='Close'>
                <LuX />
              </IconButton>
            </Dialog.Close>
          </DialogContent>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
