function after() {
    const menuItems = document.querySelectorAll(
      '.menu-home__item1, .menu-home__item2'
    );
    menuItems.forEach(item => {
      item.addEventListener('click', handleMenuItemClick);
    });

    function handleMenuItemClick(event) {
      menuItems.forEach(item => item.classList.remove('selected'));
      event.target.classList.add('selected');
    }

}
export {after}