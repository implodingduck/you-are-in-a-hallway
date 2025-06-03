export default function TitleScene({ onSceneChange }){
    return (<>
        <h1>You are in a hallway...</h1>
        <button onClick={() => onSceneChange("explore")}>Enter</button>
    </>)
}