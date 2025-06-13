import { Link } from 'react-router';
import './DiaryPage.css';
import { SearchOutlined} from '@ant-design/icons';
import { Input } from 'antd';
import Diary from '../../components/Diary/Diary';

const DiaryPage = () => {
    return(
        <div className="diary_container">
            <div className='search_container'>
                <h1>Wellcome, </h1>
                <div className="input_wrapper"><Input placeholder="Search ..." prefix={<SearchOutlined className='icon'/>} className='search_input' /></div>    
                <select name="diary_type" id="diary_type">
                    <option value="" selected hidden>➕</option>
                    <option value="input">
                        <Link to="/diary_form">input 📜</Link>
                    </option>
                    <option value="voice">
                        <Link to="/diary_voice">voice 🎙️</Link>
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