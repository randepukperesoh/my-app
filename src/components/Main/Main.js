import React, { useState } from 'react';
import NodeBar from '../Bars/NodeBar';
import KernelBar from '../Bars/KernelBar'
import Area from '../Canvas/Area'
import './Main.css'
function Main() {
    let [paragraph, setParagraph] = useState('node');

    return(
        <div>
            <div className='Header'>
                <div className='HeaderTab' onClick={()=>setParagraph('node')}>Node</div>
                <div className='HeaderTab' onClick={()=>setParagraph('kernel')}>Kernel</div>
            </div>
            <div className='sideBar'>
                {paragraph === 'node'? <NodeBar/> : <KernelBar/>} 
            </div>
            <div className='area'>
                    <Area/>
            </div>
        </div>
    )
}
export default Main