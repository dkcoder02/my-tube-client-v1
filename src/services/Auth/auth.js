import axios from "axios";

export class AuthService {
  async createAccount(userInfo) {
    try {
      const userAccount = await axios.postForm("/api/v1/user/register", {
        fullName: userInfo.fullName,
        email: userInfo.email,
        password: userInfo.password,
        userName: userInfo.userName,
        avatar: userInfo.avatar[0],
        coverImage: userInfo?.coverImage || "",
      });
      if (userAccount) {
        return this.login(userInfo);
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("CREATE ACCOUNT ERROR::", error);
      throw error;
    }
  }

  async login(userInfo) {
    try {
      return await axios.post("/api/v1/user/login", {
        email: userInfo.email,
        password: userInfo.password,
      });
    } catch (error) {
      console.log("LOGIN ERROR::", error);
      throw error;
    }
  }

  async logout() {
    try {
      return await axios.post("/api/v1/user/logout");
    } catch (error) {
      console.log("LOGOUT ERROR::", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await axios.get("/api/v1/user/current-user");
    } catch (error) {
      console.log("GetCurrentUser ERROR::", error);
    }

    return null;
  }

  async changePassword(data) {
    try {
      return await axios.post("/api/v1/user/change-password", data);
    } catch (error) {
      console.log("CHANGE PASSWORD ERROR::", error);
      throw error;
    }
  }

  async changeAvatar(avatarFile) {
    try {
      return await axios.patchForm("/api/v1/user/avatar-update", {
        avatar: avatarFile[0],
      });
    } catch (error) {
      console.log("CHANGE AVATAR IMAGE ERROR::", error);
      throw error;
    }
  }
  async changeCoverImage(coverImageFile) {
    try {
      return await axios.patchForm("/api/v1/user/cover-image-update", {
        coverImage: coverImageFile[0],
      });
    } catch (error) {
      console.log("CHANGE COVER IMAGE ERROR::", error);
      throw error;
    }
  }
  async channelProfile(username) {
    try {
      return await axios.get(`/api/v1/user/channel-profile/${username}`);
    } catch (error) {
      console.log("GET CHANNEL PROFILE ERROR::", error);
      throw error;
    }
  }
  async getWatchHistory() {
    try {
      return await axios.get("/api/v1/user/history");
    } catch (error) {
      console.log("GET WATCH HISTORY ERROR::", error);
      throw error;
    }
  }

  async updateUserProfile(data) {
    try {
      return await axios.patch("/api/v1/user/update-account", {
        userName: data.userName,
        fullName: data.fullName,
        email: data.email,
      });
    } catch (error) {
      console.log("CHANGE USER PROFILE INFO ERROR::", error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
