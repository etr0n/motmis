import { FormRow, FormRowSelect } from "."
import { useAppContext } from "../context/appContext"
import Wrapper from "../assets/wrappers/SearchContainer"

const SearchContainerDeviceDetails = () => {
    const {
        isLoading,
        sort,
        sortOptions,
        handleChange,
        clearFilters,
    } = useAppContext()

    const handleSearch = (e) => {
        if (isLoading) return //if loading we do not invoke handleChange
        handleChange({ name: e.target.name, value: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        clearFilters()
    }

    sortOptions.splice(2, 2)

    return (
        <Wrapper>
            <form className="form">
                <h4>sort form</h4>
                <div className="form-center">
                    <FormRowSelect
                        name="sort"
                        value={sort}
                        handleChange={handleSearch}
                        list={sortOptions}
                    ></FormRowSelect>
                    <button
                        className='btn btn-block btn-danger'
                        disabled={isLoading}
                        onClick={handleSubmit}
                    >
                        clear filter
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}

export default SearchContainerDeviceDetails