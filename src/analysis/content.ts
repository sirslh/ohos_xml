import { type } from "os"

export const XML_source = "<?xml version=\"1.0\" encoding=\"utf-8\"?>"

export enum ResourceValue {
    layout,
    shape,
    color,
    string,
    dimen,
    svg
}

export const ResourceType = [{
    name: "layout",
    value: ResourceValue.layout
},
{
    name: "shape",
    value: ResourceValue.shape
},
{
    name: "color",
    value: ResourceValue.color
},
{
    name: "string",
    value: ResourceValue.string
},
{
    name: "dimen",
    value: ResourceValue.dimen
},
{
    name: "svg",
    value: ResourceValue.svg
}
]

//view 
export const ComponentRelation = {
    selector: "state-container",
    View: "Component",
    ViewGroup: "ComponentContainer",
    LinearLayout: "DirectionalLayout",
    RelativeLayout: "DependentLayout",
    FrameLayout: "StackLayout",
    ScrollView: "ScrollView",
    NestedScrollView: "NestedScrollView",
    "androidx.core.widget.NestedScrollView": "NestedScrollView",
    ListView: "ListContainer",
    GridLayout: "ListContainer",
    RadioGroup: "RadioContainer",
    "androidx.recyclerview.widget.RecyclerView": "ListContainer",
    "android.support.v7.widget.RecyclerView": "ListContainer",
    "androidx.viewpager.widget.ViewPager": "PageSlider",
    "androidx.viewpager.widget.ViewPager2": "PageSlider",
    "android.support.v4.view.ViewPager ": "PageSlider",
    ImageView: "Image",
    ImageButton: "Image",
    TextView: "Text",
    EditText: "TextField",
    Button: "Button",
    RadioButton: "RadioButton",
    CheckBox: "Checkbox",
    Space: "Component",
    ProgressBar: "ProgressBar"
}

//命名空间
export const NameSpaceRelation = {
    android: "ohos",
    app: "app",
    xmlns: "xmlns",
    tools: "tools",
    "http://schemas.android.com/apk/res/android": "http://schemas.huawei.com/res/ohos",
    "http://schemas.android.com/tools": "http://schemas.huawei.com/tools",
    "http://schemas.android.com/apk/res-auto": "http://schemas.huawei.com/res/ohos-auto",
    id: "id",
    match_parent: "match_parent",
    wrap_content: "match_content",
    gravity: "alignment",
    layout_gravity: "layout_alignment",
    layout_width: "width",
    layout_height: "height",
    top: "top",
    bottom: "bottom",
    right: "right",
    left: "left",
    center: "center",
    center_horizontal: "horizontal_center",
    center_vertical: "vertical_center",
    start: "start",
    end: "end",
    visible: "visible",
    invisible: "invisible",
    gone: "hide",
    maxWidth: "max_width",
    maxHeight: "max_height",
    minWidth: "min_width",
    minHeight: "min_height",
    layout_margin: "margin",
    layout_marginLeft: "left_margin",
    layout_marginRight: "right_margin",
    layout_marginTop: "top_margin",
    layout_marginBottom: "bottom_margin",
    layout_marginEnd: "end_margin",
    layout_marginStart: "start_margin",
    padding: "padding",
    paddingTop: "top_padding",
    paddingBottom: "bottom_padding",
    paddingRight: "right_padding",
    paddingLeft: "left_padding",
    paddingEnd: "end_padding",
    paddingStart: "start_padding",
    background: "background_element",
    drawable: "element",
    src: "image_src",
    scaleType:"scale_mode",
    textColor: "text_color",
    textColorHint:"hint_color",
    textSize: "text_size",
    textStyle: "text_weight",
    maxLines:"max_text_lines",
    inputType:"text_input_type",
    layout_alignParentBottom: "align_parent_bottom",
    layout_alignParentTop: "align_parent_top",
    layout_alignParentEnd: "align_parent_end",
    layout_alignParentStart: "align_parent_start",
    layout_alignParentLeft: "align_parent_left",
    layout_alignParentRight: "align_parent_right",
    layout_centerVertical: "vertical_center",
    layout_centerHorizontal: "horizontal_center",
    layout_centerInParent: "center_in_parent",
    layout_alignLeft:"align_left",
    layout_alignRight:"align_right",
    layout_alignTop:"align_top",
    layout_alignBottom:"align_bottom",
    layout_alignBaseline:"align_baseline",
    layout_alignEnd:"align_end",
    layout_alignStart:"align_start",
    layout_above:"above",
    layout_below:"below",
    layout_toRightOf:"right_of",
    layout_toLeftOf:"left_of",
    layout_toEndOf:"end_of",
    layout_toStartOf:"start_of",
   


}