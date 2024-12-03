"use client";

import React, {useState, useEffect} from 'react'
import { useParams } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/constants/api';
import PercentageChart from '@/components/dashboard/PercentageChart';


function scoreStatusFormat(s){
    if(s >= 70 && s <= 100){
        return "Over-Performed";
    } else if(s >= 50 && s <= 69){
        return "Well-Performed";
    } else if(s >= 40 && s <= 49){
        return "Fairly-Performed";
    } else if(s >= 20 && s <= 39){
        return "Under-Performed";
    } else {
        return "Poorly-Performed";
    }
}

const Page = () => {
    const {id} = useParams();
    const [totalPoint, setTotalPoint] = useState(0)
    const [quest, setQuest] = useState([])

    useEffect(()=> {
        async function fetchCourseScore(){
            let total = 0;
            let percentage = 0;
            try {
                const {data} = await axios.get(`${BASE_URL}/questionnaire/totalscore/${id}`)

                if(data.msg === "success"){
                    console.log(data.response)
                    data.response.map((res)=> total += res.totalScore)
                    percentage = (total / 100) * 100
                    setTotalPoint(Math.min(percentage, 100))
                    console.log(Math.min(percentage, 100))                    
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchCourseScore();
    }, [id])


    useEffect(()=>{
        async function fetchQuest(){
            try {
                const {data} = await axios.get(`${BASE_URL}/questionnaire`)

                if(data.msg == "success"){
                    setQuest(data.response)
                    console.log("total students", data.response)
                    console.log(data.response?.length)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchQuest();
    },[])

    console.log(scoreStatusFormat(totalPoint));

  return (
    <div className=''>
        <div className='text-sm text-gray-300 font-normal'>
            <span className=''>dashboard / Course Statistic</span>
        </div>
        <div className='flex gap-8 mt-8'>
            <div className='flex-[3]'>
                <div className='flex flex-col p-8 rounded-[12px] shadow-sm'>
                    <div className='text-[100px] font-bold'>{totalPoint}%</div>
                    <div className='flex text-[14px]'>
                        {scoreStatusFormat(totalPoint)}
                    </div>
                    <div className='flex text-[14px]'>
                        Total Number of Students: {quest?.length}
                    </div>
                </div>
            </div>
            <div className='flex-[5]'>
                <div className='rounded-[12px] shadow-sm p-8 h-[70vh] grid place-items-center'>
                    <PercentageChart percentage={totalPoint} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Page