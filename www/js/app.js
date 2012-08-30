(function() {
  var AppView, ExternalLibraryModel, PlayerModel, PlaylistEntryModel, SongSetModel, SortingAlgorithmModel, UserModel, appview,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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

  appview = new AppView;

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

}).call(this);
