import fs from "fs";
import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "";

    if (file.fieldname === "thumbnail") {
      uploadPath = "thumbnail_images";
    } else if (file.fieldname === "content") {
      uploadPath = "course_content_files";
    } else {
      return cb(
        new Error(`Invalid field name: ${file.fieldname}`),
        ""
      );
    }

    // Folder automatically create ho jayega
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname}`;

    cb(null, fileName);
  },
});

export const thumbnail_course_contents = multer({
  storage,
});