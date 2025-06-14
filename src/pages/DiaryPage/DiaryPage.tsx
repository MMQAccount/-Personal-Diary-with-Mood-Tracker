import './DiaryPage.css';
import { SearchOutlined} from '@ant-design/icons';
import { Input } from 'antd';
import Diary from '../../components/Diary/Diary';
import { useNavigate } from 'react-router-dom';
const DiaryPage = () => {

    const navigate = useNavigate();

    function handelChangeInput(e: any): any {
        const value = e.target.value;
        if(value === 'input'){
            navigate('/diaryForm');
        }else if(value === 'voice'){
            navigate('/diaryVoice');
        }else if(value === 'image'){
            navigate('/diaryImage');
        }
    }

    return(
        <div className="diary_container">
            <div className='search_container'>
                <h1>Wellcome, </h1>
                <div className="input_wrapper"><Input placeholder="Search ..." prefix={<SearchOutlined className='icon'/>} className='search_input' /></div>    
                <select name="diary_type" id="diary_type" className='diary_type'
                    onChange={
                        handelChangeInput
                    }>
                    <option value="" selected hidden>➕</option>
                    <option value="input">
                        input 📜
                    </option>
                    <option value="voice">
                        voice 🎙️
                    </option>
                    <option value="image">
                        image 🖼️
                    </option>
                </select>
            </div>
            
            <Diary />
            <Diary />
            <Diary />
        </div>
    );
}

export default DiaryPage;