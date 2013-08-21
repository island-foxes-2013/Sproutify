function LogoutView(session, element){
  console.log(element);
  element.on('click', '.logout-link',  function(e) {
    e.preventDefault();
    session.logOut();
  });
}