import { EditOutlined } from '@ant-design/icons';
import './Diary.css';
const Diary = () => {
    return(
        <div className="container">
            <div className="diary_content"> 
                <EditOutlined className='edit_icon'/>
                <div>
                    <h3>Diary Address</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore quos delectus pariatur ex accusantium natus ullam voluptates magni ea in. Vitae corporis voluptatem molestiae praesentium sint unde eaque totam nihil?</p>
                </div>    
                <h1>😄</h1>        
            </div>
            <div className='imgcontainer'>
                <img src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg" alt="" />
                <img src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg" alt="" />
                <img src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg" alt="" />
                <img src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg" alt="" />
            </div>
        </div>
    );
}

export default Diary;