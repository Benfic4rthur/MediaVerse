import { styled, keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 10rem;
  width: 100%;
  height: 20rem;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const Text = styled.p`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 20%;

  h2 {
    font-size: 2.5rem;
    padding-bottom: 1rem;
  }
  div {
    font-size: 1.3rem;
    line-height: 20px;
  }
`;
export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;

  .button {
    padding: 1rem;
    background: ${({ theme }) => theme.color.first};
    border-radius: 10px;
    font-size: 2rem;

    display: flex;
    align-items: center;
    gap: 5px;
    transition: 0.7s;

    &:hover {
      transform: scale(1.15);
      transition: 0.7s;
    }
  }
  .link {
    text-decoration: none;
    color: ${({ theme }) => theme.color.fourthOpacity};
  }
`;
