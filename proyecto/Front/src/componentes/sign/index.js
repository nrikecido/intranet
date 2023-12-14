import MainSign from "./bar/mainsign"
import Signs from "./bar/signs";

const Sign = () => {
    return<>
        <div className="row mt-4">
            <MainSign></MainSign>
            <Signs></Signs>
        </div>
    </>
}

export default Sign;