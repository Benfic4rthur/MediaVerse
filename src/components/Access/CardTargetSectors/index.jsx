import { useRef } from "react";
import { ContainerImage, Sectors } from "./styled";
import { useAnimation } from "../../../hooks/useAnimation";

export function CardTargetSectors({src, alt, description, typeAnimated}) {
  const ref = useRef(null);

  const { showAnimation } = useAnimation(ref);

  return (
    <Sectors ref={ref} className={showAnimation ? typeAnimated : ''}>
      <ContainerImage>
        <img src={src} alt={alt} />
      </ContainerImage>
      <p>{description}</p>
    </Sectors>
  );
}
