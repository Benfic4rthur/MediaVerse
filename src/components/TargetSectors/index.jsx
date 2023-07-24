import logo from '../../assets/logo.png';
import { Container, Sectors } from './styled';

export default function TargetSectors() {
  return (
    <>
      <Container>
        <Sectors>
          <div>
            <img src={logo} alt='' />
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, perferendis.
          </div>
        </Sectors>
        <Sectors>
          <div>
            <img src={logo} alt='' />
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, perferendis.
          </div>
        </Sectors>
        <Sectors>
          <div>
            <img src={logo} alt='' />
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, perferendis.
          </div>
        </Sectors>
        <Sectors>
          <div>
            <img src={logo} alt='' />
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, perferendis.
          </div>
        </Sectors>
      </Container>
    </>
  );
}
