function FakeModal() {
  this.element = $('<div id="fake-modal">fake</div>')
  this.element.hide();
}
FakeModal.prototype.show = function() {
  this.element.show();
}

describe("AuthenticationView", function() {
  var args, linkSelector, container;
  beforeEach(function() {
    container = affix("#hi")
    linkSelector = ".non-existant-link"
    args = {
        element: $("#hi"), 
        modal: FakeModal,
        link: linkSelector,
        session: "hi"
      }
  });
  describe("new", function() {
    ["session", "link", "modal", "element"].forEach(function(option) {
      it("requires a " + option + " argument", function() {
        delete args[option];
        expect(function() {
          new AuthenticationView(args)
        }).toThrow(option + " is a required argument");
      });
    });

    it("creates a modal from the modal option", function() {
      var authenticationView = new AuthenticationView(args);
      expect(authenticationView.modal.constructor).toBe(FakeModal)
    });
  });
  it("shows the modal when the link is clicked", function() {
    container.affix(linkSelector);
    var authenticationView = new AuthenticationView(args);
    $(linkSelector).click();
    expect(authenticationView.modal.element).toBeVisible();
  });
});