import { useAppContext } from "../context/appContext"
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi"
import Wrapper from "../assets/wrappers/PageBtnContainer"
import Pagination from '@mui/material/Pagination';


const PageBtnContainer = () => {
    const { numOfPages, page, changePage } = useAppContext()

    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index + 1
    })

    // console.log(pages);

    const nextPage = () => {
        let newPage = page + 1
        if (newPage > numOfPages) {
            newPage = 1
        }
        changePage(newPage)
    }

    const prevPage = () => {
        let newPage = page - 1
        if (newPage < 1) {
            newPage = numOfPages
        }
        changePage(newPage)
    }

    return (
        <Wrapper>
            <button className="prev-btn" onClick={prevPage}>
                <HiChevronDoubleLeft />
                prev
            </button>
            <div className="btn-container">
                {pages.map((number) => {
                    return <button
                        typeof="button"
                        className={number === page ? 'pageBtn active' : 'pageBtn'}
                        key={number}
                        onClick={() => { changePage(number) }}>
                        {number}
                    </button>
                })}
            </div>
            <button className="next-btn" onClick={nextPage}>
                next
                <HiChevronDoubleRight />
            </button>
        </Wrapper>
    )
}

export default PageBtnContainer