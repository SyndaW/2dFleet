async function openShop(){

    const res = await fetch("/api/shop")
    const prices = await res.json()

    console.log(prices)
}