import { connectToDB } from "@/utils/database";
import Questionnaire from "@/models/Questionnaire.model";
import { jsonRes } from "@/utils/stringifyResponse";


export async function GET(request, route){
    const courseId = route.params.courseId;

    try {
        await connectToDB()


        const quest = await Questionnaire.find({course: courseId})

        if(quest){
            return new Response(jsonRes({response: quest, msg: "success"}), {status: 201})
        }
    } catch (error) {
        console.log(error);
        return new Response(jsonRes({msg: "Unable to get data"}), {status: 400})
    }
}