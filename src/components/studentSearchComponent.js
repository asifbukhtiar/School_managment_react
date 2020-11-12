import React from"react";
const StudentSearchComponent = (props) => {
    const [name, setName] = React.useState("");
    const [className, setClassName] = React.useState("");
    return(
    <div className="content search-wrapper">
        <div className="container p-0">
            <div class="form-row align-items-center justify-content-between">
                <div class="col-5">
                {/* <label class="sr-only" for="inlineFormInput">Name</label> */}
                    <div className="form-group">
                        <input type="text" class="form-control mb-2" id="search" onChange={(e) => setName(e.target.value)} placeholder="Search By Name..." />
                    </div>
                </div>
                <div className="col-5">
                            <div className="form-group">
                                {/* <label htmlFor="classSelect">Select Class</label> */}
                                <select className="form-control" id="classSelect" onChange={(e) => setClassName(e.target.value)}>
                                    <option value="">Please select</option>
                                    <option value="play(a)">Play (a)</option>
                                    <option value="play(b)">Play (b)</option>
                                    <option value="play(c)">Play (c)</option>
                                    <option value="nursery(a)">Nursery (a)</option>
                                    <option value="nursery(b)">Nursery (b)</option>
                                    <option value="nursery(c)">Nursery (c)</option>
                                    <option value="perap(a)">Perap (a)</option>
                                    <option value="perap(b)">Perap (b)</option>
                                    <option value="perap(c)">Perap (c)</option>
                                    <option value="one(a)">One (a)</option>
                                    <option value="one(b)">One (b)</option>
                                    <option value="one(c)">One (c)</option>
                                    <option value="two(a)">Two (a)</option>
                                    <option value="two(b)">Two (b)</option>
                                    <option value="three(a)">Three (a)</option>
                                    <option value="three(b)">Three (b)</option>
                                    <option value="four(a)">Four</option>
                                    <option value="five(a)">Five</option>
                                    <option value="six(a)">Six</option>
                                    <option value="seven(a)">Seven</option>
                                    <option value="eight(a)">Eight</option>
                                </select>
                               
                            </div>
                        </div>

                
                <div class="col-2">
                    <div className="form-group">
                        <button type="button" class="btn button-bg mb-2" onClick={() => props.callback(name, className)}>Search</button>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
    )
}
export default StudentSearchComponent