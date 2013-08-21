function LogoutView(session, element){
  element.on('click', '.logout-link',  function() {
    session.logOut();
  });
}