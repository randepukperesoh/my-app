import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectionNode, selectNode, addKernel, changeNode, changeConfigCamera, removeNode } from '../store/Slice';
import { useGesture } from '@use-gesture/react';
import { Html } from "@react-three/drei";
import { Icon } from '@iconify/react';
import './Dot.css'

export default function Dot({ pos , id, select, selectFunc }){
    //fix 
    const selectBad = useSelector(state => state.nodes.nodes[id].isSelected);
    //
    const selectedNode = useSelector( state => state.nodes.selectedNode )
    const config = useSelector( state => state.nodes.config )
    const dispatch = useDispatch();

    const [position, setPosition] = useState( pos );
    const [contextMenu, setContextMenu] = useState(false);

    const bindDotPos = useGesture({
        onDragStart: () => config.mouseType === 'node' ?  dispatch( changeConfigCamera( { camera: false } ) ) : null,
        onDrag: ( params ) => config.mouseType === 'node' ? dispatch( changeNode( {id: id, x: position[0], y: Math.round( -params.offset[1] / config.meshDivisions ), z: position[2]} )) : null,
        onDragEnd: () => config.mouseType === 'node' ? dispatch( changeConfigCamera( { camera: true } ) ) : null,
        onClick: () =>  /*config.mouseType === 'kernel' ? createKernel : */selectFunc(id),
        onContextMenu:(e) => setContextMenu( !contextMenu )
    })
    
    useEffect( () => { setPosition( pos ) }, [ pos ])

    function createKernel (e) {
        console.log(e)
        if (config.mouseType === 'kernel') {
            dispatch(selectionNode({id: id}))
            if( (selectedNode !== id) & (selectedNode !== null) ) {
                dispatch(addKernel({start: selectedNode.node, end: id}))
            }
        }
    }

    const contextHtml  = () => {
        return (
        <Html>
            <div className="contextWraper">
                <div className='contextRow' onClick={()=>{ dispatch(removeNode({ id: id }))}} >Удалить <Icon icon="material-symbols:delete-outline-sharp" /></div>
                <div className='contextRow' > 
                    <select className='contextDropBox'>
                        <option value="1">Квадрат</option>
                        <option value="2">square</option>
                        <option value="3">Овал</option>
                    </select>
                </div>
                <div className='contextRow' > 
                    <select className='contextDropBox'>
                        <option value="1">0.5</option>
                        <option value="2">1</option>
                        <option value="3">1.5</option>
                        <option value="4">2</option>
                    </select>
                </div>
            </div>
        </Html>
    )}


    return(
    <mesh { ...bindDotPos() } position={ position }>
        <sphereGeometry args={ [ 0.09, 64, 32 ] } />
        <meshStandardMaterial color={ selectBad ? 'yellow' : 'blue' } />
        { contextMenu ? contextHtml() : null }
    </mesh>
)}