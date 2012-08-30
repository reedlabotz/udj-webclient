class AppView extends Backbone.View
  el: $("#udjapp"),

  events: {
    "click #logout": "logout"
  }

  logout: () ->
    alert("you clicked logout")