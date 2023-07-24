import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rem;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;
export const Sectors = styled.div`
  background: ${({ theme }) => theme.color.first};
  width: 100%;
  height: 15rem;
  border-radius: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

export const ContainerSectors = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;
