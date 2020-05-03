import styled from '@emotion/styled'

export const HeaderStyles = styled.h2`
  font-weight: 300;
  text-align: center;
  color: ${({ theme }) => theme.color};
  font-size: ${({ theme }) => theme.fontSize};
  font-family: ${({ theme }) => theme.fontFamily};
  margin-bottom: 0.25rem;
`

export const SwatchContainerStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SwatchStyles = styled.div`
  background: ${(props) => generateTileColor(props)};
  border-radius: 50%;
  width: 0.625rem;
  height: 0.625rem;
  margin: 0 0.25rem;
`

const generateTileColor = (props) => {
  const { value, theme } = props
  return theme.swatches[value]
}
