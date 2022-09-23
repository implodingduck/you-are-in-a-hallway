import { useParams } from "react-router-dom";

const Map = () => {
    let { id, x, y } = useParams();

    return (<>
    <h1>Map</h1>
    <p>ID: {id}, X: {x}, Y: {y}</p>
    </>);
  };
  
  export default Map;
  