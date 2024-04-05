import React, { useEffect, useRef, useState } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useDispatch, useSelector } from 'react-redux';
import { setGsapTimeline } from '../../features/Transition/transitionSlice';


function Transition({children}) {
    const [displayChildren,setDisplayChildren] = useState(children);
    const container = useRef();
    const timeline = useSelector(state=>state.Transition);
    const dispatch = useDispatch();
    useGSAP(()=>{
        if(children.props.path !== displayChildren.props.path){
            timeline.play().then(()=>{
                setDisplayChildren(children);
                dispatch(setGsapTimeline(timeline.pause().clear()));
            });
        }
        // gsap.to(container.current,{opacity:0}).then(()=>{
        //     setDisplayChildren(children);
        //     gsap.to(container.current,{opacity:1})
        // })
    },[children])
    return (
        <div ref={container}> 
            {displayChildren}
        </div>
    )
}

export default Transition