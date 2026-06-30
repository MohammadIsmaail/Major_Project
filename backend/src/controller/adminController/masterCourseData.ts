import fs from "fs";
import path from "path";
import { mastercourse } from "../../entities/mastercourse";
import { createResponse } from "../../helper/createResponse";

export const masterCourseInsertData = async (req: any, res: any) => {
  try {
    const { title, desc, level, rating, duration, type, status } = req.body;
    const files = (req.files || {}) as {
      thumbnail?: Express.Multer.File[];
      content?: Express.Multer.File[];
    };
    const thumbnail = files.thumbnail?.[0]?.path || "";
    const content = files.content?.[0]?.path || "";

    const isExist = await mastercourse.findOne({
      where: { title },
    });

    if (isExist) {
      return createResponse(res,false,400,"Course Already Exist!",isExist,true,);
    }
    const result = await mastercourse.save({
      title,
      desc,
      level,
      rating,
      duration,
      type,
      status: Number(status),
      thumbnail,
      content,
    });
    return createResponse(res,true,200,"Course Added Successfully!",result, false,);
  } catch (error: any) {
    return createResponse(res,false,500,error?.message || "Internal Server Error!",[],true,);
  }
};

export const masterCourseGetData = async (req: any, res: any) => {
  try {
    const result = await mastercourse.find({ order: { created_at: "DESC" } });
    return createResponse(
      res,
      true,
      200,
      "course fetched Successfully!",
      result,
      false,
    );
  } catch (err) {
    return createResponse(res, false, 500, "Internal Server Error!", [], true);
  }
};

export const masterCourseDeleteData = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const isExist = await mastercourse.findOne({ where: { id: Number(id) } });
    if (!isExist) {
      return createResponse(res, false, 404, "Course Not Found", [], true);
    }

    if (isExist?.thumbnail) {
      fs.unlinkSync(`thumbnail_images/${isExist.thumbnail}`);
    }

    if (isExist?.content) {
      fs.unlinkSync(`course_content_files/${isExist.content}`);
    }
    const result = await mastercourse.delete({ id: Number(id) });
    return createResponse(
      res,
      true,
      200,
      "course delete Successfully!",
      result,
      false,
    );
  } catch (err: any) {
    console.log(err);
    return createResponse(
      res,
      false,
      500,
      err.message || "Internal Server Error!",
      [],
      true,
    );
  }
};

export const masterCourseSingleData = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const result = await mastercourse.findOne({ where: { id: Number(id) } });
    if (!result) {
      return createResponse(res, false, 404, "Course Not Found", [], true);
    } else {
      return createResponse(res, true, 200, "Course Found!", result, false);
    }
  } catch (err: any) {
    console.log(err);
    return createResponse(
      res,
      false,
      500,
      err.message || "Internal Server Error!",
      [],
      true,
    );
  }
};

export const masterCourseUpdateData = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const { title, desc, level, rating, duration, type, status } = req.body;

    const files = req.files as {
      thumbnail?: Express.Multer.File[];
      content?: Express.Multer.File[];
    };

    const course = await mastercourse.findOne({
      where: { id: Number(id) },
    });

    if (!course) {
      return createResponse(res, false, 404, "Course Not Found!", [], true);
    }

    let thumbnail = course.thumbnail;
    let content = course.content;

    // Update Thumbnail
    if (files?.thumbnail?.[0]) {
      if (course.thumbnail) {
        const oldThumbnail = path.join(
          process.cwd(),
          "thumbnail_images",
          course.thumbnail,
        );

        if (fs.existsSync(oldThumbnail)) {
          fs.unlinkSync(oldThumbnail);
        }
      }

      thumbnail = files.thumbnail[0].filename;
    }

    // Update Content File
    if (files?.content?.[0]) {
      if (course.content) {
        const oldContent = path.join(
          process.cwd(),
          "course_content_files",
          course.content,
        );

        if (fs.existsSync(oldContent)) {
          fs.unlinkSync(oldContent);
        }
      }

      content = files.content[0].filename;
    }

    await mastercourse.update(
      { id: Number(id) },
      {
        title,
        desc,
        level,
        rating,
        duration,
        type,
        status,
        thumbnail,
        content,
      },
    );

    const updatedCourse = await mastercourse.findOne({
      where: { id: Number(id) },
    });

    return createResponse(
      res,
      true,
      200,
      "Course Updated Successfully!",
      updatedCourse,
      false,
    );
  } catch (err: any) {
    console.log(err);

    return createResponse(
      res,
      false,
      500,
      err.message || "Internal Server Error!",
      [],
      true,
    );
  }
};
