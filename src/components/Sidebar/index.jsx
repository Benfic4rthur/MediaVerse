import { ContainerSidebar } from '../../pages/Post/Index/styled';
import { Subtitle as SubtitleGlobal } from '../../styles/styledGlobal';
import { CardSidebar } from '../CardSidebar';
import { Subtitle } from '../CardSidebar/styled';
import { ContainerCenter } from './styled';

export function Sidebar({ tagsVal }) {
  return (
    <ContainerSidebar>
      <ContainerCenter>
        <SubtitleGlobal>Vídeos relacionados:</SubtitleGlobal>
      </ContainerCenter>
      {tagsVal?.length > 0 ? (
        tagsVal?.map?.((e, i) => <CardSidebar props={e} key={i} />)
      ) : (
        <Subtitle style={{ color: 'hsl(0, 0%, 95%)' }}>Nenhum video encontrado</Subtitle>
      )}
    </ContainerSidebar>
  );
}
