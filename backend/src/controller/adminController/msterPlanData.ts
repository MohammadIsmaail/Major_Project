import { masterplan } from "../../entities/masterplan";
import { createResponse } from "../../helper/createResponse";

export const masterPlanInsertData =async (req: any, res: any) => {
  try{
    const { name, desc, credit, price, offer, duration, is_res, status } =
    req.body;
    const isExist = await masterplan.findOne({where:{name:name}})
    if(isExist){
        return createResponse(res,false,400,"Plan Already Exist!",isExist,true)
    }
    else{
        const result = await masterplan.save({ name, desc, credit, price, offer, duration, is_res, status})
        return createResponse(res,true,200,"Plan Create Successfully!",result,false)
    }
  }catch(err){
    return createResponse(res,false,500,`Internal Server Error!,${err}`,[],true)
  }

};

export const masterPlanGetData =async (req: any, res: any) => {
  try{
    const result = await masterplan.find()
      return createResponse(res,true,200,"Plan fetched Successfully!",result,false)  
  }catch(err){
    return createResponse(res,false,500,"Internal Server Error!",[],true)
  }

};

export const masterPlanDeleteData =async (req: any, res: any) => {
  try{
    const {id} = req.params;
    const result = await masterplan.delete({id})
       return createResponse(
      res,
      true,
      200,
      "Plan Deleted Successfully!",
      result,
      false
    );  
  }catch(err){
    return createResponse(res,false,500,"Internal Server Error!",[],true)
  }

};

export const getSingleMasterPlan =async (req: any, res: any) => {
  try{
    const {id} = req.params;
    const result = await masterplan.findOne({where:{id:id}})
       return createResponse(res,true,200,"Plan Found!",result,false);  
  }catch(err){
    return createResponse(res,false,500,err,[],true)
  }
};

export const updateMasterPlanData = async ( req: any,res: any) => {
  try {
    const { id } = req.params;

    const {name,desc,credit,price,offer,duration,is_res,status,} = req.body;

    const result = await masterplan.update({ id: Number(id) },
                         {name,desc,credit,price,offer,duration,is_res,status,});
    return createResponse(res,true,200,"Plan Updated Successfully!", result,false );
  } catch (err) {
    return createResponse(res,false,500,err,[],true);
  }
};