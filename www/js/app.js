(function() {
  var AppView, ExternalLibraryModel, LibraryEntryModel, LoginView, PlayerModel, PlaylistEntryModel, SessionModel, SongSetModel, SortingAlgorithmModel, UserModel,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  LoginView = (function(_super) {

    __extends(LoginView, _super);

    LoginView.prototype.events = {
      "submit form[id=loginForm]": "login"
    };

    function LoginView() {
      this.loggedIn = __bind(this.loggedIn, this);

      this.loggedOut = __bind(this.loggedOut, this);

      this.loginFailed = __bind(this.loginFailed, this);

      this.login = __bind(this.login, this);
      LoginView.__super__.constructor.apply(this, arguments);
      _.bindAll(this);
      this.setElement($("#login_container"));
      this.model.on("session:loggedOut", this.loggedOut);
      this.model.on("session:loggedIn", this.loggedIn);
      this.model.on("session:loginFailed", this.loginFailed);
      if (!this.model.isValid()) {
        this.render();
      }
    }

    LoginView.prototype.render = function() {
      return this.$el.show();
    };

    LoginView.prototype.login = function(event) {
      this.model.login(this.$("[name=username]").val(), this.$("[name=password]").val());
      return false;
    };

    LoginView.prototype.loginFailed = function(headers) {
      if ((typeof headers === "function" ? headers('WWW-Authenticate') : void 0) === 'password') {
        return alert('Invalid username or password');
      } else {
        return alert('An unknown error has occurred. Please try again.');
      }
    };

    LoginView.prototype.loggedOut = function(event) {
      return this.render();
    };

    LoginView.prototype.loggedIn = function(event) {
      return this.$el.hide();
    };

    return LoginView;

  })(Backbone.View);

  AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.prototype.el = $("#udjapp");

    AppView.prototype.events = {
      "click #logout": "logout"
    };

    AppView.prototype.logout = function() {
      return alert("you clicked logout");
    };

    return AppView;

  })(Backbone.View);

  SortingAlgorithmModel = (function(_super) {

    __extends(SortingAlgorithmModel, _super);

    function SortingAlgorithmModel() {
      return SortingAlgorithmModel.__super__.constructor.apply(this, arguments);
    }

    SortingAlgorithmModel.prototype.defaults = {
      id: null,
      name: null,
      description: null
    };

    return SortingAlgorithmModel;

  })(Backbone.Model);

  ExternalLibraryModel = (function(_super) {

    __extends(ExternalLibraryModel, _super);

    function ExternalLibraryModel() {
      return ExternalLibraryModel.__super__.constructor.apply(this, arguments);
    }

    ExternalLibraryModel.prototype.defaults = {
      id: null,
      name: null,
      description: null
    };

    return ExternalLibraryModel;

  })(Backbone.Model);

  SongSetModel = (function(_super) {

    __extends(SongSetModel, _super);

    function SongSetModel() {
      return SongSetModel.__super__.constructor.apply(this, arguments);
    }

    SongSetModel.prototype.defaults = {
      name: null,
      description: null,
      songs: null,
      owner: null,
      date_created: null
    };

    return SongSetModel;

  })(Backbone.Model);

  LibraryEntryModel = (function(_super) {

    __extends(LibraryEntryModel, _super);

    function LibraryEntryModel() {
      return LibraryEntryModel.__super__.constructor.apply(this, arguments);
    }

    LibraryEntryModel.prototype.defaults = {
      id: null,
      title: null,
      artist: null,
      album: null,
      track: null,
      genre: null,
      duration: null
    };

    return LibraryEntryModel;

  })(Backbone.Model);

  UserModel = (function(_super) {

    __extends(UserModel, _super);

    function UserModel() {
      return UserModel.__super__.constructor.apply(this, arguments);
    }

    UserModel.prototype.defaults = {
      id: null,
      username: null,
      first_name: null,
      last_name: null
    };

    return UserModel;

  })(Backbone.Model);

  PlayerModel = (function(_super) {

    __extends(PlayerModel, _super);

    function PlayerModel() {
      return PlayerModel.__super__.constructor.apply(this, arguments);
    }

    PlayerModel.prototype.defaults = {
      id: null,
      name: null,
      owner: null,
      has_password: null,
      location: null,
      sorting_algo: null,
      admins: null,
      songset_user_permission: null,
      num_active_users: null,
      size_limit: null
    };

    return PlayerModel;

  })(Backbone.Model);

  PlaylistEntryModel = (function(_super) {

    __extends(PlaylistEntryModel, _super);

    function PlaylistEntryModel() {
      return PlaylistEntryModel.__super__.constructor.apply(this, arguments);
    }

    PlaylistEntryModel.prototype.defaults = {
      song: null,
      upvoters: null,
      downvoters: null,
      time_added: null,
      adder: null
    };

    return PlaylistEntryModel;

  })(Backbone.Model);

  SessionModel = (function(_super) {

    __extends(SessionModel, _super);

    SessionModel.prototype.defaults = {
      "ticket_hash": null,
      "user_id": null
    };

    function SessionModel() {
      SessionModel.__super__.constructor.apply(this, arguments);
      _.bindAll(this);
      _.extend(this, Backbone.Events);
      this.fetch();
    }

    SessionModel.prototype.login = function(username, password) {
      var _this = this;
      return jQuery.post("https://www.udjplayer.com/udj/0_6/auth", "username=" + username + "&password=" + password).done(function(data) {
        if (_this.set(data)) {
          return _this.save();
        }
      }).fail(function(data) {
        return _this.trigger("session:loginFailed", data.getResponseHeader);
      });
    };

    SessionModel.prototype.validate = function(attributes) {
      if ((attributes.ticket_hash != null) && (attributes.user_id != null)) {
        this.trigger("session:loggedIn");
      } else {
        this.trigger("session:loggedOut");
        return "You are not logged in";
      }
    };

    SessionModel.prototype.sync = function(method, model) {
      var ttl;
      if (method === "create" || method === "update") {
        ttl = 24 * 360 * 1000;
        return $.jStorage.set("udj-session", model.toJSON(), {
          TTL: ttl
        });
      } else if (method === "read") {
        return this.set($.jStorage.get("udj-session"));
      } else if (method === "delete") {
        return $.jStorage.removeKey("udj-session");
      }
    };

    return SessionModel;

  })(Backbone.Model);

  $(document).ready(function() {
    var appview, loginView, sessionModel;
    appview = new AppView;
    sessionModel = new SessionModel;
    return loginView = new LoginView({
      model: sessionModel
    });
  });

}).call(this);
