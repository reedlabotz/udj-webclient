#<< views/app_view
#<< models/session_model
#<< views/login_view
$(document).ready( ->
  appview = new AppView
  sessionModel = new SessionModel
  loginView = new LoginView {model: sessionModel}
)
