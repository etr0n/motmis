import { FormRow, FormRowSelect } from "."
import { useAppContext } from "../context/appContext"
import Wrapper from "../assets/wrappers/SearchContainer"
import { useEffect } from 'react';

const SearchContainer = () => {
    const {
        isLoading,
        searchName,
        searchStatus,
        sort,
        sortOptions,
        statusOptions,
        handleChange,
        clearFilters,
        setSortOption,
    } = useAppContext()

    useEffect(() => { //when component loads 
        setSortOption()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSearch = (e) => {
        if (isLoading) return //if loading we do not invoke handleChange
        handleChange({ name: e.target.name, value: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        clearFilters()
    }

    return (
        <Wrapper>
            <form className="form">
                <h4>search form</h4>
                {/* name='search' must match state name*/}
                <div className="form-center">
                    <FormRow
                        labelText='search name'
                        type='text'
                        name='searchName'
                        value={searchName}
                        handleChange={handleSearch}
                    ></FormRow>
                    <FormRowSelect
                        labelText='Sensor status'
                        name='searchStatus'
                        value={searchStatus}
                        handleChange={handleSearch}
                        list={['all', ...statusOptions]}
                    ></FormRowSelect>
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
                        clear filters
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}

export default SearchContainer