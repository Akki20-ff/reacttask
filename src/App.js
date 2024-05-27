import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const maxDivCount = 90; // Maximum number of divs allowed

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch('/Data.json');
    const d = await response.json();
    setData(d);

  };
  console.log(data)
  useEffect(() => {
    fetchData();
  }, []);

  // Generate an array of div elements
  // const divElements = Array.from({ length: maxDivCount }, (_, index) => (
  //   <TooltipProvider key={index}>
  //     <Tooltip>
  //       <TooltipTrigger>
  //         <div className="p-1 h-12 border-white border-r-4 bg-zinc-400 hover:bg-sky-700" ></div>
  //       </TooltipTrigger>
  //       <TooltipContent className="bg-white" >
  //         <p>Tooltip {index + 1}</p>
  //       </TooltipContent>
  //     </Tooltip>
  //   </TooltipProvider>
  // ));

  return (

    <div>
      {
        data.map((data, index) => (
          <div className='flex justify-center my-4' >

            <div className="flex flex-col justify-center border w-[69rem] p-4" >

              <div className='flex justify-between my-2'>
                <div className="">
                  {data.name}
                  <span className="ps-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                            <path fill-rule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-6 3.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7.293 5.293a1 1 0 1 1 .99 1.667c-.459.134-1.033.566-1.033 1.29v.25a.75.75 0 1 0 1.5 0v-.115a2.5 2.5 0 1 0-2.518-4.153.75.75 0 1 0 1.061 1.06Z" clip-rule="evenodd" />
                          </svg>
                        </TooltipTrigger>
                        <TooltipContent className="bg-zinc-950 text-white text-xs rounded">
                          <p >{data.info}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                </div>
                <div>
                  Operational
                </div>
              </div>

              <div class="flex">

                {Array.from({ length: maxDivCount }, (_, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger>
                        {data.data[index].status === false ?
                          <div className="p-1 h-12 border-white border-r-4 bg-zinc-400 hover:bg-sky-700"></div>
                          :
                          <div className="p-1 h-12 border-white border-r-4 bg-emerald-500 hover:bg-sky-700"></div>
                        }
                      </TooltipTrigger>
                      <TooltipContent className="bg-white" >
                        {data.data[index].status === false ? <p>No data exists for this day.</p> : <p> No downtime recorded on this day. </p>}
                        <p>{data.data[index].date}</p>

                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}

              </div>

              <div className='flex justify-between items-baseline my-2'>
                <div className='w-1/4'>90 day ago</div>
                <div className='border-b-4 w-full'> </div>
                <div className='w-1/3 grid justify-items-center'>100% Up time</div>
                <div className='border-b-4 w-full'> </div>
                <div className='w-1/5 grid justify-items-end'>Today</div>
              </div>

            </div>
          </div>

        ))
      }
    </div>
  );
}

export default App;
