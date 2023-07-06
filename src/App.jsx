import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [inputs,setInputs]=useState(
    {
      bill:'',
      custom:'',
      numberOfPeople:'',
    }
  )
  const [activeBtn,setActiveBtn]=useState(0)
  const [err,setErr]=useState(false)
  const [tipPercent,setTipPercent]=useState(0)
  const [tipAmount,setTipAmount]=useState(0.00)
  const [totalPerPerson,setTotalPerPerson]=useState(0.00)


  const handleInput=(e)=>{
    const clone={...inputs}
    clone[e.target.id]=e.target.value
    setInputs({...clone})
  }

  const handleTip=(tipPercent)=>{setTipPercent(tipPercent)}

  const handleReset=()=>{
    setInputs(
      {
        bill:'',
        custom:'',
        numberOfPeople:'',
      }
    )
    setActiveBtn(0)
    setErr(false)
    setTipPercent(0)
    setTipAmount(0.00)
    setTotalPerPerson(0.00)
  }

  useEffect(()=>{
    if(!inputs.bill||!inputs.numberOfPeople) return
    setTipAmount(((Number(inputs.bill)*tipPercent/100)/Number(inputs.numberOfPeople)).toFixed(2))
    setTotalPerPerson((((Number(inputs.bill)*tipPercent/100)+Number(inputs.bill))/Number(inputs.numberOfPeople)).toFixed(2))
  },[inputs,tipPercent])


  return (
    <div className='w-screen h-screen bg-neutral-light-grayish-cyan'>
     <p className='m-auto mb-4 w-0 uppercase font-2xl tracking-[0.5em] text-2xl text-neutral-dark-cyan'>spli<br />tter</p>
      <div className='m-auto bg-neutral-white flex gap-10 flex-wrap rounded-2xl p-10 max-w-[800px]'>
        <div className='flex-1 basis-[325px]'>
          <div className='relative flex flex-col gap-2'>
            <label className='text-neutral-grayish-cyan cursor-pointer' htmlFor="bill">Bill</label>
            <input value={inputs.bill} onChange={handleInput} type="number" className='p-4 bg-neutral-very-light-grayish-cyan text-neutral-dark-cyan rounded-sm text-right cursor-pointer focus:outline-none focus:ring-0 border-2 focus:border-primary-strong-cyan' id='bill' placeholder='0'/>
            <span className='absolute bottom-4 left-4 text-neutral-grayish-cyan'>$</span>
          </div>
          <div className='mt-4 relative flex flex-col gap-2'>
            <h4 className='text-neutral-grayish-cyan cursor-pointer'>Select Tip %</h4>
            <div className='flex flex-wrap gap-4'>
              <button onClick={()=>{
                handleTip(5)
                setActiveBtn(1)
                }} className={`button flex-1 basis-[80px] ${activeBtn===1?'bg-primary-strong-cyan text-neutral-dark-cyan':''}`}>5%</button>
              <button onClick={()=>{
                handleTip(10)
                setActiveBtn(2)
                }} className={`button flex-1 basis-[80px] ${activeBtn===2?'bg-primary-strong-cyan text-neutral-dark-cyan':''}`}>10%</button>
              <button onClick={()=>{
                handleTip(15)
                setActiveBtn(3)
                }} className={`button flex-1 basis-[80px] ${activeBtn===3?'bg-primary-strong-cyan text-neutral-dark-cyan':''}`}>15%</button>
              <button onClick={()=>{
                handleTip(25)
                setActiveBtn(4)
                }} className={`button flex-1 basis-[80px] ${activeBtn===4?'bg-primary-strong-cyan text-neutral-dark-cyan':''}`}>25%</button>
              <button onClick={()=>{
                handleTip(50)
                setActiveBtn(5)
                }} className={`button flex-1 basis-[80px] ${activeBtn===5?'bg-primary-strong-cyan text-neutral-dark-cyan':''}`}>50%</button>
              {/* The width is 0px here because the input keeo stretching to 100% for some reason */}
              <input onChange={(e)=>{
                handleInput(e)
                handleTip(Number(e.target.value))
                }} onClick={()=>setActiveBtn(6)} value={inputs.custom} type="number" className={`${activeBtn===6?'border-primary-strong-cyan':''} text-neutral-dark-cyan py-4 px-5 w-[0px] rounded-md text-right flex-1 basis-[80px] bg-neutral-very-light-grayish-cyan placeholder:text-neutral-grayish-cyan focus:outline-none focus:ring-0 border-2 focus:border-primary-strong-cyan`} id='custom' placeholder='Custom'/>
            </div>
          </div>
          <div className='mt-4 relative flex flex-col gap-2'>
            <label className='text-neutral-grayish-cyan cursor-pointer' htmlFor="numberOfPeople">Number of People</label>
            <p className={`text-[0.8em] text-red-500 text-right -bottom-10 left-0 absolute ${err?'':'hidden'}`}>Must be an integer that is larger than zero</p>
            <input onChange={(e)=>{
              if((!(Number(e.target.value)>0)||!Number.isInteger(Number(e.target.value)))){
                e.target.value=1
                handleInput(e)
                setErr(true)
                return
              }
              handleInput(e)
              setErr(false)
              return
            }} type="number" value={inputs.numberOfPeople} className={` ${err?'border-red-500':'focus:border-primary-strong-cyan'} p-4 bg-neutral-very-light-grayish-cyan text-neutral-dark-cyan rounded-sm text-right cursor-pointer focus:outline-none focus:ring-0 border-2`} id='numberOfPeople' placeholder='0'/>
            <span className='absolute bottom-4 left-4 text-neutral-grayish-cyan'>$</span>
          </div>
        </div>
        <div className='flex-1 basis-[325px] flex flex-col justify-between items-center p-10 bg-neutral-dark-cyan rounded-md'>
          <div className='w-full'>
            <div className='flex justify-between items-center w-full'>
              <div>
               <h2 className='text-neutral-white'>Tip Amount</h2>
                <p className='text-neutral-grayish-cyan'>/ person</p>
              </div>
              <h1 className='text-primary-strong-cyan text-[2em]'>${tipAmount}</h1>
            </div>
            <div className='flex justify-between items-center w-full'>
              <div>
                <h2 className='text-neutral-white'>Total</h2>
                <p className='text-neutral-grayish-cyan'>/ person</p>
              </div>
              <h1 className='text-primary-strong-cyan text-[2em]'>${totalPerPerson}</h1>
            </div>
          </div>
          <button onClick={handleReset} className='py-4 w-full rounded-md bg-primary-strong-cyan text-neutral-dark-cyan hover:bg-neutral-very-light-grayish-cyan'>RESET</button>
        </div>
      </div>
    </div>
  )
}


export default App
