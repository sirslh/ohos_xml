import { ResourceValue, XML_source } from "./content";
import { analysisXmlNode } from "./xml";
import { analysisJsonNode } from "./json";

function creatXmlDoc(xmlString: string) {
    let xmlDoc = null;
    let domParser = null;
    if (window.DOMParser) {
        try {
            domParser = new DOMParser();
            xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
        } catch (e) {
            console.log("creatXmlDoc ", e)
        }
    }
    return xmlDoc
}


export function loadXML(xmlString: string, oldFilePath: string, type: ResourceValue) { //构建xmldoc对象
    let xmlContent: string[] = [];
    let xmldoc = creatXmlDoc(xmlString)
    let rootNode = xmldoc?.getRootNode()
    let childNodes = rootNode?.childNodes
    let androidRoot = childNodes && childNodes[0]
    let fileName = ""
    let fileType = "text/xml;charset=utf-8"
    if (type == ResourceValue.color
        || type == ResourceValue.string
        || type ==ResourceValue.dimen
    ) {
        analysisJsonNode(xmlContent, type,androidRoot)
        fileName = oldFilePath.substring(oldFilePath.lastIndexOf("\\") + 1, oldFilePath.lastIndexOf(".")).concat(".josn")
        fileType = "application/json;charset=utf-8"
    } else {
        xmlContent.push(XML_source)
        analysisXmlNode(xmlContent, androidRoot)
        fileName = oldFilePath.substring(oldFilePath.lastIndexOf("\\") + 1, oldFilePath.length)
        fileName = fileName.replace(".xml", "_ohos").concat(".xml")
    }
    saveFile(xmlContent, fileName, fileType)
}

function saveFile(content: string[], fliePath: string, fileType: string) {
    var FileSaver = require('file-saver');
    var blob = new Blob(content, { type: fileType });
    FileSaver.saveAs(blob, fliePath);

}


 // else if (!window.DOMParser && window.ActiveXObject) {   //window.DOMParser 判断是否是非ie浏览器
    //     var xmlDomVersions = ['MSXML2.DOMDocument', 'Microsoft.XMLDOM'];
    //     for (var i = 0; i < xmlDomVersions.length; i++) {
    //         try {
    //             xmlDoc = new ActiveXObject(xmlDomVersions[i]);
    //             xmlDoc.async = false;
    //             xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
    //             break;
    //         } catch (e) {
    //             continue;
    //         }
    //     }
    // }
    // else {

    // }