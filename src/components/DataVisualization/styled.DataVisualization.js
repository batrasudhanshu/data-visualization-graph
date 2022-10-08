import styled from "styled-components";

const DataVisualizationWrapper = styled.div`
  width: 100%;
  height: 100%;

  .container {
    width: 90%;
    margin: auto;
    display: flex;
    padding-top: 15%;
    //justify-content: center;
    flex-direction: column;
    //height: 100%;
    &__heading {
      span {
        font-size: 50px;
        font-weight: 800;
        font-style: italic;
        color: white;
      }
      @media only screen and (max-width: 320px) {
        span {
          font-size: 25px;
        }
      }
      @media only screen and (max-width: 576px) and (min-width: 321px) {
        span {
          font-size: 30px;
        }
      }
    }
    &__body {
      margin-top: 5%;
      display: grid;
      grid-template-columns: 50% 50%;
      &__graph1,
      &__graph2 {
        display: flex;
        flex-direction: column;
        span {
          font-weight: 700;
          font-size: 24px;
        }
      }

      @media only screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        gap: 50px;
        margin-bottom: 150px;
      }
    }
  }
`;

export default DataVisualizationWrapper;
