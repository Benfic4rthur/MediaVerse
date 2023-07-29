import { useEffect } from 'react';
import { Contact } from '../../components/Access/Contact';
import {Footer} from '../../components/Access/Footer';

import { useLoaderData } from 'react-router-dom';
import { Functionality } from '../../components/Access/Functionality';
import { Header } from '../../components/Access/Header';
import {TargetSectors} from '../../components/Access/TargetSectors';
import { Video } from '../../components/Access/Video';
import { Container } from './styled';

export default function Access() {
  const data = useLoaderData();

  useEffect(() => {
    document.title = 'MediaVerse - Acesso';
  }, []);

  return (
    <>
      <Container>
        <Header />
        {/* <Suspense fallback={<></>}>
          <Await resolve={data.PostsData}>{data => }</Await>
        </Suspense> */}
        <Video getData={data.PostsData} />
        <Functionality />
        <TargetSectors />
        <Contact />
      </Container>
      <Footer />
    </>
  );
}
