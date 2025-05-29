export default function ExplorationScene({ onSceneChange, api }){

    return(
        <>
            <h1>You are exploring...</h1>
            <p>Look around, find items, and prepare for battles!</p>

            <button onClick={() => onSceneChange("battle")}>Battle!</button>
            <button onClick={() => onSceneChange("title")}>Return to Title</button>
        </>
    )
}