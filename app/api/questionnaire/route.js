import { connectToDB } from "@/utils/database";
import Questionnaire from "@/models/Questionnaire.model";
import { jsonRes } from "@/utils/stringifyResponse";


export async function POST(request){
    const {totalScore, course} = await request.json()

    try {
        await connectToDB();

        const quest = await Questionnaire.create({
            totalScore,
            course
        })

        if(quest){
            return new Response(jsonRes({msg: "success"}), {status: 200})
        }
    } catch (error) {
        console.log(error)
        return new Response(jsonRes({msg: "Unable to create course"}), {status: 400})
    }
}


export async function GET(request){
    try {
        await connectToDB();

        const questionnaires = await Questionnaire.find()

        if(questionnaires){
            return new Response(jsonRes({response: questionnaires, msg: "success"}), {status: 200})
        }
    } catch (error) {
        console.log(error)
        return new Response(jsonRes({msg: "Unable to create course"}), {status: 400})
    }
}