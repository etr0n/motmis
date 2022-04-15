import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { StatsContainer, Loading, ChartsContainer } from "../../components";

const Stats = () => {
    const { showStats, isLoading, monthlyApplications } = useAppContext()

    useEffect(() => { //when component loads 
        showStats()
    }, [])

    if (isLoading) {
        return <Loading center />
    }

    return (
        <>
            <StatsContainer />
            {monthlyApplications.length > 0 && <ChartsContainer />}
        </>

    )
}

export default Stats

//invoke useEffect when page renders, fetch stats and update state