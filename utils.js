let util = {
  cookie: {
    setCookie: function (cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },

    getCookie: function (cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },

    deleteCookie: function (cname) {
      this.setCookie(cname, "", -1);
    },
  },
  queryString: {
    getParam: function (name) {
        const urlSearchParams = new URLSearchParams(window.location.search);
        let param = urlSearchParams.getAll(name)[0];
        return param;
    }
  }
};