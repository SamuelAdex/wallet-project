import { connectToDB } from "@/utils/database";
import Course from "@/models/Course.model";
import { jsonRes } from "@/utils/stringifyResponse";


export async function POST(request, route){
    const courseId = route.params.courseId
    const {totalScore} = await request.json()

    return new Response(jsonRes({response: courseId, msg: "success"}), {status: 200})
    // try {
    //     await connectToDB();

    //     const updateCourseScore = await Course.findOne(
    //         {_id: courseId},
    //         {
    //             $push: {surveyScores: [totalScore]}
    //         }
    //     )
        
    //     if(updateCourseScore){
    //         return new Response(jsonRes({msg: "success"}), {status: 200})
    //     }
    // } catch (error) {
    //     console.log(error)
    //     return new Response(jsonRes({msg: "Unable to create course"}), {status: 400})
    // }
}