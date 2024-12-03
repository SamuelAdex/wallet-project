import { connectToDB } from "@/utils/database";
import Course from "@/models/Course.model";
import { jsonRes } from "@/utils/stringifyResponse";


export async function POST(request){
    const {title, code, level} = await request.json();

    try {
        await connectToDB();

        if(!title || !code || !level){
            return new Response(jsonRes({msg: "field can't be empty"}), {status: 400})
        }

        console.log("course data: ", title, code, level)

        const newCourse = await new Course({
            title,
            code,
            level
        });

        const res = await newCourse.save();

        if(res){
            return new Response(jsonRes({response: res, msg: "success"}), {status: 200});
        }

    } catch (error) {
        console.log(error)
        return new Response(jsonRes({msg: "Unable to create course"}), {status: 400})
    }
}


export async function GET(request){
    try {
        await connectToDB();

        const courses = await Course.find();

        if(courses){
            return new Response(jsonRes({response: courses, msg: "success"}), {status: 201})
        }
        return new Response(jsonRes({msg: "Unable to fetch Courses"}), {status: 400})
    } catch (error) {
        console.log(error)
        return new Response(jsonRes({msg: "failed fetch courses"}), {status: 400})
    }
}