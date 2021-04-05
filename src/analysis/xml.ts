
import { ComponentRelation, NameSpaceRelation } from "./content";

export function analysisXmlNode(content: string[], node?: Node) {
    let nodeName = node?.nodeName as string || ""
    if (!node || !nodeName || "#text" == nodeName || "#comment" == nodeName) {
        //console.warn("不合法的节点", node)
        return
    }
    content.push("\n")
    content.push("<")
    // console.log("analysisNode nodeName", nodeName)
    let componentRelation = ComponentRelation as any

    let ohosXmlRootname = componentRelation[nodeName] || nodeName
    //开始标签
    content.push(ohosXmlRootname)
    content.push("\n")
    //标签的属性
    let attributes = (node as any)?.attributes
    if (attributes) {
        Object.keys(attributes).forEach((key) => {
            let attr = attributes[key]
            let pushAttr = getNodeAttribute(attr, nodeName)
            content.push(pushAttr)
            content.push("\n")
        });
    }
    //标签的子node
    let childNodes = node?.childNodes
    if (!childNodes || !childNodes.length) {
        content.push("/>")
        return
    }
    content.push(">")
    content.push("\n")
    //遍历子标签
    childNodes.forEach((item) => {
        analysisXmlNode(content, item)
    })
    //结束标签
    content.push("</")
    content.push(ohosXmlRootname)
    content.push(">")
}

function getNodeAttribute(attr: any, rootNodeName?: string) {
    let pushAttr = ""
    //解析value
    let buteValue = getNodeAttributeValue(attr)

    let nameSpaceRelation = NameSpaceRelation as any
    let nodeName = attr.nodeName as string
    let names = nodeName.split(":")
    let buteName = `${nameSpaceRelation[names[0]] || names[0]}:`
    let rightBute = names[1]
    let buteRight = nameSpaceRelation[rightBute]
    if (buteRight) {
        if (rootNodeName == "TextView" && buteRight == "alignment") {
            return `${buteName}text_alignment="${buteValue}"`
        }
        if (rootNodeName == "TextView" && buteRight == "text_weight") {
            if (buteValue == "italic") {
                return `ohos:italic="true"`
            }
            if (buteValue == "bold") {
                return `ohos:text_weight="500"`
            }
        }
        return `${buteName}${buteRight}="${buteValue}"`
    }
    //匹配到 margin
    if (rightBute && rightBute.match(/layout_margin(.*?)/i)) {
        rightBute = rightBute.replace("layout_margin", "").toLowerCase()
        if (rightBute == "horizontal") {
            pushAttr += `${buteName}left_margin="${buteValue}"`
            pushAttr += "\n"
            pushAttr += `${buteName}right_margin="${buteValue}"`
        } else if (rightBute == "vertical") {
            pushAttr += `${buteName}top_margin="${buteValue}"`
            pushAttr += "\n"
            pushAttr += `${buteName}bottom_margin="${buteValue}"`
        } else {
            buteRight = `${rightBute}_margin`
            pushAttr = `${buteName}${buteRight}="${buteValue}"`
        }
        return pushAttr
    }
    //匹配到padding
    if (rightBute && rightBute.match(/padding(.*?)/i)) {
        rightBute = rightBute.replace("padding", "").toLowerCase()
        if (rightBute == "horizontal") {
            pushAttr += `${buteName}left_padding="${buteValue}"`
            pushAttr += "\n"
            pushAttr += `${buteName}right_padding="${buteValue}"`
        } else if (rightBute == "vertical") {
            pushAttr += `${buteName}top_padding="${buteValue}"`
            pushAttr += "\n"
            pushAttr += `${buteName}bottom_padding="${buteValue}"`
        } else {
            buteRight = `${rightBute}_padding`
            pushAttr = `${buteName}${buteRight}="${buteValue}"`
        }
        return pushAttr
    }
    //返回默认
    return `${buteName}${rightBute}="${buteValue}"`
}



function getNodeAttributeValue(attr: any) {
    let nameSpaceRelation = NameSpaceRelation as any
    let nodeValue = attr.nodeValue as string

    if (!nodeValue) {
        return ""
    }
    let newValue = nameSpaceRelation[nodeValue]
    if (newValue) {
        return newValue
    }
    //匹配ID
    if (nodeValue.match(/\@\+id\/(.*?)/i) || nodeValue.match(/\@id\/(.*?)/i)) {
        if (nodeValue.match(/\@\+id\/(.*?)/i)) {
            return nodeValue.replace("@+id/", "$+id:")
        }
        return nodeValue.replace("@id/", "$id:")
    }
    //匹配dp
    if (nodeValue.match(/^([+]\d+[.]\d+|[-]\d+[.]\d+|\d+[.]\d+|[+]\d+|[-]\d+|\d+)*dp$/g)) {
        return nodeValue.replace("dp", "vp")
    }
    //匹配sp
    if (nodeValue.match(/^([+]\d+[.]\d+|[-]\d+[.]\d+|\d+[.]\d+|[+]\d+|[-]\d+|\d+)*sp$/g)) {
        return nodeValue.replace("sp", "fp")
    }
    //匹配mipmap图片
    if (nodeValue.startsWith("@mipmap/")) {
        return nodeValue.replace("@mipmap/", "$media:")
    }
    //匹配drawable图片
    if (nodeValue.startsWith("@drawable/")) {
        return nodeValue.replace("@drawable/", "$graphic:")
    }
    //匹配color
    if (nodeValue.startsWith("@color/")) {
        return nodeValue.replace("@color/", "$color:")
    }
    //匹配string
    if (nodeValue.startsWith("@string/")) {
        return nodeValue.replace("@string/", "$string:")
    }
    //dimen
    if (nodeValue.startsWith("@dimen/")) {
        return nodeValue.replace("@dimen/", "$string:")
    }

    newValue = nodeValue
    return newValue

}