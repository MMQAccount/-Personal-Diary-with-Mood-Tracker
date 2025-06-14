import './HomePage.css';
import logo from '../../assets/logo.webp';
const HomePage = () => {
    return(
        <div className='container_diary'>
            <div className="left_div">
                <h1>reflecty</h1>
                <div className="greeting">
                    <h2>Hello, beautiful mind.</h2>
                    <p>Take a deep breath and let's reflect together.</p>
                </div>
            </div>
            <div className='right_div'>
                <img src={logo} />
                <h1>Reflectly-A Jornal for Happiness,</h1>
                <h3>
                    Reflectly is a journal utilizing artificial intelligence to help you structure
                    and reflect upon your daily thoughts and problems.
                </h3>
            </div>
        </div>
    );
}
export default HomePage;