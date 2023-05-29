import { useState, useEffect } from 'react'
import { TailSpin } from 'react-loader-spinner'
import './index.css'
const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="

const App = () => {
    const [drinksData, setdrinkData] = useState([])
    const [searchterm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(false)
    const [isError, setErrMsg] = useState({ status: false, msg: "" })
    const fetchData = async (apiUrl) => {
        setLoading(true)
        try {
            const response = await fetch(apiUrl)
            const { drinks } = await response.json()
            console.log(drinks)
            setdrinkData(drinks)
            setLoading(false)
            setErrMsg({ status: false, msg: "" })
            if (!drinks) {
                throw new Error("Data Not Found")
            }
        }
        catch (error) {
            setLoading(false)
            setErrMsg({ status: true, msg: error.message || "Something went wrong | Connect to internet" })
        }
    }

    useEffect(() => {
        const correcturl = `${apiUrl}${searchterm}`;
        fetchData(correcturl);
    }, [searchterm]);
    return (
        <div style={{ textAlign: "center" ,justifyContent:"center"}}>
            <div className='search-container' style={{ textAlign: "center" }}>
                <h1>Welcome to CSDrinks</h1>
                <form>
                    <input
                        type='text' id="search" name='search' placeholder='Search for drink'
                        value={searchterm} onChange={(e) => setSearchTerm(e.target.value)} style={{ borderRadius: "10px", textAlign: "center", height: "30px", width: "250px" }} />
                </form>
            </div>
            <hr />
            <div style={{ display:"flex",flexDirection:"column",alignItems:"center",textAlign: "center" }}>
                {loading && !isError?.status && <h3 >
                    <TailSpin
                    height="80"
                    width="80"
                    radius="9"
                    color='blue'
                    ariaLabel="loading"/></h3>}
                {isError?.status && <h3>Drink Not Found</h3>}
                {!loading && !isError?.status &&
                    <ul style={{ margin: "10px" }} className='drinks-container'>
                        {drinksData.map((eachDrink) => {
                            const { idDrink, strDrink, strDrinkThumb } = eachDrink;
                            return (
                                <li key={idDrink} style={{ listStyleType: "none", padding: "10px", margin: "10px" }} className='drinks-container'>
                                    <div>
                                        <img src={strDrinkThumb} alt='drink-iamge' height={400} width={400} />
                                        <h3>{strDrink}</h3>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>}
            </div>
        </div>
    )
}
export default App 