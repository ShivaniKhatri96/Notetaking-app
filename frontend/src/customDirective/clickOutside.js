// clickOutside.js

export default {
    mounted(el, binding) {
      // Click handler
      const handleClick = (event) => {
        if (!el.contains(event.target)) {
          // Click occurred outside the element
          binding.value(event);
        }
      };
  
      // Attach the event listener
      document.addEventListener('click', handleClick);
  
      // Cleanup on unmount
      el._clickOutsideCleanup = () => {
        document.removeEventListener('click', handleClick);
      };
    },
    unmounted(el) {
      // Remove the event listener
      el._clickOutsideCleanup();
    },
  };
  