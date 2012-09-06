class SessionModel extends Backbone.Model
  defaults : {
    "ticket_hash" : null
    "user_id" : null
  }

  constructor: ->
    super
    _.bindAll @
    _.extend @, Backbone.Events
    @fetch()

  login: (username, password) ->
    jQuery.post("https://www.udjplayer.com/udj/0_6/auth", "username=#{username}&password=#{password}")
      .done((data) => if @set(data) then @save())
      .fail((data) => @trigger("session:loginFailed", data.getResponseHeader))

  validate: (attributes) ->
    if attributes.ticket_hash? and attributes.user_id?
      @trigger "session:loggedIn"
      return
    else
      @trigger "session:loggedOut"
      "You are not logged in"

  sync: (method, model) ->
    if method is "create" or method is "update"
      ttl = 24 * 360 * 1000
      $.jStorage.set "udj-session", model.toJSON(), {TTL: ttl}
    else if method is "read"
      @set $.jStorage.get("udj-session")
    else if method is "delete"
      $.jStorage.removeKey "udj-session"
