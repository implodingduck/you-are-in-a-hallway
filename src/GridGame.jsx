import './GridGame.css'
import Grid from './Grid.jsx';
import GridPlayer from './GridPlayer.jsx'

export default function GridGame(){
    return (<>
        <Grid />
        <GridPlayer x={0} y={0} />
    </>)
}