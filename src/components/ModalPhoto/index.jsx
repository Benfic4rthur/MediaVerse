import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { LuImagePlus, LuX } from 'react-icons/lu';

import { getAuth, updateProfile } from 'firebase/auth';
import { UseAuthValue } from '../../context/AuthContext';
import { Progress } from '../../styles/StyledPostForm';
import { DialogOverlay, IconButton } from '../../styles/styledDialog';
import { Subtitle } from '../../styles/styledGlobal';
import { UpdateDocument } from '../../utils/UpdateDocument';
import { deleteStorageMedia } from '../../utils/deleteStorageMedia';
import { mediaUpload } from '../../utils/mediaUpload';
import { CustomInputTypeFile } from '../CustomInputTypeFile';
import {
  Backdrop,
  ButtonActive,
  ButtonAvatar,
  ContainerButtonAvatar,
  ContainerProgressPercent,
  DialogContent,
  ImageAvatar,
} from './styled';

export const DialogPhoto = ({
  children,
  userGender,
  setPhotoURL,
  setAvatarName,
  avatarName,
  collectionId,
  ...rest
}) => {
  const { imgUser, setReload, userData } = UseAuthValue();
  const [Images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [userImage, setUserImage] = useState([]);
  const [progressPercent, setProgressPercent] = useState(0);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const func = async () => {
      const ImageUrl = await Promise?.all(
        imgUser?.[userGender]?.map(async image => {
          try {
            const url = await import(`../../assets/avatares/${userGender}/${image}.jpg`);

            return { url: url?.default, nameImage: image };
          } catch (error) {
            // eslint-disable-next-line no-unused-vars
            return error;
          }
        }),
      );
      setImages(ImageUrl?.filter(e => e?.url));
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

    const storageRef = 'avatars';

    await deleteStorageMedia(storageRef, avatarName);

    try {
      mediaUpload(
        mediaThumb,
        userData.userName,
        storageRef,
        setProgressPercent,
        async ({ mediaURL, name }) => {
          setProgressPercent(0);

          await Promise.all([
            UpdateDocument('userInfo', collectionId, {
              photoURL: mediaURL,
              avatarName: name,
            }),
            updateProfile(user, { photoURL: mediaURL }),
          ]);

          setProgressPercent(0);
          setReload(e => ++e);

          setPhotoURL(mediaURL);
          setAvatarName(name);
          setOpen(false);
        },
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAvatar({ e }) {
    const storageRef = 'avatars';

    await deleteStorageMedia(storageRef, avatarName);

    try {
      const newValue = {
        photoURL: e?.nameImage,
        avatarName: '',
      };

      setPhotoURL(e?.nameImage);
      await Promise.all([
        UpdateDocument('userInfo', collectionId, newValue),
        updateProfile(user, { photoURL: e?.nameImage }),
      ]);

      setReload(e => ++e);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  const handleBackdropClick = event => {
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
                  onClick={() => {
                    handleAvatar({ e });
                  }}
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
