import { H2 } from "../../../pages/Access/styled";
import { CardFunctionality } from "../CardFunctionality";
import { Image } from "../CardFunctionality/styled";
import { ContainerCardFunctionality } from "./styled";

export function Functionality() {
  return (
    <>
      <H2 id='Functionality'>Funcionalidades</H2>
      <ContainerCardFunctionality>
        <CardFunctionality title={'lorem lorem lorem '} description={'texto '} typeAnimated='left'>
          <Image src='' alt='' />
        </CardFunctionality>
        <CardFunctionality
          reverse
          title={'lorem lorem lorem '}
          description={'texto '}
          typeAnimated='right'
        >
          <Image src='' alt='' />
        </CardFunctionality>
        <CardFunctionality title={'lorem lorem lorem '} description={'texto'} typeAnimated='left'>
          <Image src='' alt='' />
        </CardFunctionality>
        <CardFunctionality
          reverse
          title={'lorem lorem lorem '}
          description={'texto '}
          typeAnimated='right'
        >
          <Image src='' alt='' />
        </CardFunctionality>
      </ContainerCardFunctionality>
    </>
  );
}

