import { styled } from 'styled-components';
import { ButtonForm } from '../../styles/formStyled';

export const ContainerForm = styled.section`
  height: fit-content;
  width: min(100%, 75rem);
  display: flex;
  padding: 3rem 2rem min(15vh, 4rem);
  box-shadow: 0.2rem 0.2rem 0.5rem ${({ theme }) => theme.color.shadow};

  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
  gap: 2.3rem;
  border-radius: ${({ theme }) => theme.border.radius};
  background-color: ${({ theme }) => theme.color.thirdOpacity03};
`;

export const ResetButton = styled(ButtonForm)`
  background-color: ${({ theme }) => theme.color.secondOpacity03};
  color: ${({ theme }) => theme.color.fourth};

  &:hover {
    background-color: ${({ theme }) => theme.color.thirdBg};
    color: ${({ theme }) => theme.color.fourthOpacity};
  }
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.4rem;
`;
