import axios from "axios";

export class VideoService {
  async uploadVideo(videoInfo) {
    try {
      const video = await axios.postForm("/api/v1/videos/upload", {
        title: videoInfo.title,
        description: videoInfo.description,
        videoFile: videoInfo.videoFile[0],
        thumbnail: videoInfo.thumbnail[0],
      });
      return video;
    } catch (error) {
      console.log("UPLOAD VIDEO ERROR::", error);
      throw error;
    }
  }
  async getAllVideos({ page, limit, title, sortBy, sortType, userId }) {
    try {
      let videos = await axios.get("/api/v1/videos/result");

      if (page && limit) {
        videos = await axios.get(
          `/api/v1/videos/result?page=${page}&limit=${limit}`
        );
      }
      if (title) {
        // videos = await axios.get(`/api/v1/videos/result?query=${title}`);
      }

      if (sortBy) {
        videos = await axios.get(`/api/v1/videos/result?sortBy=${sortBy}`);
      }

      // sortType uploadDate | viewCount
      if (sortType) {
        videos = await axios.get(`/api/v1/videos/result?sortType=${sortType}`);
      }

      if (userId) {
        videos = await axios.get(`/api/v1/videos/result?userId=${userId}`);
      }
      return videos;
    } catch (error) {
      console.log("GET ALL VIDEOS ERROR::", error);
      throw error;
    }
  }

  async getAllAppVideos(sortBy) {
    try {
      if (sortBy) {
        const videos = await axios.get(`/api/v1/videos/app?sortBy=${sortBy}`);
        return videos;
      }
      return null;
    } catch (error) {
      console.log("GET ALL VIDEOS ERROR::", error);
      throw error;
    }
  }

  async getVideoById({ videoId }) {
    try {
      const video = await axios.get(`/api/v1/videos/${videoId}`);
      return video;
    } catch (error) {
      console.log("GET VIDEO BY ID ERROR::", error);
      throw error;
    }
  }

  async updateVideoDetails({ videoId, title, description }) {
    try {
      const updateVideo = await axios.patch(`/api/v1/videos/${videoId}`, {
        title,
        description,
      });
      return updateVideo;
    } catch (error) {
      console.log("UPDATE VIDEO DETAILS ERROR::", error);
      throw error;
    }
  }

  async changeUploadVideo({ videoId, videoFile }) {
    try {
      const video = await axios.patch(
        `/api/v1/videos/change-upload-video/${videoId}`,
        {
          videoFile,
        }
      );
      return video;
    } catch (error) {
      console.log("CHANGE UPLOADED VIDEO ERROR::", error);
      throw error;
    }
  }

  async changeUploadVideoThumbnail({ videoId, thumbnail }) {
    try {
      const video = await axios.patchForm(
        `/api/v1/videos/change-upload-thumbnail/${videoId}`,
        {
          thumbnail,
        }
      );
      return video;
    } catch (error) {
      console.log("CHANGE UPLOADED VIDEO Thumbnail ERROR::", error);
      throw error;
    }
  }
  async watchVideo(videoId) {
    try {
      const watchVideos = await axios.patch(`/api/v1/videos/watch/${videoId}`);
      return watchVideos;
    } catch (error) {
      console.log("WATCH VIDEO ERROR::", error);
      throw error;
    }
  }

  async videoPublishStatus(videoId, publishMessage) {
    try {
      const toggleVideoStatus = await axios.patch(
        `/api/v1/videos/toggle/publish/${videoId}`,
        {
          publishMessage: !publishMessage,
        }
      );
      return toggleVideoStatus;
    } catch (error) {
      console.log("TOGGLE VIDEO Publish Status ERROR::", error);
      throw error;
    }
  }

  async deleteVideo({ videoId }) {
    try {
      const removedVideo = await axios.delete(`/api/v1/videos/${videoId}`);
      return removedVideo;
    } catch (error) {
      console.log("DELETE VIDEO ERROR::", error);
      throw error;
    }
  }

  async getLikedVideos() {
    try {
      const likedVideos = await axios.get(`/api/v1/likes/videos`);
      return likedVideos;
    } catch (error) {
      console.log("GET LIKED VIDEO ERROR::", error);
      throw error;
    }
  }

  async addCommentOnVideo({ videoId, content }) {
    try {
      const commentAdd = await axios.post(`/api/v1/comments/${videoId}`, {
        content,
      });
      return commentAdd;
    } catch (error) {
      throw error;
    }
  }

