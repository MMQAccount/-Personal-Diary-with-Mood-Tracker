import { EditOutlined } from '@ant-design/icons';
import './Diary.css';
const Diary = () => {
    return(
        <div className="diary_content"> 
            <EditOutlined className='edit_icon'/>
            <div>
                <h3>Diary Address</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore quos delectus pariatur ex accusantium natus ullam voluptates magni ea in. Vitae corporis voluptatem molestiae praesentium sint unde eaque totam nihil?</p>
            </div>            
        </div>
    );
}

export default Diary;