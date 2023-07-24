import { styled } from 'styled-components';

export const Section = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${props => (props.$flexDirection ? 'row-reverse' : 'row')};

  @media (max-width: 900px) {
    flex-direction: column;
  }

  .frame {
    width: 50%;
    height: 40rem;
    background: ${({ theme }) => theme.color.first};
    border-radius: 10px;
  }
  .text {
    font-size: ${({ theme }) => theme.font.size.lg};
    width: 40%;
  }
`;
