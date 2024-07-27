import * as z from "zod";

const MAX_VIDEO_FILE_SIZE = 100 * 1024 * 1024;

const MAX_THUMBNAIL_FILE_SIZE = 1024 * 1024 * 5;

const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const ACCEPTED_VIDEO_MIME_TYPES = ["video/mp4"];

export const videoFileSchema = z.object({
  videoFile: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_VIDEO_FILE_SIZE;
    }, `Max video size is 100MB.`)
    .refine(
      (files) => ACCEPTED_VIDEO_MIME_TYPES.includes(files?.[0]?.type),
      "Invalid video format. Only MP4 is allowed.."
    )
    .refine((file) => !!file, {
      message: "Video file is required",
    }),
  thumbnail: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_THUMBNAIL_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .refine((file) => !!file, {
      message: "Thumbnail file is required",
    }),
  title: z
    .string()
    .regex(new RegExp(/^[^\s].*$/), "Title cannot start or end with space.")
    .min(3, "Title is too short.")
    .max(50, "Title is too long."),
  description: z
    .string()
    .regex(
      new RegExp(/^[^\s].*$/),
      "Description cannot start or end with space."
    )
    .min(5, "Description is too short.")
    .max(500, "Description is too long."),
});
