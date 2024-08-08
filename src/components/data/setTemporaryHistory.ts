/**
 * Function to set id to all rect on board
 */
export const setIdSymbol = () => {
  Array.from(
    document.querySelectorAll('.main .rect') as NodeListOf<HTMLDivElement>
  ).map((rect: HTMLDivElement, index: number) => {
    rect.setAttribute('data-id', String(index))
  })
}
