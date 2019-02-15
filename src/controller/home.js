const authService = require("../services/auth");
const secret = require("../config").secret;
const model = require("../view_model/home");
let auth = null;

class HomeController {

  constructor() {
    auth = authService.getInstance();
  }

  async helloworldPage() {

    await this.ctx.render("home", {
      title: "mincola",
      letter: "hello world!"
    });
  }

  async tokenPage() {
    await this.ctx.render("token", {
      title: "mincola"
    });
  }


  async generateToken(userName, userPass) {
    let handler = await auth;
    model.userName = userName;
    model.userPass = userPass;
    return new Promise((resolve, reject) => {
      handler.encode(model, secret, "1d", (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });

  }
}

module.exports = new HomeController()
