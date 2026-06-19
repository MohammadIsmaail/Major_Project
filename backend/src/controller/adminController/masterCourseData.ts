export const masterCourseInsertData = async (req: any,res: any) => {
  try {
    res.send("OKK");
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};