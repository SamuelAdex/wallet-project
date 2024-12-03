import { connectToDB } from "@/utils/database";
import Course from "@/models/Course.model";
import { jsonRes } from "@/utils/stringifyResponse";


export async function GET(request, route){
    const level = route.params.level
    try {
        await connectToDB();

        const courses = await Course.find({level: level})

        if(courses){
            return new Response(jsonRes({response: courses, msg: "success"}), {status: 200})
        }
    } catch (error) {
        console.log(error)
        return new Response(jsonRes({msg: "Unable to create course"}), {status: 400})
    }
}