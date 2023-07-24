import { Section } from './styled';

export default function Functionality({ reverse = false }) {
  return (
    <>
      <Section $flexDirection={reverse}>
        <div className='frame'>video</div>
        <div className='text'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut repellat ratione corrupti
          veniam omnis, consequatur eos minus illum libero veritatis?
        </div>
      </Section>
    </>
  );
}
