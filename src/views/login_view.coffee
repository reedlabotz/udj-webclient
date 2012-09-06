class LoginView extends Backbone.View
  events: {
    "submit form[id=loginForm]" : "login"
  }

  constructor: ->
    super
    _.bindAll @
    @setElement $("#login_container")
    @model.on "session:loggedOut", @loggedOut
    @model.on "session:loggedIn", @loggedIn
    @model.on "session:loginFailed", @loginFailed
    if not @model.isValid()
      @render()

  render: ->
    @$el.show()

  login: (event) =>
    @model.login @$("[name=username]").val(), @$("[name=password]").val()
    return false

  loginFailed: (headers) =>
    if headers?('WWW-Authenticate') is 'password'
      alert 'Invalid username or password'
    else
      alert 'An unknown error has occurred. Please try again.'

  loggedOut: (event) =>
    @render()

  loggedIn: (event) =>
    @$el.hide()
