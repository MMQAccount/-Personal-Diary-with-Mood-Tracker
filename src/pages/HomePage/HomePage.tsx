import './HomePage.css';
import logo from '../../assets/dino2.png';
const HomePage = () => {
    return (
        <div className='container_diary'>
            <div className="left_div">
                <h1>reflecty</h1>
                <div className="reflectly_container">
                        <img src={logo} alt="" />
                    <h2>Hello, beautiful mind.</h2>
                    <p>Take a deep breath and let's reflect together.</p>
                </div>
            </div>
            <div className='right_div'>
                <div className="greeting">
                    <h1>Reflectly-A Jornal for Happiness,</h1>
                    <h3>
                        Reflectly is a journal utilizing artificial intelligence to help you structure
                        and reflect upon your daily thoughts and problems.
                    </h3>
                </div>
            </div>
        </div>
    );
}
export default HomePage;