// import styled from 'styled-components';

// export const ContainerHome = styled.div`
//   height: 100%;
//   width: 100%;
//   display: grid;
//   grid-template-rows: min-content 1fr;
//   grid-template-columns: 1fr;
//   overflow: scroll;
//   gap: 3rem;
// `;

// export const PostsContainer = styled.section`
//   display: flex;
//   gap: 2rem;
//   flex-flow: row wrap;
//   justify-content: center;
//   background: red;
// `;

import styled from 'styled-components';

export const ContainerHome = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: min-content min-content 1fr;
  grid-template-columns: auto;
  gap: 3rem;
`;

export const PostsContainer = styled.section`
  display: flex;
  gap: 1.5rem;
  min-width: 100%;
  min-height: min-content;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`;

export const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: space-between;

  @media (max-width: 40rem) {
    flex-flow: column;
  }
`;

export const ButtonSystem = styled.div`
  color: ${({ theme }) => theme.color.fourth};
  background: ${({ theme }) => theme.color.first};
  padding: 2rem 2rem;
  font-size: ${({ theme }) => theme.font.size.sm};
  border-radius: ${({ theme }) => theme.border.radius};
  cursor: pointer;
  transition: 0.7s;

  &:hover {
    background-color: ${({ theme }) => theme.color.firstHover};
    transform: scale(1.05);
  }
`;
