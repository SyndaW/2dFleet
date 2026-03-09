async function openMap(){

    const res = await fetch("/api/game/universe")
    const universe = await res.json()

    console.log(universe)
}