import { FormRowSelect } from "."
import { useAppContext } from "../context/appContext"
import Wrapper from "../assets/wrappers/SearchContainer"

const SearchContainerDeviceDetails = () => {
    const {
        isLoading,
        sortSubscription,
        sortOptionsSubscription,
        handleChange,
        clearFilters,
    } = useAppContext()

    const handleSearch = (e) => {
        if (isLoading) return //if loading we do not invoke handleChange
        console.log(e.target.name, e.target.value);
        handleChange({ name: e.target.name, value: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        clearFilters()
    }


    return (
        <Wrapper>
            <form className="form">
                <h4>sort form</h4>
                <div className="form-center">
                    <FormRowSelect
                        name="sortSubscription"
                        value={sortSubscription}
                        handleChange={handleSearch}
                        list={sortOptionsSubscription}
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