  async updateComment({ commentId, content }) {
    try {
      const commentUpdate = await axios.patch(
        `/api/v1/comments/c/${commentId}`,
        {
          content,
        }
      );
      return commentUpdate;
    } catch (error) {
      throw error;
    }
  }

  async deleteVideoComment({ commentId }) {
    try {
      return await axios.delete(`/api/v1/comments/c/${commentId}`);
    } catch (error) {
      throw error;
    }
  }

  async getCommentOnVideo({ videoId }) {
    try {
      const AllCommentOnVideo = await axios.get(`/api/v1/comments/${videoId}`);
      return AllCommentOnVideo;
    } catch (error) {
      throw error;
    }
  }

  async createTweet({ content }) {
    try {
      return await axios.post("/api/v1/tweets", {
        content,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateTweet({ tweetId, content }) {
    try {
      return await axios.patch(`/api/v1/tweets/${tweetId}`, {
        content,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteTweet({ tweetId }) {
    try {
      return await axios.delete(`/api/v1/tweets/${tweetId}`);
    } catch (error) {
      throw error;
    }
  }

  async getUserTweets(userId) {
    try {
      return await axios.get(`/api/v1/tweets/user/${userId}`);
    } catch (error) {
      throw error;
    }
  }

  async toggleVideoLikeDislike({ videoId }) {
    try {
      return await axios.post(`/api/v1/likes/toggle/v/${videoId}`);
    } catch (error) {
      throw error;
    }
  }

  async videoDislike(videoId) {
    try {
      return await axios.post(`/api/v1/likes/toggle/d/v/${videoId}`);
    } catch (error) {
      throw error;
    }
  }

  async toggleVideoCommentLikeDislike({ commentId }) {
    try {
      return await axios.post(`/api/v1/likes/toggle/c/${commentId}`);
    } catch (error) {
      throw error;
    }
  }
  async toggleTweetLikeDislike({ tweetId }) {
    try {
      return await axios.post(`/api/v1/likes/toggle/t/${tweetId}`);
    } catch (error) {
      throw error;
    }
  }

  async createVideoPlaylist({ name, description }) {
    try {
      return await axios.post("/api/v1/playlist", {
        name,
        description,
      });
    } catch (error) {
      throw error;
    }
  }
  async getVideoPlaylistById({ playlistId }) {
    try {
      return await axios.get(`/api/v1/playlist/${playlistId}`);
    } catch (error) {
      throw error;
    }
  }
  async updatePlaylist({ playlistId, name, description }) {
    try {
      return await axios.patch(`/api/v1/playlist/${playlistId}`, {
        name,
        description,
      });
    } catch (error) {
      throw error;
    }
  }
  async deletePlaylist({ playlistId }) {
    try {
      return await axios.delete(`/api/v1/playlist/${playlistId}`);
    } catch (error) {
      throw error;
    }
  }

  async getVideoPlaylistByUserId(userId) {
    try {
      return await axios.get(`/api/v1/playlist/user/${userId}`);
    } catch (error) {
      throw error;
    }
  }

  async addVideosToPlaylist({ videoId, playListId }) {
    try {
      return await axios.patch(`/api/v1/playlist/add/${videoId}/${playListId}`);
    } catch (error) {
      throw error;
    }
  }
  async removeVideosToPlaylist({ videoId, playListId }) {
    try {
      return await axios.patch(
        `/api/v1/playlist/remove/${videoId}/${playListId}`
      );
    } catch (error) {
      throw error;
    }
  }

  async getSubscribedChannels(channelId) {
    try {
      return await axios.get(`/api/v1/subscriptions/c/${channelId}`);
    } catch (error) {
      throw error;
    }
  }
  async getChannelSubscribers(subscriberId) {
    try {
      return await axios.get(`/api/v1/subscriptions/u/${subscriberId}`);
    } catch (error) {
      throw error;
    }
  }
  async toggleSubscribe(channelId) {
    try {
      return await axios.post(`/api/v1/subscriptions/c/${channelId}`);
    } catch (error) {
      throw error;
    }
  }

  async getChannelStatsInformation() {
    try {
      return await axios.get("/api/v1/dashboard/stats");
    } catch (error) {
      throw error;
    }
  }
  async getChannelAllVideos() {
    try {
      return await axios.get("/api/v1/dashboard/videos");
    } catch (error) {
      throw error;
    }
  }

  async getChannelList() {
    try {
      return await axios.get("/api/v1/subscriptions/channels");
    } catch (error) {
      throw error;
    }
  }
}

const videoService = new VideoService();
export default videoService;
