import { ResourceValue } from "./content"

export function analysisJsonNode(content: string[], type: ResourceValue, node?: Node) {
    let childNodes = node?.childNodes
    if (!childNodes || !childNodes.length) {
        return
    }
    //遍历子标签
    let nodes: Node[] = []
    childNodes.forEach((item) => {
        let attributes = (item as any)?.attributes
        if (attributes && attributes.length) {
            nodes.push(item)
        }
    })
    let josnArray = nodes.map(analysisNode)
    let jsonObject = {}
    if (type == ResourceValue.color) {
        jsonObject = {
            color: josnArray
        }
    } else if (type == ResourceValue.string) {
        jsonObject = {
            string: josnArray
        }
    }
    else if (type == ResourceValue.dimen) {
        //转换单位
        josnArray= josnArray.map((item)=>{
            let value= item.value?.replace("dp","vp").replace("sp","fp")
            return {...item,value}
        })
        jsonObject = {
            string: josnArray
        }
    }
    content.push(JSON.stringify(jsonObject))
}

function analysisNode(node?: Node) {
    let attributes = (node as any)?.attributes
    let attr = attributes[0]
    return {
        name: attr.nodeValue,
        value: node?.textContent
    }
}