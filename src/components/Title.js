import styled from "@emotion/styled";
import React from "react";

const TitleWrapStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LabelStyle = styled.h1`
  margin-top: 0;
`;

const Title = ({ label }) => {
  return (
    <TitleWrapStyle>
      <LabelStyle>{label}</LabelStyle>
    </TitleWrapStyle>
  );
};

export default Title;
