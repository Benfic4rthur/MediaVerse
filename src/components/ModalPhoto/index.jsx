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

export const DialogPhoto = ({ children, userGender, setPhotoURL, ...rest }) => {
  const [imageURL, setImages] = useState([]);
  const { imgUser } = UseAuthValue();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const func =  async () => {
      const ImageUrl = await Promise.all(
        imgUser?.[userGender]?.map(async image => {
          try {
            const url = await import(`../../assets/avatares/${userGender}/${image}.jpg`);

            return { url: url.default, nameImage: image };
          } catch (error) {
            console.log(error);
          }
        }),
      )
      setImages(ImageUrl.filter(e => e?.url));
    };

    func()

  }, [userGender]);

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
