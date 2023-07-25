import { useRef } from 'react';
import { useAnimation } from '../../../hooks/useAnimation';
import { ContainerImage, Image, Sectors } from './styled';

export function CardTargetSectors({ src, alt, description, typeAnimated }) {
  const ref = useRef(null);

  const { showAnimation } = useAnimation(ref);

  return (
    <Sectors ref={ref} className={showAnimation ? typeAnimated : ''}>
      <ContainerImage>
        <Image src={src} alt={alt} />
      </ContainerImage>
      <p>{description}</p>
    </Sectors>
  );
}
