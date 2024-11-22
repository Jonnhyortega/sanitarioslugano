import styled from "styled-components";

export const UsContainer = styled.section`
  width: 100%;
  height: auto;

  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const UsContent = styled.div`
  width: 100%;
  max-width: 1100px;
  // background-color: rgba(0, 0, 0, 0.7);
  // box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  padding: 40px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
export const UsSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: left;
  max-width: 900px;
`;

export const UsImage = styled.img`
  width: 180px;
  height: auto;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
`;

export const UsTitle = styled.h2`
  font-size: 3em;
  font-weight: bold;
  margin-bottom: 20px;
  color: var(--blue1);
`;

export const UsSubTitle = styled.h3`
  font-size: 1.5em;
  font-weight: 300;
  margin-bottom: 30px;
  color: var(--blue2);
`;

export const UsText = styled.div`
  font-size: 1.2em;
  line-height: 1.5;
  color: black;
  p {
    margin-bottom: 20px;
  }

  strong {
    font-weight: bold;
    color: var(--blue2);
  }
`;
