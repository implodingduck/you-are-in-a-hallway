import { useParams } from "react-router-dom";

const Encounter = () => {
    let { id } = useParams();

    return (<h1>Encounter {id}</h1>);
  };
  
  export default Encounter;