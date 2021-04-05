import { useState } from 'react';
import './index.css';
import icon_no_xuanze from "../../assets/image/icon_no_xuanze.png"
import icon_xuanze from "../../assets/image/icon_xuanze.png"
import { loadXML } from "../../analysis/index"
import { ResourceType } from '../../analysis/content';

const Home: React.FC = () => {

    const [select, setSelect] = useState(0)

    const onChange = (e: any) => {
        let target = e.target

        let filePath = target.value
        console.log(filePath)
        let files = target.files
        if (files && files[0]) {
            let reader = new FileReader()
            reader.readAsText(files[0], 'UTF-8')
            reader.onload = function (e: any) {
                let fileContent = e.target.result
                loadXML(fileContent, filePath, select)
            }
        }
    }
    return (<div className="home_continer" >
        <p className="title" > 请选择需要转换的资源类型 </p>
        <div className="type_list" > {
            ResourceType.map((item, index) => {
                let {
                    name,
                    value
                } = item
                let icon = value == select ? icon_xuanze : icon_no_xuanze

                return <div key={index}
                    className="type_item"
                    onClick={() => {
                        setSelect(value)
                    }
                    } >
                    <img src={icon}
                        className="type_icon" />
                    < div > {name} </div>
                </div>
            })
        }
        </div>
        <div className="file_continer" >
            <input type="file"
                id="file-input"
                className="open_file"
                onChange={
                    onChange
                }
            />
        </div>
    </div>
    );
}

export default Home