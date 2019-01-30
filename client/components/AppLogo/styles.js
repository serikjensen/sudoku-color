import styled from 'styled-components'

export const HeaderStyles = styled.h2`
  font-weight: 300;
  text-align: center;
  color: ${({ theme }) => theme.color};
  font-size: ${({ theme }) => theme.fontSize};
  margin-bottom: 0.25rem;
`

export const SwatchContainerStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
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
