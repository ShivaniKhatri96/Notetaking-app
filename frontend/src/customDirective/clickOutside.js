// clickOutside.js

export default {
  // mounted inserts component into the DOM
  mounted(el, binding) {
    // Click handler
    const handleClick = (event) => {
      //click occured outside the element
      if (!el.contains(event.target)) {
        // binding is an object that contains various properties related to the directive, including value
        binding.value(event)
      }
    }

    // Attaching the event listener
    document.addEventListener('click', handleClick)

    //Cleanup on mount
    // the clickOutsideCleanup function is defined inside the mounted lifecycle hook
    // to ensure that it is set up when the component is inserted into the DOM.
    // This ensures that the event listener is properly cleaned up to prevent memory leaks or unexpected behavior
    el._clickOutsideCleanup = () => {
      document.removeEventListener('click', handleClick)
    }
  },
  // unmounted removes component from the DOM
  unmounted(el) {
    // Removing the event listener
    el._clickOutsideCleanup()
  }
}
