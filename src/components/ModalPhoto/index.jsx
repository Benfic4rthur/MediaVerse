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
} from './styled';

export const DialogPhoto = ({
  children,
  userGender,
  setPhotoURL,
  setAvatarName,
  avatarName,
  ...rest
}) => {
  const [Images, setImages] = useState([]);
  const { imgUser } = UseAuthValue();
  const [open, setOpen] = useState(false);
  const [userImage, setUserImage] = useState([]);
  const [progressPercent, setProgressPercent] = useState(0);

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
      mediaUpload(mediaThumb, 'avatars', setProgressPercent, ({ mediaURL, name }) => {
        setPhotoURL(mediaURL);
        setAvatarName(name);
        setOpen(false);
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
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
                    setPhotoURL(e?.nameImage);
                    setOpen(false);
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
              placeholder='Adicionar Avatar'
              title='Adicionar Avatar'
              type='file'
              id='mediaThumb'
              accept='image/*'
              onChange={handleGetUserImage}
            />

            <ContainerProgressPercent>
              {progressPercent >= 1 && <Progress value={progressPercent} min='0' max='100' />}
            </ContainerProgressPercent>

            <Dialog.Close asChild onClick={()=>{setUserImage([])}}>
              <IconButton aria-label='Close'>
                <LuX />
              </IconButton>
            </Dialog.Close>
          </DialogContent>
        </Dialog.Portal>
      </Dialog.Root>
  );
};
