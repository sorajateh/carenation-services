export const useLoginModal = () => {

  const isAuthModal = useState('is-login-modal', () => true)

  const toggleAuthModal = () => {
    if ( !isAuthModal.value ) {
      isAuthModal.value = true
    } else {
      isAuthModal.value = false
    }
  }

  return {
    isAuthModal, toggleAuthModal
  }
  
}
