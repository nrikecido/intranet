import Main from "./bar/main"
import Newsletter from "./bar/newsletter";

const Home = () => {
    return<>
        <div className="row mt-4">
            <Main></Main>
            <Newsletter></Newsletter>
        </div>
    </>
}

export default Home;