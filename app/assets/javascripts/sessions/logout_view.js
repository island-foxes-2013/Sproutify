function LogoutView(session, element){
  element.on('click', '.logout-link',  function(e) {
    debugger
    e.preventDefault();
    session.logOut();
  });
}