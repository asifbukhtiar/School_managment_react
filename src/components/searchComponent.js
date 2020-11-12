import React from"react";
const SearchComponent = (props) => {
    return(
    <div className="content search-wrapper">
        <div className="container p-0">
            <div class="form-row align-items-center justify-content-between">
                <div class="col-8">
                {/* <label class="sr-only" for="inlineFormInput">Name</label> */}
                <input type="text" class="form-control mb-2" id="search" onChange={(e) => props.callback(e.target.value)} placeholder="Search By Name..." />
                </div>

                
                {/* <div class="col-auto">
                <button type="button" class="btn button-bg mb-2">Search</button>
                </div> */}
            </div>
        </div>
       
    </div>
    )
}
export default SearchComponent