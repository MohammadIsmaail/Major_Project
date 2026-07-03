import { course } from "../../entities/course";
import { mastercourse } from "../../entities/mastercourse";
import { masterplan } from "../../entities/masterplan"; 
import { plan } from "../../entities/plan";
import { user } from "../../entities/user";
import { createResponse } from "../../helper/createResponse";

export const userPurchasePlan = async (req: any, res: any) => {
  try {
    const {plan_id} = req.body    // destructuring   const plan_id = req.body.plan_id;
    const user_id = req.user.id;    //Ye authenticated user ka ID nikal raha hai.
    await plan.save({ user_id, plan_id });
    const UserCredit = await user.findOne({where:{id:user_id}})
    const masterPlanRes = await masterplan.findOne({ where: { id: plan_id } });
    const finalCredit =Number(masterPlanRes?.credit || 0) + Number(UserCredit?.credit || 0);
    await user.update({ id: user_id }, { credit: finalCredit } as any);
    return createResponse( res,true,200,"Plans created  successfully",finalCredit,false,);
  } catch (error: any) {
    return createResponse(res,false,500,error.message || "Internal Server Error",[],true,);
  }
};

export const PurchasedPlanUser = async (req: any, res: any) => {
  try {
    const user_id = req.user.id;
     const data = await plan  
      .createQueryBuilder("plan")
      .leftJoinAndSelect(masterplan, "mp", "mp.id = plan.plan_id")
      .where("plan.user_id = user_id", { user_id })
      .getRawMany();
      return createResponse(res,true,200,"Plans fetched successfully",data,false,);
  } catch (error: any) {
    return createResponse(res,false,500,error.message || "Internal Server Error",[],true,);
  }
};

export const getMasterCourse = async (req: any, res: any) => {
  try {
    const result = await mastercourse.find({ order: { created_at: "DESC" } });
    return createResponse(res,true,200,"Courses fetched successfully",result,false,);
  } catch (error: any) {
    return createResponse(res,false,500,error.message || "Internal Server Error",[],true,);
  }
};

export const userViewCourse = async (req: any, res: any) => {
  try {
    const user_id = req.user.id;
    const user1 = await user.findOne({ where: { id: user_id } });
    const RemainingCredit = parseInt(user1?.credit);
    if (RemainingCredit > 0) {
      const final: any = RemainingCredit - 1;
      await user.update({ id: user_id }, { credit: final });
      return createResponse(res, true, 200, "success", [], false);
    } else {
      return createResponse(
        res,
        false,
        400,
        "You have insufficient credit please Purchase",
        [],
        true,
      );
    }
  } catch (error: any) {
    return createResponse(
      res,
      false,
      500,
      error.message || "Internal Server Error",
      [],
      true,
    );
  }
};


export const getUserDashboard = async (req: any, res: any) => {
  try {
    const user_id = req.user.id;

    const userData = await user.findOne({ where: { id: user_id } });

    const purchasedPlans = await plan
      .createQueryBuilder("plan")
      .leftJoinAndSelect(masterplan, "mp", "mp.id = plan.plan_id")
      .where("plan.user_id = :user_id", { user_id }) // 👈 colon fix yahan bhi
      .getRawMany();

    const availableCoursesCount = await mastercourse.count();

    return createResponse(res, true, 200, "Dashboard data fetched", {
      userName: userData?.name || "User",
      credit: userData?.credit || 0,
      purchasedPlans,
      availableCoursesCount,
    }, false);
  } catch (err: any) {
    return createResponse(res, false, 500, `Internal Server Error! || ${err.message}`, [], true);
  }
};

