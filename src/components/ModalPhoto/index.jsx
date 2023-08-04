import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { LuImagePlus, LuX } from 'react-icons/lu';

import { deleteObject, getStorage, ref } from 'firebase/storage';
import { UseAuthValue } from '../../context/AuthContext';
import { Progress } from '../../styles/StyledPostForm';
import { DialogOverlay, IconButton } from '../../styles/styledDialog';
import { Subtitle } from '../../styles/styledGlobal';
import { mediaUpload } from '../../utils/mediaUpload';
import { CustomInputTypeFile } from '../CustomInputTypeFile';
import {
  ButtonActive,
  ButtonAvatar,
  ContainerButtonAvatar,
  ContainerProgressPercent,
  DialogContent,
  ImageAvatar,
  Backdrop,
} from './styled';
import { getAuth, updateProfile } from 'firebase/auth';
import { SetNewValueDocument } from '../../utils/SetNewValueDocument';

export const DialogPhoto = ({
  children,
  userGender,
  setPhotoURL,
  setAvatarName,
  avatarName,
  collectionId,
  ...rest
}) => {
  const [Images, setImages] = useState([]);
  const { imgUser } = UseAuthValue();
  const [open, setOpen] = useState(false);
  const [userImage, setUserImage] = useState([]);
  const [progressPercent, setProgressPercent] = useState(0);
  const auth = getAuth();
  const user = auth.currentUser;

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
    setUserImage([
      { url: URL.createObjectURL(event.target.files[0]), nameImage: event.target.files[0].name },
    ]);
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
      mediaUpload(mediaThumb, 'avatars', setProgressPercent, async ({ mediaURL, name }) => {
        setPhotoURL(mediaURL);
        setAvatarName(name);

        const newValue = {
          photoURL: mediaURL,
          avatarName: name,
        };

        await SetNewValueDocument('userInfo', collectionId, newValue);

        await updateProfile(user, { photoURL: mediaURL });

        setOpen(false);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAvatar({e}) {
    const storage = getStorage();
    if (avatarName) {
      const desertRef = ref(storage, `avatars/${avatarName}`);
      await deleteObject(desertRef);
    }

    try {
          const newValue = {
          photoURL: e?.nameImage,
          avatarName: "",
        };

        await SetNewValueDocument('userInfo', collectionId, newValue);

        await updateProfile(user, { photoURL: "" });

        setOpen(false);
      
    } catch (error) {
      console.error(error);
    }
  }

  const handleBackdropClick = (event) => {
    // Verifica se o clique foi diretamente no fundo e não dentro do modal
    if (event.target === event.currentTarget) {
      setOpen(true);
      event.preventDefault(); // Impede o comportamento padrão do evento
    }
  };

  return (
    <>
      {open && <Backdrop onClick={handleBackdropClick} />}  
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
            {Images.map((e, i) => (
              <ButtonAvatar
                key={i}
                onClick={() => {handleAvatar({e})}}
              >
                <ImageAvatar src={e?.url} alt='' />
              </ButtonAvatar>
            ))}
            <>
              {userImage.length > 0 && (
                <>
                  {userImage.map((e, i) => (
                    <ButtonAvatar key={i} onClick={handlePhoto}>
                      <ImageAvatar src={e?.url} alt='' />
                    </ButtonAvatar>
                  ))}
                </>
              )}
            </>
          </ContainerButtonAvatar>

          <CustomInputTypeFile
            Svg={LuImagePlus}
            placeholder='Adicione um avatar e aguarde o carregamento...'
            title='Adicionar Avatar'
            type='file'
            id='mediaThumb'
            accept='image/*'
            onChange={handleGetUserImage}
          />

          <ContainerProgressPercent>
            {progressPercent >= 1 && <Progress value={progressPercent} min='0' max='100' />}
          </ContainerProgressPercent>

          <Dialog.Close
            asChild
            onClick={() => {
              setUserImage([]);
            }}
            title='Fechar'
          >
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
