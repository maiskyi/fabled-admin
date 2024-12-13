import { Root, Img, Title } from "./Logo.style";

import { SRC } from "./Logo.img";

export const Logo = () => {
  return (
    <Root>
      <Img src={SRC} />
      <Title>Fabled</Title>
    </Root>
  );
};
