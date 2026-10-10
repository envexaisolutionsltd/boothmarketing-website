'use client'
import {useEffect,useState} from 'react'
const phrases=['copying data between systems.','chasing customer enquiries.','preparing repetitive documents.','updating spreadsheets manually.','checking the same information twice.']
export default function TypewriterHeadline(){
 const [index,setIndex]=useState(0),[length,setLength]=useState(phrases[0].length),[deleting,setDeleting]=useState(false)
 useEffect(()=>{const motion=window.matchMedia('(prefers-reduced-motion: reduce)');if(motion.matches)return;const phrase=phrases[index];const delay=deleting?(length===0?300:45):(length===phrase.length?2300:65);const timer=window.setTimeout(()=>{if(!deleting&&length===phrase.length){setDeleting(true)}else if(deleting&&length===0){setIndex(i=>(i+1)%phrases.length);setDeleting(false)}else setLength(n=>n+(deleting?-1:1))},delay);return()=>window.clearTimeout(timer)},[index,length,deleting])
 return <span className="block min-h-[2.15em] sm:min-h-[1.2em] text-[#c6c6c6]"><span className="sr-only">on repetitive manual work.</span><span aria-hidden="true">on <span className="text-[#e6e6e6]">{phrases[index].slice(0,length)}</span><span className="ml-1 inline-block h-[.75em] w-[2px] animate-pulse bg-[#d92f3c] align-middle"/></span></span>
}
