import styled from "@emotion/styled";

export const Root = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Img = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 4px;
`;

export const Title = styled.h3`
  background: linear-gradient(
    90deg,
    rgb(221, 122, 248) 0%,
    15.5224%,
    rgb(152, 108, 247) 31.0448%,
    49.2537%,
    rgb(104, 132, 247) 67.4627%,
    83.7313%,
    rgb(91, 172, 248) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 40px;
`;
