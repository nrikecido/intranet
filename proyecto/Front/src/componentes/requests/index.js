import Kind from "./bar/kind";
import Data from "./bar/data";
import Holiday from "./requestsTypes/holiday";
import Other from "./requestsTypes/other";

const Sign = () => {
    return<>
        <div className="row mt-4">
            <Kind></Kind>
            <Other></Other>
        </div>
    </>
}

export default Sign;