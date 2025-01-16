export const useCard = () => {
  const sessionCard = useState('session-card', () => ({
    selectedCard: 0,
    name: ''
  }))

  const changeSelected = (selected: number) => {
    sessionCard.value.selectedCard = selected
  }

  return { sessionCard, changeSelected }
}
